import { Router } from "express"

import {create, read, list} from "../controllers/user.controller"

const router = Router()

router.route('/')
    .get(list)

router.route('/create')
    .post(create)

router.route('/:id')
    .get(read)

export default router