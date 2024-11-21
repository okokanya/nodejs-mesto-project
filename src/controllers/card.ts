import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find().populate('owner');
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// export const createCard = async (req: Request, res: Response) => {
//   // console.log(req.user._id); // _id станет доступен

//   try {
//     const { name, link } = req.body;
//     const owner = '673c5c7e0c28c30f0f7f6986';
//     const newCard = new Card({ name, link, owner });
//     await newCard.save();
//     res.status(201).json(newCard);
//   } catch (err: any) {
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({
//         message: 'Переданы некорректные данные при создании карточки',
//       });
//     }
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// };

export const createCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, link } = req.body;
    const owner = '673c5c7e0c28c30f0f7f6986';
    const newCard = new Card({ name, link, owner });
    await newCard.save();

    // Отправка ответа с новым созданным объектом
    return res.status(201).json(newCard);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при создании карточки',
      });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const deleteCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: 'Карточка с указанным _id не найдена' });
    }
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (err: any) {
    if (err.kind === 'CastError') {
      return res.status(400).json({ message: 'Некорректный _id карточки' });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// $addToSet, чтобы добавить элемент в массив, если его там ещё нет;
// $pull, чтобы убрать.
export const likeCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: '673c5c7e0c28c30f0f7f6986' } }, // Добавление лайка
      { new: true },
    );

    if (!card) {
      // Если карточка не найдена
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    // Успешный ответ с обновлённой карточкой
    return res.status(200).json(card);
  } catch (err: any) {
    if (err.kind === 'ObjectId') {
      // Ошибка из-за некорректного _id
      return res.status(400).json({
        message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки',
      });
    }
    // Ошибка сервера
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const dislikeCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: '6693b4dd60c5309330a32aa2' } }, // Удаление лайка
      { new: true },
    );

    if (!card) {
      return res.status(404).json({ message: 'Карточка с указанным _id не найдена' });
    }
    return res.status(200).json(card);
  } catch (err: any) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Некорректный _id карточки' });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
