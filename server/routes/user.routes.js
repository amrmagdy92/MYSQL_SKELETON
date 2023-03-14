import { Router } from "express"

import {create, read, list, update, remove} from "../controllers/user.controller"
import { requireSignin, hasAuthorization } from "../controllers/auth.controller"

const router = Router()

router.route('/')
    .get(list)

router.route('/create')
    .post(create)

router.route('/:id')
    .get(requireSignin, read)
    .delete(requireSignin, hasAuthorization, remove)
    .patch(requireSignin, hasAuthorization, update)

export default router