// Поля схемы пользователя:
// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 200 символов, обязательное поле;
// avatar — ссылка на аватарку, строка, обязательное поле.
// {
//   "name": "name",
//   "about": "about",
//   "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flower_poster_2.jpg/330px-Flower_poster_2.jpg"
// }

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
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [200, 'Максимальная длина поля "about" - 200'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" должно быть заполнено'],
    },
  },
  { versionKey: false }
);

export default model<IUser>("user", userSchema);