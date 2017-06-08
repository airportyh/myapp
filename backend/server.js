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

let api = Api(app);

api.post('/api/login', (req, resp) =>
  // clean up expired sessions while we are at it
  db.none(`delete from login_session where expires < now()`)
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
);

function unauthorized(resp) {
  resp.status(403);
  resp.json({
    error: 'Unautherized'
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
      $(text)
    )
    returning *`, req.body)
);

api.put('/api/note/:id', (req, resp) =>
  db.one(`
    update note set
      title = $(title),
      text = $(text)
    where id = $(id)
    returning *`,
    Object.assign({
      id: req.params.id
    }, req.body))
);

app.use(function errorHandler(err, req, resp, next) {
  console.log(err.stack);
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

let port = config.port || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`));
