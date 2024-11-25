import mongoose from 'mongoose';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routes/user';
import cardsRoutes from './routes/card';
import { STATUS_CODES } from './constants/statusCodes';
import { MESSAGES } from './constants/messages';

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

// Подключение роутов
app.use('/users', usersRouter);
app.use('/cards', cardsRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.URL_ERROR });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
  console.log('Сервер запущен на ' + PORT + ' порту');
});

// _id ="673c5c7e0c28c30f0f7f6986"