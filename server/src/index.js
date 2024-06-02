var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var cors = require('cors');
var sqlite3 = require('sqlite3');
var promisify = require('util').promisify;
var port = 5000;
var host = 'http://127.0.0.1:' + port;
var app = express();
app.use(express.json());
app.use(cors());
var dbConfig = {
    filename: './mydatabase.db', // Specify the database file
    driver: sqlite3.Database,
};
var db = new sqlite3.Database('notes.db');
db.run('CREATE TABLE IF NOT EXISTS notes (NoteId TEXT,Title TEXT, Content TEXT, PRIMARY KEY(NoteId)) ');
var path = require('path');
// Get the location of database.sqlite file
var dbPath = path.resolve(__dirname, './notes.db');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
});
knex.schema.hasTable('Notes').then(function (exists) {
    if (exists) {
        return knex.schema
            .createTable('notes', function (table) {
            table.string('id').primary();
            table.string('title');
            table.string('content');
        })
            .then(function () {
            console.log("Table 'notes' created");
        })
            .catch(function (error) {
            return console.error("There was an error creating table: ".concat(error));
        });
    }
});
app.get('/notes', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        knex('notes').then(function (rows) {
            res.send({ notes: rows });
        });
        return [2 /*return*/];
    });
}); });
app.get('/newnote', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        knex('notes')
            .insert({
            id: req.headers.body.id,
            title: req.headers.title,
            content: req.headers.content,
        })
            .then(function (rows) {
            res.send({ notes: rows });
        });
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log('server running on localhost:5000');
});
db.close();
