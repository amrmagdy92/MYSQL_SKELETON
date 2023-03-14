import userModel from "../models/user.model"
import jwt from "jsonwebtoken"
import expressJwt from "express-jwt"
import isEmail from "isemail"
import config from "../config/server.conf"
import { getErrorMessage } from "../helpers/db.helpers"
import { authenticate } from "../helpers/auth.helper"

const signin = (req, res) => {
    var user
    if (!isEmail.validate(req.body.user.email)) {
        res.json({ msg: `The provided email: ${req.body.user.email} is invalid`})
    } else if (isEmail.validate(req.body.user.email)) {
        userModel
        .findAll({ where: { email: req.body.user.email }})
        .then( foundUser => {
            if (foundUser.length != 0) {
                user = foundUser[0]
            } else {
                res.json({ msg: `The email: ${req.body.user.email} was not found`})
            }
        })
        .catch(err => res.json(getErrorMessage(err)))
        if (!authenticate(user, req.body.user.password)) {
            res.status(401).json({ msg: "Email and password do not match."})
        }
        const token = jwt.sign({ _id: user.id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + config.jwtExpiry })

        res.json({
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } else {
        res.status(401).json({ msg: "Could not sign in" })
    }
}
const signout = (req, res) => {
    res.clearCookie('t')
    res.status(200).json({ msg: "Signed out" })
}
const requireSignin = true
const hasAuthorization = () => {}

export { signin, signout, hasAuthorization, requireSignin }