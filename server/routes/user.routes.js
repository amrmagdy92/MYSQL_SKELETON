import { Router } from "express"

import {create, read, list, update, remove} from "../controllers/user.controller"

const router = Router()

router.route('/')
    .get(list)

router.route('/create')
    .post(create)

router.route('/:id')
    .get(read)
    .delete(remove)
    .patch(update)

export default router