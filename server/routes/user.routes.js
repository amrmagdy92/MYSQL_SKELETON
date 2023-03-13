import { Router } from "express"

import {create, read, list, remove} from "../controllers/user.controller"

const router = Router()

router.route('/')
    .get(list)

router.route('/create')
    .post(create)

router.route('/:id')
    .get(read)
    .delete(remove)

export default router