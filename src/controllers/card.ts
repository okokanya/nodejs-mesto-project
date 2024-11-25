import { Request, Response } from 'express';
import Card from '../models/card';
import { STATUS_CODES } from '../constants/statusCodes';
import { MESSAGES } from '../constants/messages';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find().populate('owner');
    res.status(STATUS_CODES.OK).json(cards);
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
  }
};

export const createCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, link } = req.body;
    const owner = '673c5c7e0c28c30f0f7f6986';
    const newCard = new Card({ name, link, owner });
    await newCard.save();

    return res.status(STATUS_CODES.CREATED).json(newCard);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: MESSAGES.VALIDATION_ERROR,
      });
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
  }
};

export const deleteCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.CARD_NOT_FOUND });
    }
    return res.status(STATUS_CODES.OK).json({ message: MESSAGES.CARD_DELETED });
  } catch (err: any) {
    if (err.kind === 'CastError') {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_CARD_ID });
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
  }
};

export const likeCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: '673c5c7e0c28c30f0f7f6986' } },
      { new: true },
    );

    if (!card) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.CARD_NOT_FOUND });
    }
    return res.status(STATUS_CODES.OK).json(card);
  } catch (err: any) {
    if (err.kind === 'ObjectId') {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: MESSAGES.LIKE_ERROR,
      });
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
  }
};

export const dislikeCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: '673c5c7e0c28c30f0f7f6986' } },
      { new: true },
    );

    if (!card) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.CARD_NOT_FOUND });
    }
    return res.status(STATUS_CODES.OK).json(card);
  } catch (err: any) {
    if (err.kind === 'ObjectId') {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_CARD_ID });
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
  }
};
