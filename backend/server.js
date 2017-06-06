const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const pgp = require('pg-promise')();
const Api = require('./api');
const db = pgp(config.database);
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

let api = Api(app);

api.post('/api/login', (req, resp) =>
  bcrypt.compare(req.body.password, config.masterPassword)
  .then(match => {
    if (match) {
      let token = uuid.v4();
      return db.one(`
        insert into login_session
        values ($1) returning *`, token)
        .then(data => resp.json(data));
    } else {
      resp.status(403);
      resp.json('Login failed');
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
  db.oneOrNone('select * from login_session where token = $1', token)
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

api.get('/api/friends', (req, resp) =>
  db.any(`select
    id,
    first_name,
    last_name
    from friend`)
    .then(friends => resp.json(friends))
);

api.get('/api/friend/:id', (req, resp) =>
  db.oneOrNone('select * from friend where id = $1',
  req.params.id)
  .then(friend => {
    if (friend) {
      resp.json(friend);
    } else {
      resp.status(404);
      resp.json({ error: `Friend ${req.params.id} not found`});
    }
  })
);

api.post('/api/friends', (req, resp) =>
  db.one(`
    insert into friend values
    (
      default,
      $(first_name),
      $(last_name),
      $(email),
      $(phone),
      $(company),
      $(note)
    )
    returning *`, req.body)
    .then(data => resp.json(data))
);

api.put('/api/friend/:id', (req, resp) =>
  db.one(`
    update friend set
      first_name = $(first_name),
      last_name = $(last_name),
      email = $(email),
      phone = $(phone),
      company = $(company),
      note = $(note)
    where id = $(id)
    returning *`,
    Object.assign({
      id: req.params.id
    }, req.body))
    .then(data => resp.json(data))
);

app.use(function errorHandler(err, req, resp, next) {
  console.log(err.stack);
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(config.port || 3000,
  () => console.log('Listening on port 3000.'));
