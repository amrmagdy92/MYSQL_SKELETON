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
const list = () => {}
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