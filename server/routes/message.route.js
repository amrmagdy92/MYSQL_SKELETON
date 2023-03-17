import { Router } from "express"
import { create, list, remove } from "../controllers/message.controller"

const router = Router()

router.route('/')
    .get(list)
    .post(create)
    .delete(remove)

export default router