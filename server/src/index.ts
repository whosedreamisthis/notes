const express = require('express');

const cors = require('cors');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');
const port = 5000;
const host = 'http://127.0.0.1:' + port;
const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
  filename: './mydatabase.db', // Specify the database file
  driver: sqlite3.Database,
};

var db = new sqlite3.Database('notes.db');

db.run(
  'CREATE TABLE IF NOT EXISTS notes (NoteId TEXT,Title TEXT, Content TEXT, PRIMARY KEY(NoteId)) '
);

const path = require('path');
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, './notes.db');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema.hasTable('notes').then((exists: boolean) => {
  if (!exists) {
    return knex.schema
      .createTable('notes', (table: any) => {
        table.string('id').primary();
        table.string('title');
        table.string('content');
      })
      .then(() => {
        console.log("Table 'notes' created");
      })
      .catch((error: any) =>
        console.error(`There was an error creating table: ${error}`)
      );
  }
});
//    // "start": "npx nodemon"

app.get('/notes', async (req: any, res: any) => {
  knex('notes')
    .then((rows: any) => {
      res.send({ notes: rows });
    })
    .catch((error: any) => console.log(error));
});
app.get('/newnote', async (req: any, res: any) => {
  const note = JSON.parse(req.headers.body);
  knex('notes')
    .insert({
      id: note.id,
      title: note.title,
      content: note.content,
    })
    .then((rows: any) => {
      res.send({ notes: rows });
    });
});

app.get('/deletenote', async (req: any, res: any) => {
  const note = JSON.parse(req.headers.body);
  await knex('notes')
    .where({
      id: note.id,
    })
    .del();
  // knex('notes')
  //   .where('id', note.id)
  //   .then((res: any) => {
  //     console.log(res);
  //   });
});

app.listen(port, () => {
  console.log('server running on localhost:5000');
});

db.close();
