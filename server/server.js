import cluster from "node:cluster"
import { availableParallelism } from "node:os"
import http from "http"
import dotenv from "dotenv"

import app from "./app"
import config from "./config/config"

dotenv.config()

const cpuCount = availableParallelism()

if (config.multiCore) {
    if (cluster.isPrimary) {
        console.log(`Primary process started (${process.pid})`)

        for (let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }

        cluster.on('fork', (worker) => {
            console.log(`Worker #${worker.process.pid} was forked`)
        })
        cluster.on('online', (worker) => {
            console.log(`Worker #${worker.process.pid} has gone online`)
        })
        cluster.on('listening', (worker, address) => {
            console.log(`Worker #${worker.process.pid} is now listening on address ${address.address}:${address.port}`)
        })
        cluster.on('disconnect', (worker) => {
            console.log(`Worker #${worker.process.pid} has disconnected`)
        })
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker #${worker.process.pid} has died with code(${code}) and signal(${signal}).\nRestarting...`)
        })
    } else {
        http.createServer(app).listen(process.env.PORT, () => {
            console.log(`Server started on worker ${process.pid} and listening on port ${process.env.PORT}`)
        })
    }
} else {
    http.createServer(app).listen(process.env.PORT, (worker) => {
        console.log(`Server started and listening on port ${process.env.PORT}`)
    })
}