import userSchema from "../models/user.model"
import { makeSalt, computeFullName, encryptPassword } from "../helpers/user.helpers"
import { getErrorMessage } from "../helpers/db.helpers"

const create = (req, res) => {
    var user = req.body.user
    user.salt = makeSalt()
    user = computeFullName(user)
    user.hashedPassword = encryptPassword(user.password, user.salt)
    userSchema
        .create(user)
        .then(() => {
            res.json({msg: `The user ${req.body.user.firstName} ${req.body.user.lastName} was created successfully`})
        })
        .catch((err) => {
            const errors = getErrorMessage(err)
            res.json({ errors })
        })
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