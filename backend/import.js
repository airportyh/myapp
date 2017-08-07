'use strict';

const pgp = require('pg-promise')();
const path = require('path');
const config = require('./config');
const db = pgp(config.database);
const fs = require('fs-promise');
const notesPath = '/Users/airportyh/Home/Notes';

function saveFile(filename) {
  let filepath = `${notesPath}/${filename}`;
  let title = path.basename(filename, '.md');
  let created_time, modified_time, text;
  return fs.stat(filepath)
    .then(stat => {
      created_time = new Date(stat.ctime.getTime());
      modified_time = new Date(stat.mtime.getTime());
      console.log(filename, 'created', created_time, 'modfied', modified_time);
      return fs.readFile(filepath)
    })
    .then(contents => {
      text = contents.toString();
      let data = {
        title, text, modified_time, created_time
      };
      return db.none(`insert into note values
        (default, $(title), $(text), $(modified_time), $(created_time))
        `, data);
    })
    .then(() => console.log(`Saved ${title}`));
}

function importAll() {
  return fs.readdir(notesPath)
    .then(entries => {
      return Promise.all(entries.map(saveFile));
    });
}

// saveFile('talk proposals.md')
importAll()
  .then(() => console.log('Done'))
  .catch(err => console.log('Error: ' + err.message));
