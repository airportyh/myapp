const co = require('co');
const prompt = require('prompt-promise');
const bcrypt = require('bcrypt');
const fs = require('fs-promise');

co(function *() {
  let port = yield prompt('Application port: ');
  let database = yield prompt('Database name: ');
  let databaseUser = yield prompt('Database user (Optional): ');
  let databasePassword = yield prompt.password('Database password (Optional): ');
  let password = yield prompt.password('Password: ');
  let encrypted = yield bcrypt.hash(password, 10);
  let cors = (yield prompt('Support CORS?(Y/N) ')).toLowerCase() === 'y';
  let contents = {
    port: port,
    database: {
      database: database,
      user: databaseUser || undefined,
      password: databasePassword || undefined
    },
    masterPassword: encrypted,
    cors: cors
  };
  let filename = 'config.json';
  yield fs.writeFile(filename,
    JSON.stringify(contents, null, '  '));
  console.log(`Wrote ${filename}.`);
  prompt.finish();
})
.catch(err => console.log(err.stack));
