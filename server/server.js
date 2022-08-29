import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express'

const app = express()
const httpServer = createServer(app);
const port = 3000
const io = new Server(httpServer, {cors: {origin: "*"}});



io.on("connection", (socket) => {
    console.log("Socket has connected: " + socket.id)

    io.emit("newSocketConnected", socket.id)
})




httpServer.listen(port, () => {
    console.log("Server is running on port: " + port)
});