
import UsersInRoom from "./usersInRoom"
import { useContext, useEffect, useState, useRef } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const ListOfRooms = () => {

    // Context
    const joinedRoomRef = useRef()
    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)
    joinedRoomRef.current = socketInfo.joinedRoom
    const roomRef = useRef()
    const [getRoom, setRoom] = useState([])
    roomRef.current = getRoom;
    const [currentRoom, setCurrentRoom] = useState([])

    // Gets socket
    let socket = getSocket()

    let socketInfoCopy = {...socketInfo}


    useEffect(() => {
        socket.on("rooms", (roomList) => {

            roomList.forEach(room => {
                console.log(room)
                room.expand = false
            })

            // Tar med alla rum i listan
            //setRoom(roomList)

            const current = roomList.map((room) => {

                if (room.room == joinedRoomRef.current) {
                    return room
                }
            })

            const filterCurrent = current.filter(room => room != undefined)

            setCurrentRoom(filterCurrent)


            // Tar bort det valda rummet från listan
            if(filterCurrent.length > 0) {
                const filterActive = roomList.filter(room => room.room != filterCurrent[0].room)

                setRoom(filterActive)
            } else {
                setRoom(roomList)
            }
            
        })

        return () => {
            socket.off('rooms');
        };

    }, [])


    const buttonHandler = (room) => {

        const roomCopy = [...getRoom]

        roomCopy.forEach(item => {
            if (item.room == room.room) {
                item.expand = false
            }
        })

        setRoom(roomCopy)

        if (room === socketInfo.joinedRoom) {
            socket.emit("leave", room)

            socketInfoCopy.joinedRoom = ""
            setSocketInfo(socketInfoCopy)

        } else {
            socket.emit("join", {
                roomToLeave: socketInfo.joinedRoom,
                roomToJoin: room,
                nickname: socketInfo.nickname,
                avatarColor: socketInfo.avatarColor
            })
            socketInfoCopy.joinedRoom = room
            setSocketInfo(socketInfoCopy)
        }
    }

    // Expands and collapse accordion. Toggles between true and false
    const handleClick = (room) => {

        const roomCopy = [...getRoom]

        roomCopy.forEach(item => {
            const bool = item.expand
            if (item.room == room.room) {
                item.expand = !bool
            }
        })

        setRoom(roomCopy)
    }

    return (
        <div style={{ color: "white" }}>
            <div style={{ ...listContainerStyle, marginBottom: "30px" }}>
                {currentRoom.length > 0 ? currentRoom.map((room, index) => {
                    return (
                        <div style={{ ...listitemContainer, borderBottom: "unset" }} key={index}>
                            <Accordion defaultExpanded={true} style={{ width: "100%", backgroundColor: "rgb(102 102 102)", boxShadow: "none", borderRadius: "5px", marginBottom: "30px" }}>
                                <AccordionSummary
                                >
                                    <div style={{ width: "100%", paddingRight: "5px", display: "flex", justifyContent: "space-between" }}>
                                        <Typography style={{ color: "white" }}># {room.room}</Typography>
                                        <Typography style={{ color: "white" }}>({room.sockets.length})</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <UsersInRoom users={room.sockets} room={room.room} />
                                    <div
                                        onClick={() => buttonHandler(room.room)}
                                        style={{ ...buttonStyle, backgroundColor: socketInfo.joinedRoom == room.room ? "red" : "green" }}
                                    >
                                        <p style={{ color: "white", padding: "3px" }}>{socketInfo.joinedRoom == room.room ? "Lämna" : "Anslut"}</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                }) : ""}
            </div>

            <h2>Aktiva rum:</h2>

            <div style={listContainerStyle}>
                {
                    getRoom.length > 0 ? (
                        getRoom.map((room, index) => {

                            return (
                                <div style={listitemContainer} key={index}>
                                    <Accordion defaultExpanded={false} expanded={room.expand} style={{ width: "100%", backgroundColor: "#484848", boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            onClick={() => { handleClick(room) }}
                                        >
                                            <div style={{ width: "100%", paddingRight: "5px", display: "flex", justifyContent: "space-between" }}>
                                                <Typography style={{ color: "white" }}># {room.room}</Typography>
                                                <Typography style={{ color: "white" }}>({room.sockets.length})</Typography>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <UsersInRoom users={room.sockets} room={room.room} />
                                            <div
                                                onClick={() => buttonHandler(room.room)}
                                                style={{ ...buttonStyle, backgroundColor: socketInfo.joinedRoom == room.room ? "red" : "green" }}
                                            >
                                                <p style={{ color: "white", padding: "3px" }}>{socketInfo.joinedRoom == room.room ? "Lämna" : "Anslut"}</p>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )
                        })
                    ) : undefined
                }
            </div>
        </div>
    )
}

const listContainerStyle = {
    maxWidth: "90%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontFamily: 'Roboto, sans-serif'
}

const listitemContainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid grey"
}


const buttonStyle = {
    marginTop: "20px",
    width: "70px",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer"
}



export default ListOfRooms