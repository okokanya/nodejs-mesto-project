// Поля схемы пользователя:
// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 200 символов, обязательное поле;
// avatar — ссылка на аватарку, строка, обязательное поле.

import { model, Schema } from "mongoose";

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: true
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [200, 'Максимальная длина поля "about" - 200'],
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  }
);
export default model<IUser>("user", userSchema);