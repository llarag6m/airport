import express from "express"
import { changePassword, deleteAccount, login, register } from "./auth.controller.js"
import { protect, protectAccountOwner, restrictTo, validExistUser } from "./auth.middleware.js"

export const router = express.Router();

router.post('/login', login)

router.post('/register', protect, restrictTo('developer'), register)

router.patch('/change-password', protect, changePassword)

router.delete('/:id', protect, validExistUser, protectAccountOwner ,deleteAccount)

