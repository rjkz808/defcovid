import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { HttpError, NotFound } from 'http-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.set('port', process.env.PORT ?? 8080);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use((req, res, next) => {
  const err = new NotFound('This path does not exist');
  next(err);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ error: message });
});

const mongoUrl = 'mongodb://db:27017/defcovid';
mongoose.set('useFindAndModify', false);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log('mongodb connected');

    app.listen(app.get('port'), () => {
      console.log(`devcovidapi is running at :${app.get('port')}`);
    });
  },
  err => {
    console.error('mongodb connection error:', err);
  }
);
