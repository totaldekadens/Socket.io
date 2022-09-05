
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
    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)
    const roomRef = useRef()
    const [getRoom, setRoom] = useState([])
    roomRef.current = getRoom;

    // Gets socket
    let socket = getSocket()

    let socketInfoCopy = {...socketInfo}  


    useEffect(() => {
        socket.on("rooms", (roomList) => {
            setRoom(roomList)
        })

        return () => {
            socket.off('rooms');
        };

    }, [])

    const buttonHandler = (room) => {

            if(room === socketInfo.joinedRoom){
                socket.emit("leave", room)
                
                socketInfoCopy.joinedRoom = ""
                setSocketInfo(socketInfoCopy)

            }else{
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

    return (
        <div style={{ color: "white" }}>
            <h2>Aktiva rum:</h2>

            <div style={listContainerStyle}>
                {
                    getRoom.length > 0 ? (
                        getRoom.map((room, index) => {
                            console.log(socketInfo.joinedRoom == room.room )
                            
                            return (
                                <div style={listitemContainer} key={index}>
                                    <Accordion style={{ width: "100%", backgroundColor: "#484848", boxShadow: "none"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <div style={{width: "100%", paddingRight: "5px", display: "flex", justifyContent: "space-between" }}>
                                                <Typography style={{ color: "white" }}># {room.room}</Typography>
                                                <Typography style={{ color: "white" }}>({room.sockets.length})</Typography>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <UsersInRoom users={room.sockets} room={room.room}/>
                                            <div 
                                                onClick={() => buttonHandler(room.room)} 
                                                style={{...buttonStyle, backgroundColor: socketInfo.joinedRoom == room.room ? "red": "green"}}
                                            >
                                                <p style={{ color: "white", padding:"3px" }}>{ socketInfo.joinedRoom == room.room ? "Lämna" : "Anslut"}</p>
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