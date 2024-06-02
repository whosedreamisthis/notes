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
console.log(':here', db);
db.run(
  'CREATE TABLE IF NOT EXISTS Notes (NoteId TEXT,Title TEXT, Content TEXT, PRIMARY KEY(NoteId)) '
);

// db.run(
//   'INSERT INTO Notes(NoteID, title,content) VALUES(?, ?, ?)',
//   ['id2', 'title 2', 'content 2'],
//   (err) => {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(`Row was added to the table`);
//   }
// );
const path = require('path');
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, './notes.db');
console.log(dbPath);
//let sql = 'SELECT * FROM Notes';
//console.log(sql);//
// db.all('SELECT * FROM Notes', function (err, rows) {
//   rows.forEach(function (row) {
//     console.log(row.Title, row.Content); // and other columns, if desired
//   });
// });
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});
knex.select('*').from('Notes');
//.then(() => console.log('INSIDE'))
//.catch((err) => console.log(err));
// .then((data) => console.log('data ', data));

knex.schema.hasTable('Notes').then((exists) => {
  if (exists) {
    // If no "books" table exists
    // create new, with "id", "author", "title",
    // "pubDate" and "rating" columns
    // and use "id" as a primary identification
    // and increment "id" with every new record (book)
    return knex.schema
      .createTable('notes', (table) => {
        table.string('id').primary();
        table.string('title');
        table.string('content');
      })
      .then(() => {
        console.log("Table 'notes' created");
      })
      .catch((error) =>
        console.error(`There was an error creating table: ${error}`)
      );
  }
});

knex('notes')
  .insert({
    id: '1',
    title: 'newq title',
    content: 'this is the content',
  })
  .insert({
    id: '2',
    title: 'newq title2 ',
    content: 'this is the 2 content',
  })
  .catch((error) =>
    console.error(`There was an error inserting row in table: ${error}`)
  );

app.get('/notes', async (req, res) => {
  knex('notes').then((rows) => {
    res.send({ notes: rows });
  });
});
app.listen(port, () => {
  console.log('server running on localhost:5000');
});

db.close();
