import crypto from "crypto"

function encryptPassword (password, salt) {
    if (password == '' || password == null || password == undefined) return ''
    try {
        return crypto
            .createHmac('sha1', salt)
            .update(password)
            .digest('hex')
    } catch (err) {
        return err
    }
}

function makeSalt () {
    return Math.round(new Date().valueOf() * Math.random()).toString()
}

export default {
    encryptPassword,
    makeSalt
}