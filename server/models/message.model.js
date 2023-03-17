import { DataTypes, Sequelize } from "sequelize"

import { sequelize } from "../helpers/db.helpers"
import messageContentSchema from "./msgContent.model"

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
    messageData: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    messageText: {
        type: DataTypes.STRING,
        allowNull: true
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