
import UsersInRoom from "./usersInRoom"
import { useContext, useEffect, useState, useRef } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { io } from "socket.io-client";


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
      
            console.log(room)
            if(room === socketInfo.joinedRoom){
                socket.emit("leave", room)
                
                socketInfoCopy.joinedRoom = ""
                setSocketInfo(socketInfoCopy)

            }else{
                socket.emit("join", {
                    roomToLeave: socketInfo.joinedRoom, 
                    roomToJoin: room, 
                    nickname: socketInfo.nickname
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
                        getRoom.map((room) => {

                            return (
                                <div style={listitemContainer} key={room.room}>
                                    <Accordion style={{ width: "100%", backgroundColor: "#484848", border: "0", boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography style={{ color: "white" }}># {room.room}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <UsersInRoom users={room.sockets} room={room.room} />
                                        
                                            <div onClick={() => buttonHandler(room.room)} style={{...buttonStyle, backgroundColor: socketInfo.joinedRoom == room.room ? "red": "green"}}>
                                                <p style={{ color: "white" }}>{ socketInfo.joinedRoom == room.room ? "Lämna" : "Anslut"}</p> {/* Use context to check if the room = the room that the user is connected to. And render "leave" instead of "connect". */}
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
    maxWidth: "200px",
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
}


const buttonStyle = {
    padding: "3px",
    marginTop: "20px",
    width: "70px",
    textAlign: "center",
    borderRadius: "5px"
}



export default ListOfRooms