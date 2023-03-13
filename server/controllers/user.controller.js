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
        .catch(err => res.json(getErrorMessage(err)))
}
const read = (req, res) => {
    const userID = req.params.id
    userSchema
        .findAll({
            attributes: ["id","firstName", "lastName", "email", "phone"],
            where: {
                id: userID
            }
        })
        .then( user => res.json(user))
        .catch(err => res.json(getErrorMessage(err)))
}
const list = (req, res) => {
    const pageNumber = req.body.pageNumber? req.body.pageNumber : 1
    const resultsPerPage = req.body.resultsPerPage
    userSchema
        .findAll({
            attributes: ["id","firstName", "lastName", "email", "phone"],
            limit: resultsPerPage,
            offset: resultsPerPage * pageNumber
        })
        .then( user => {
            if (user.length > 0) {
                res.json(user)
            } else {
                res.json({ msg: 'No users where found.'})
            }
        })
        .catch(err => res.json(getErrorMessage(err)))
}
const update = () => {}
const remove = async (req, res) => {
    var userID

    await userSchema.findAll({ attributes: ["id"], where: { id: req.params.id } })
        .then( foundID => {
            if (foundID.length != 0) {
                userID = foundID[0].id
            } else res.json({ msg: `The given id '${req.params.id}' was not found`})
        })
        .catch(err => res.json(getErrorMessage(err)))

    if (userID) {
        userSchema.destroy({ where: { id: userID } })
            .then( () => {res.json({msg: `The user with ID ${userID} has been deleted successfully.`})})
            .catch(err => res.json(getErrorMessage(err)))
    }
}

export {
    create,
    read,
    list,
    update,
    remove
}