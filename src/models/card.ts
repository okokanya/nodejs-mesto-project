// Поля схемы карточки:
// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле.
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.

import { Types, model, Schema } from "mongoose";

interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema: Schema<ICard> = new Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>("card", cardSchema);