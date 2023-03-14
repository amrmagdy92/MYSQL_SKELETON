import { encryptPassword } from "./user.helpers"

const authenticate = (user, password) => {
    const userSalt = user.salt
    const hashedPassword = encryptPassword(password, userSalt)
    return hashedPassword === user.hashedPassword
}

export {
    authenticate
}