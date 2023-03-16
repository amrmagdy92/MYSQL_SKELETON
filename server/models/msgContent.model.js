import { DataTypes } from "sequelize"

import { sequelize } from "../helpers/db.helpers"
import messageSchema from "./message.model"

const messageContentSchema = sequelize.define("message_content", {
    isMedia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: {
                msg: "Invalid media URL."
            }
        }
    },
    mediaType: {
        type: DataTypes.ENUM("gif", "pdf", "mp4", "png"),
        allowNull: true,
        validate: {
            isIn: {
                args: ["gif", "pdf", "mp4", "png"],
                msg: "Invalid media type: media can only be either gif, or pdf, or mp4, or png"
            }
        }
    },
    messageText: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    paranoid: true
})

messageContentSchema.belongsTo(messageSchema, { foreignKey: { name: "messageContentID"}})

export default messageContentSchema