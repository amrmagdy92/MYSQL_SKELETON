import messageSchema from "../models/message.model"
import { getErrorMessage } from "../helpers/db.helpers"

const create = (req, res) => {
    var msg = {}
    var msgValidator = {}

    req.body.message.sender? msg.sender = req.body.message.sender : msgValidator.sender = "A sender is required"
    req.body.message.recepient? msg.recepient = req.body.message.recepient : msgValidator.recepient = "A recepient is required"
    req.body.message.messageData? msg.messageData = req.body.message.messageData : null
    req.body.message.messageText? msg.messageText = req.body.message.messageText : null
    req.body.message.sentDatetime? msg.sentDatetime = req.body.message.sentDatetime : msgValidator.sentDatetime = "Sent time is required"

    if (msgValidator.keys.length > 0) {
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
                senderID: req.body.senderID,
                recepientID: req.body.recepientID
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
const read = () => {}
const update = () => {}
const remove = () => {}

export {
    create,
    list,
    read,
    update,
    remove
}