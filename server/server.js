import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';
import { router as cityRouter } from './api/weather/getCity.js'
import { router as weatherRouter } from './api/weather/getWeather.js'
import { router as gifRouter } from './api/gif/getGif.js'

const app = express()
const httpServer = createServer(app);
const port = 3000
const io = new Server(httpServer, {cors: {origin: "*"}});

app.use("/api/city", cityRouter);
app.use("/api/weather", weatherRouter)
app.use("/api/gif", gifRouter)


io.on("connection", (socket) => {
    console.log("Socket has connected: " + socket.id)

    io.emit("newSocketConnected", socket.id)

    /* Ange */




    /* Fredrik */




    /* Hugo */
})





httpServer.listen(port, () => {
    console.log("Server is running on port: " + port)
});