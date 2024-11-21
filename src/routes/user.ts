import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
} from "../controllers/user";
const router = Router();

// GET /users — возвращает всех пользователей
router.get("/", getUsers);

// GET /users/:userId - возвращает пользователя по _id
router.get("/:userId", getUsersById);

// POST /users — создаёт пользователя
router.post("/", createUser);

// PATCH /users/me — обновляет профиль
router.patch("/me", updateUser);

// PATCH /users/me/avatar — обновляет аватар
router.patch("/me/avatar", updateAvatar);
export default router;