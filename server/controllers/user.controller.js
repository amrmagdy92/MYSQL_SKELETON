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
    const resultsPerPage = req.body.resultsPerPage? req.body.resultsPerPage: 100
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
                res.json({ msg: 'No users were found.'})
            }
        })
        .catch(err => res.json(getErrorMessage(err)))
}
const update = async (req, res) => {
    var user

    await userSchema.findAll({ attributes: ["firstName", "lastName", "email", "phone", "salt"], where: { id: req.params.id } })
        .then( foundUser => {
            if (foundUser.length != 0) {
                user = foundUser[0]
            } else res.json({ msg: `The given id '${req.params.id}' was not found`})
        })
        .catch(err => res.json(getErrorMessage(err)))

    if (user != undefined) {
        req.body.user.firstName? user.firstName = req.body.user.firstName : null
        req.body.user.lastName? user.lastName = req.body.user.lastName : null
        req.body.user.email? user.email = req.body.user.email : null
        req.body.user.phone? user.phone = req.body.user.phone : null
        req.body.user.password? user.hashedPassword = encryptPassword(req.body.user.password, user.salt): null
    }
    
    userSchema.update(user, { where: { id: req.params.id } })
        .then( () => res.json({ msg: `The user ${req.params.id} has been updated successfully`}))
        .catch(err => res.json(getErrorMessage(err)))
}
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