import messageSchema from "../models/message.model"
import { getErrorMessage } from "../helpers/db.helpers"

const create = (req, res) => {
    var msg = {}
    var msgValidator = {}

    req.body.message.sender? msg.sender = req.body.message.sender : msgValidator.sender = "A sender is required"
    req.body.message.recepient? msg.recepient = req.body.message.recepient : msgValidator.recepient = "A recepient is required"
    req.body.message.messageData? msg.messageData = req.body.message.messageData : null
    req.body.message.messageText? msg.messageText = req.body.message.messageText : null
    req.body.message.sentDatetime? msg.sentDatetime = req.body.message.sentDatetime : msg.sentDatetime = Date.now()

    if (msgValidator.length > 0) {
        res.json(msgValidator)
    } else {
        messageSchema
            .create(msg)
            .then( () => { res.json({ msg: "message sent successfully"}) } )
            .catch( (err) =>  res.json(getErrorMessage(err)) )
    }
}
const list = (req, res) => {
    const pageNumber = req.body.pageNumber? req.body.pageNumber : 0
    const resultsPerPage = req.body.resultsPerPage? req.body.resultsPerPage: 10
    messageSchema
        .findAll({
            attributes: ["sender","recepient", "messageData", "messageText", "sentDatetime"],
            where: {
                senderID: req.body.message.sender,
                recepientID: req.body.message.recepient
            },
            limit: resultsPerPage,
            offset: resultsPerPage * pageNumber
        })
        .then( msg => {
            if (msg.length > 0) {
                res.json(msg)
            } else {
                res.json({ msg: 'No messages were found.'})
            }
        })
        .catch(err => res.json(getErrorMessage(err)))
}
const read = () => {} // TODO: Need to check if this function makes any sense
const update = () => {} // TODO: Need to check if this function makes any sense
const remove = async (req, res) => {
    var msgID

    await messageSchema.findAll({ attributes: ["id"], where: { id: req.params.id } })
        .then( foundID => {
            if (foundID.length != 0) {
                msgID = foundID[0].id
            } else res.json({ msg: `The given id '${req.params.id}' was not found`})
        })
        .catch(err => res.json(getErrorMessage(err)))

    if (msgID) {
        userSchema.destroy({ where: { id: msgID } })
            .then( () => {res.json({msg: `The message with ID ${msgID} has been deleted successfully.`})})
            .catch(err => res.json(getErrorMessage(err)))
    }
}

export {
    create,
    list,
    read,
    update,
    remove
}