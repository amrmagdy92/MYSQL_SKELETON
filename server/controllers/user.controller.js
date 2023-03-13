import userSchema from "../models/user.model"
import userHelpers from "../helpers/user.helpers"

const create = (req, res) => {
    var user = req.body.user
    user.salt = userHelpers.makeSalt()
    user = userHelpers.computeFullName(user)
    user.hashedPassword = userHelpers.encryptPassword(user.password, user.salt)
    // res.send(user)
    userSchema
        .create(user)
        .then(() => {
            res.json({msg: `The user ${req.body.user.firstName} ${req.body.user.lastName} was created successfully`})
        })
        .catch((err) => {
            res.json({ msg: err })
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