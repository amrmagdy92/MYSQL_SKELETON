import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compress from "compression"
import cors from "cors"
import helmet from "helmet"

import userRouter from "./routes/user.routes"
import authRouter from "./routes/auth.routes"

dotenv.config()

const app = express()

const configuredBodyParserJSON = bodyParser.json()
const configuredBodyParserURL = bodyParser.urlencoded({ extended: true })
const configuredCookieParser = cookieParser()
const configuredCompression = compress()
const configuredHelmet = helmet()
const configuredCors = cors({ origin: process.env.ORIGIN_URL })

app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURL)
app.use(configuredCookieParser)
app.use(configuredCompression)
app.use(configuredHelmet)
app.use(configuredCors)

// TODO: Add better UX when handling this error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

app.use('/api/v1/users', userRouter)
app.use('/', authRouter)

export default app