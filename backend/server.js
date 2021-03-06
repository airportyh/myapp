const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const pgp = require('pg-promise')();
const Api = require('./api');
const db = pgp(config.database);
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
if (config.cors) {
  app.use(cors());
}
app.use(bodyParser.json());

app.use(function(req, resp, next) {
  console.log(req.method, req.path);
  next();
});

let api = Api(app);

api.post('/api/login', (req, resp) => {
  console.log('body', req.body);
  // clean up expired sessions while we are at it
  return db.none(`delete from login_session where expires < now()`)
  .then(() =>
    bcrypt.compare(
      req.body.password,
      config.masterPassword)
  )
  .then(match => {
    if (match) {
      let token = uuid.v4();
      return db.one(`
        insert into login_session
        values ($1, default) returning *`, token);
    } else {
      resp.status(403);
      return {
        error: 'Login failed'
      };
    }
  })
});

function unauthorized(resp) {
  resp.status(403);
  resp.json({
    error: 'Unauthorized'
  });
}

app.use(function authentication(req, resp, next) {
  let token = req.headers['auth-token'];
  if (!token) {
    unauthorized(resp);
    return;
  }
  db.oneOrNone('select * from login_session where token = $1 and expires >= now()', token)
    .then(token => {
      console.log('Token', token);
      if (token) {
        next();
      } else {
        unauthorized(resp);
      }
    })
    .catch(next);
});

api.get('/api/notes', (req, resp) =>
  db.any(`select
    id,
    title
    from note`)
);

api.get('/api/notes/search', (req, resp) => {
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 50;
  if (limit > 200) {
    limit = 200;
  }
  let q = req.query.q;
  if (!req.query.q) {
    return listAll(limit, offset);
  } else {
    return search(q, limit, offset);
  }
});

function listAll(limit, offset) {
  return db.any(`
    select
      id, title
    from
      note
    order by
      modified_time desc
    limit $1
    offset $2
  `, [limit, offset]);
}

function search(q, limit, offset) {
  return db.any(`
    select
      id, title
    from
      note
    where
      to_tsvector(title || ' ' || text) @@ to_tsquery($1)
    order by modified_time desc
    limit $2
    offset $3
    `, [`'${q}'`, limit, offset]);
}

api.get('/api/note/:id', (req, resp) =>
  db.oneOrNone('select * from note where id = $1',
  req.params.id)
  .then(note => {
    if (note) {
      return note;
    } else {
      resp.status(404);
      return {
        error: `Friend ${req.params.id} not found`}
      ;
    }
  })
);

api.post('/api/notes', (req, resp) =>
  db.one(`
    insert into note values
    (
      default,
      $(title),
      $(text),
      default,
      default
    )
    returning *`, req.body)
);

function delay(ms) {
  return new Promise(function(accept, reject) {
    setTimeout(function() {
      accept(null);
    }, ms);
  });
}

api.put('/api/note/:id', (req, resp) =>
  db.one(`
    update note set
      title = $(title),
      text = $(text),
      modified_time = now()
    where id = $(id)
    returning *`,
    Object.assign({
      id: req.params.id
    }, req.body))
);

api.delete('/api/note/:id', (req, resp) =>
  db.one(`delete from note where id = ${req.params.id} returning *`)
);

app.use(function errorHandler(err, req, resp, next) {
  console.log(err.stack);
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

let port = config.port || 3000;
app.listen(port, () => console.log(`Listening on ${port}.`));
