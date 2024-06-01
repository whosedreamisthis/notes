import express, { Express, Request, Response } from 'express';
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.get('/api/notes', async (req, res) => {
  res.json({ message: 'success!' });
});
app.listen(port, () => {
  console.log('server running on localhost:5000');
});
