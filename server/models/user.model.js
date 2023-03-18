import { DataTypes } from "sequelize"

import { sequelize } from "../helpers/db.helpers"

const userSchema = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Name can only contain letters"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Name can only contain letters"
            }
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email doesn't match the example@exmaple.ex"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        is: {
            args: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/,
            msg: "The provided phone is invalid"
        }
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
        // TODO: Ensure the frontend does the below validation before sending.
        // validate: {
        //     is: {
        //         args: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/,
        //         msg: "Password must have at least one special character and be  minimum of 8 characters long."
        //     }
        // }
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    paranoid: true,
    indexes: [ { fields: ['email'], unique: true } ]
})

export default userSchema