"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { Express } = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');
//const { Request, Response, NextFunction };
const request = require('express').Request;
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
db.run('CREATE TABLE IF NOT EXISTS notes (NoteId TEXT,Title TEXT, Content TEXT, PRIMARY KEY(NoteId)) ');
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
knex.schema.hasTable('notes').then((exists) => {
    if (!exists) {
        return knex.schema
            .createTable('notes', (table) => {
            table.string('id').primary();
            table.string('title');
            table.string('content');
        })
            .then(() => {
            console.log("Table 'notes' created");
        })
            .catch((error) => console.error(`There was an error creating table: ${error}`));
    }
});
//    // "start": "npx nodemon"
app.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    knex('notes')
        .then((rows) => {
        res.send({ notes: rows });
    })
        .catch((error) => console.log(error));
}));
app.get('/newnote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const n = req.headers.body;
    const stringed = `${n}`;
    const note = JSON.parse(stringed);
    knex('notes')
        .insert({
        id: note.id,
        title: note.title,
        content: note.content,
    })
        .then((rows) => {
        res.send({ notes: rows });
    });
}));
app.get('/deletenote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const n = req.headers.body;
    const stringed = `${n}`;
    const note = JSON.parse(stringed);
    yield knex('notes')
        .where({
        id: note.id,
    })
        .del();
}));
app.listen(port, () => {
    console.log('server running on localhost:5000');
});
db.close();
