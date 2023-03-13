import { Router } from "express"

import {create, read} from "../controllers/user.controller"

const router = Router()

router.route('/create')
    .post(create)

router.route('/:id')
    .get(read)

export default router