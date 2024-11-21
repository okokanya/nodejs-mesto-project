import mongoose from 'mongoose';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routes/user';
import cardsRoutes from './routes/card';
// import user from "./models/user";

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.user = {
//   _id: '673c5c7e0c28c30f0f7f6986' // вставьте сюда _id созданного в предыдущем пункте пользователя
// };
// next();
// });

// Подключение роутов
app.use('/users', usersRouter);
app.use('/cards', cardsRoutes);

// app.use("*", (req: Request, res: Response) => {
//   res.status(404).json({ message: "Запрашиваемый ресурс не найден" });
// });

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
  console.log('Ссылка на сервер ');
  console.log(BASE_PATH);
});


// _id ="673c5c7e0c28c30f0f7f6986"