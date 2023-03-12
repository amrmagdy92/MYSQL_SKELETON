import { PrismaClient } from "@prisma/client"

import userHelpers from "../helpers/user.helpers"

const prisma = new PrismaClient()

const create = async (req, res) => {
    const user = userHelpers.computeFullName(req.body.user)
    user.salt = Date.now().toString()
    if ( userHelpers.validateUser(user) ) {
        const newUser = await prisma.user.create({ data: user })
        res.json({ msg: `The user ${newUser.fullName} has been created successfully`})
    } else {
        // TODO: Add validation handlers
    }
}
const read = () => {}
const list = () => {}
const update = () => {}
const remove = () => {}

export default {
    create,
    read,
    list,
    update,
    remove
}