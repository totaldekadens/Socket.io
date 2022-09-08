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
let isTypingList = []

io.on("connection", async (socket) => {
    console.log("Socket has connected: " + socket.id)
    io.emit("rooms", convertRoom())
    io.emit("newSocketConnected", socket.id)
    
    // Join/Create room
    socket.on("join", (socketRoomData) => {
        socket.leave(socketRoomData.roomToLeave)
        socket.join(socketRoomData.roomToJoin)
        socket.nickname = socketRoomData.nickname
        socket.avatarColor = socketRoomData.avatarColor
        io.emit("rooms", convertRoom())
        io.in(socketRoomData.roomToJoin).emit("welcome", `Välkommen ${socket.nickname}`)
        removeSocket(socketRoomData.roomToLeave)
    })


    socket.on("resetIsTypingList", (reset) => {
        isTypingList = reset
    })

    // shows/checks if someone is typing in a specific room
    socket.on("isTyping", (msgObj) => {

        // Returns all rooms
        const getRooms = convertRoom()

        // Returns joined room
        let getRoom = getRooms.map((room) => {

            const findId = room.sockets.find(user => user.id == socket.id)
            
            if(findId && findId.id == socket.id) {
                return room.room
            }

        })

        getRoom = String(getRoom)
        getRoom = getRoom.replaceAll(",", "")

        if(!getRoom) {
            return
        }

        let joinedRoom = String(getRoom)

        const filterRooms = isTypingList.filter(room => room.joinedRoom == joinedRoom)
        isTypingList = filterRooms

        msgObj.nickname = socket.nickname
        msgObj.joinedRoom = joinedRoom
        msgObj.id = socket.id

        // If someone is typing
        if(msgObj.isTyping) {            
            
            // Check if Id is in list, if it's not, push the object to the list
            const findId = isTypingList.find((user) => user.id == socket.id)

            if(!findId) {
                isTypingList.push(msgObj)
            }

            socket.broadcast.to(joinedRoom).emit("isTyping", isTypingList);

        } else {
            removeSocket(joinedRoom)
        }
    })
    







    socket.on("disconnect", () => {
        io.emit("rooms", convertRoom())
    })

    socket.on("leave", (room) => {
        socket.leave(room)
        
        io.emit("rooms", convertRoom())

        removeSocket(room)
    })

    socket.emit("commandList", [
            {
                command: "/gif",
                desc: "Skriv /gif följt av vad du vill söka på."
            },{
                command: "/w",
                desc: "Skriv /w följt av staden du vill visa vädret i."
            }
    ])






    // Recieves the message sent from client
    socket.on("msg", async (msgObj) => {

        const msg = msgObj.msg.toString();

        const errMsg = "Kunde inte hitta kommandot som du letade efter, just nu så kan man bara skriva in /w (stad) för väder och /gif (sökord) för GIF-bilder.";

        if (msg.startsWith("/")) {

            if(msg.startsWith("/w")) {

                const city = msg.substring(3)

                if((/[a-zA-ZäöüÄÖÜß]/).test(city)){

                    const cityResponse = await getCity(city);
                    if(!cityResponse) {
                        socket.emit('msg', {msg: "Vi kunde inte hitta en stad som heter: " + city, nickname: "Server:"});
                        return
                    }
                    const weather =  await getWeather(cityResponse);

                    io.in(msgObj.joinedRoom).emit("msg", {msg: "Såhär är vädret i " + cityResponse.cityName + ":", nickname: socket.nickname, avatarColor: msgObj.avatarColor, weather})

                    return;
                }
                socket.emit('msg', {msg: errMsg, nickname: "Server:"});
                return;
            }

            if(msg.startsWith("/gif")) {
                
                const gifName = msg.substring(5)
                
                if((/[a-zA-ZäöüÄÖÜß]/).test(gifName)){

                    const gifUrl = await getGif(gifName)

                    if(!gifUrl) {
                        socket.emit('msg', {msg: "Vi kunde inte hitta en gif som matchade med: " + gifName, nickname: "Server:"});
                        return
                    }
                    io.in(msgObj.joinedRoom).emit("msg", {msg: "", nickname: socket.nickname, gifUrl, avatarColor: msgObj.avatarColor})

                    return;
                }
                socket.emit('msg', {msg: errMsg, nickname: "Server:"});
                return;
            }

            socket.emit('msg', {msg: errMsg, nickname: "Server:"});
            return;
        }
        io.in(msgObj.joinedRoom).emit("msg", {msg: msgObj.msg, nickname: socket.nickname, avatarColor: msgObj.avatarColor})
    })

    // Removes socket from typingList if it currently is typing when leaving
    const removeSocket = (room) => {
        const removeId = isTypingList.filter(user => user.id != socket.id)
        isTypingList = removeId
        socket.broadcast.to(room).emit("isTyping", isTypingList);
    }
})


const convertRoom = () => {

    const convertedArray = Array.from(io.sockets.adapter.rooms)

    const filteredRooms = convertedArray.filter(room => !room[1].has(room[0]) )
    
    const roomsWithSocketID = filteredRooms.map((roomArray) => {
        return {room: roomArray[0], sockets: Array.from(roomArray[1])} 
    })

    

    const roomsWithIdsAndNickname = roomsWithSocketID.map((roomObj) => {
        

        const nicknames = roomObj.sockets.map((socketId) => {
            

            
            return { id: socketId, nickname: io.sockets.sockets.get(socketId).nickname, avatarColor: io.sockets.sockets.get(socketId).avatarColor }
        })
        return {room: roomObj.room, sockets: nicknames}
    })

    return roomsWithIdsAndNickname
 

}

httpServer.listen(port, () => {
    console.log("Server is running on port: " + port)
});
