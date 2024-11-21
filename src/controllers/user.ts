import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundErr') {
      return res.status(404).send({ message: 'Переданы некорректные данные при создании пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка сервера' });
  });

export const getUsersById = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundErr') {
      res.status(404).json({ message: 'Пользователь по указанному _id не найден' });
    }
    if (err.name === 'UserNotFoundErr') {
      res.status(400).json({ message: 'Передан некорректный _id пользователя' });
    } else {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err: any) {
    if (err.name === 'ValidationErr') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при создании карточки',
      });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновление профиля пользователя
export const updateUser = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.params.userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationErr') {
        res.status(400).json({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (err.name === 'DocumentNotFoundErr') {
        res.status(404).json({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).json({ message: 'Ошибка сервера' });
      }
    });
};
// Обновление аватара пользователя
export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.params.userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationErr') {
        res.status(400).json({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else if (err.name === 'DocumentNotFoundErr') {
        res.status(404).json({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).json({ message: 'Ошибка сервера' });
      }
    });
};
