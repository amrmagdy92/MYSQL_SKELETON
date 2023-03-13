import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql"
    }
)

sequelize
    .sync()
    .then( () => { console.log('Database is now in sync...') })
    .catch( (err) => { console.log(`Synchornization was not done and the following error was caught:\n${err}`) })

const getErrorMessage = (receivedError) => {
    const errorMessages = {}
    for (let i = 0; i < receivedError.errors.length; i++) {
        path = receivedError.errors[i].path
        msg = receivedError.errors[i].message
        errorMessages.path = msg
    }
    return errorMessages
}

export {
    sequelize,
    getErrorMessage
}