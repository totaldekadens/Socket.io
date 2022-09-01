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
    io.emit("rooms", convertRoom())
    io.emit("newSocketConnected", socket.id)

    /* Ange */
    
    // Join/Create room
    socket.on("join", (socketRoomData) => {
        socket.leave(socketRoomData.roomToLeave)
        socket.join(socketRoomData.roomToJoin)
        socket.nickname = socketRoomData.nickname
        io.emit("rooms", convertRoom())
        io.in(socketRoomData.roomToJoin).emit("welcome", `Välkommen ${socket.nickname}`)
    })

    // Get rooms
 

    /* Fredrik */
    socket.on("disconnect", () => {
        io.emit("rooms", convertRoom())
    })
    


    /* Hugo */
    // Recieves the message sent from client
    socket.on("msg", async (msgObj) => {

        const msg = msgObj.msg.toString();

        if(msg.startsWith("/w")) {

            const city = msg.substring(3)

            if(msg != "" || msg != " "){

                const cityResponse = await getCity(city);
                const weather =  await getWeather(cityResponse);

                io.in(msgObj.joinedRoom).emit("msg", {msg: "Current weather in " + cityResponse.cityName + ":", nickname: socket.nickname, weather})

                return;
            }

            return;
        }

        if(msg.startsWith("/gif")) {

            const gifName = msg.substring(5)

            if(msg != "" || msg != " "){

                const gifUrl = await getGif(gifName)

                io.in(msgObj.joinedRoom).emit("msg", {msg: "", nickname: socket.nickname, gifUrl})

                return;
            }

            return;
        }
        io.in(msgObj.joinedRoom).emit("msg", {msg: msgObj.msg, nickname: socket.nickname})
    })
})



const convertRoom = () => {

    const convertedArray = Array.from(io.sockets.adapter.rooms)
 
    const filteredRooms = convertedArray.filter(room => !room[1].has(room[0]) )
    
    const roomsWithSocketID = filteredRooms.map((roomArray) => {
         return {room: roomArray[0], sockets: Array.from(roomArray[1])} 
    })

    

    const roomsWithIdsAndNickname = roomsWithSocketID.map((roomObj) => {
        

        const nicknames = roomObj.sockets.map((socketId) => {
            

            
            return { id: socketId, nickname: io.sockets.sockets.get(socketId).nickname }
        })
        return {room: roomObj.room, sockets: nicknames}
    })

    return roomsWithIdsAndNickname
    /* // NOTE: Alla ? skall ersättas med korrekt kod
    // Gör om map till en array med arrayer
    const convertedArray = Array.from(io.sockets.adapter.rooms)
    // Filtrera bort samtliga sockets
    const filteredRooms = convertedArray.filter(room => ?.has(?))
    // Plocka ut rum med socketIDs
    const roomsWithSocketID = filteredRooms.map((roomArray) => {
        return {room: ?, sockets: Array.from(?)}
    })
    // Plocka ut rum med socketIDs och nicknames
    const roomsWithIdsAndNickname = roomsWithSocketID.map((roomObj) => {
        const nicknames = roomObj.sockets.map((socketId) => {
            return { id: socketId, nickname: io.sockets.sockets.get(roomObj).nickname }
        })
        return {room: roomObj.room, sockets: nicknames}
    })
    return roomsWithIdsAndNickname */

}

httpServer.listen(port, () => {
    console.log("Server is running on port: " + port)
});
