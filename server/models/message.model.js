import { DataTypes, Sequelize } from "sequelize"

import { sequelize } from "../helpers/db.helpers"

const messageSchema = sequelize.define('message', {
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/,
                msg: "The provided phone is invalid"
            }
        }
    },
    recepient: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/,
                msg: "The provided phone is invalid"
            }
        }
    },
    messageType: {
        type: DataTypes.ENUM("GIF", "TEXT", "VIDEO", "PIC"),
        allowNull: false
    },
    messageContentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: "Message content ID must be an Integer"
            }
        }
    },
    sentDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.now
    }
}, {
    paranoid: true
})

export default messageSchema