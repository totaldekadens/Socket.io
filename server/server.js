import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';
import { getCity } from "./api/weather/getCity.js";
import { getWeather } from "./api/weather/getWeather.js";
import { getGif } from "./api/gif/getGif.js";

const app = express()
const httpServer = createServer(app);
const port = 3000
const io = new Server(httpServer, {cors: {origin: "*"}});


io.on("connection", async (socket) => {
    console.log("Socket has connected: " + socket.id)

    io.emit("newSocketConnected", socket.id)

    /* Ange */
    
    // Join/Create room
    socket.on("join", (socketRoomData) => {
        socket.leave(socketRoomData.roomToLeave)
        socket.join(socketRoomData.roomToJoin)
        socket.nickname = socketRoomData.nickname
        io.in(socketRoomData.roomToJoin).emit("welcome", `Välkommen ${socket.nickname}`)
    })

    // Get rooms
    socket.on("getRooms", () => {
        console.log(io.sockets.adapter.rooms)
    })


    /* Fredrik */




    /* Hugo */
    // Recieves the message sent from client
    socket.on("msg", async (msgObj) => {
        console.log(msgObj.msg)

        const msg = msgObj.msg.toString();

        if(msg.startsWith("/w")) {

            const city = msg.substring(3)

            if(msg != "" || msg != " "){

                const cityResponse = await getCity(city);
                const weather =  await getWeather(cityResponse);

                io.in(msgObj.joinedRoom).emit("msg", {msg: "Weather in: " + cityResponse.cityName + ".", nickname: socket.nickname, weather})

                return;
            }

            return;
        }

        if(msg.startsWith("/gif")) {

            const gifName = msg.substring(5)

            if(msg != "" || msg != " "){

                console.log(gifName)

                const gifUrl = await getGif(gifName)

                io.in(msgObj.joinedRoom).emit("msg", {msg: "", nickname: socket.nickname, gifUrl})

                return;
            }

            return;
        }
        io.in(msgObj.joinedRoom).emit("msg", {msg: msgObj.msg, nickname: socket.nickname})
    })
})





httpServer.listen(port, () => {
    console.log("Server is running on port: " + port)
});