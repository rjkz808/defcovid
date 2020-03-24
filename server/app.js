const express = require('express');
const cors = require('cors');
const { NotFound } = require('http-errors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use((req, res, next) => {
  const err = new NotFound('This path does not exist');
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ error: message });
});

mongoose.connect('mongodb://db:27017/defcovid', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => {
  console.error('Connection error:', err);
});

db.on('open', () => {
  console.log('MongoDB connected');

  const port = 8080;

  app.listen(port, () => {
    console.log(`Listening at :${port}`);
  });
});
