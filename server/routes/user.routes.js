import { Router } from "express"

import userController from "../controllers/user.controller"

const router = Router()

router.route('/create')
    .post(userController.create)

router.route('/:id')
    .get(userController.read)

export default router