import { useContext, useState } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import TextField from '@mui/material/TextField';

const CreateRoom = () => {

    // Context
    const { socket, socketInfo, setSocketInfo } = useContext(socketInfoContext)

    // States
    const [isCreateRoom, setIsCreateRoom] = useState(false)
    const [room, setRoom] = useState("")

    // Copy of context
    let socketInfoCopy = socketInfo  // Checka med Victor om kopieringen blir rätt {...socketInfo}. Skillnad?

    // Handle "skapa rum"-button. "Sends" new object when joining new room and updates context. 
    const handleClick = () => {

        socket.emit("join", {
            roomToLeave: socketInfo.joinedRoom, 
            roomToJoin: room, 
            nickname: socketInfo.nickname
        })

        socketInfoCopy.joinedRoom = room
        setSocketInfo(socketInfoCopy)
        setIsCreateRoom(false)
        setRoom("")
    }

    // Temporary
    const handleGetRooms = () => {
        socket.emit("getRooms")
    }

    return (
        <div style={{display: "flex", flexDirection: "column", padding: "10px"}}>
            <div style={{padding: "10px", width: "100%", display: "flex", justifyContent: "flex-end", cursor: "pointer"}} onClick={() => setIsCreateRoom(!isCreateRoom)}><h3>Skapa rum +</h3></div> {/* ikon sedan */}
            
            { isCreateRoom ? 
                <>
                    <TextField sx={{padding: "10px"}} id="outlined-basic" label="Fyll i rum..." variant="outlined" type="text" value={room} onChange={(event) => {setRoom(event.target.value)}} />
                    <button style={{padding: "10px"}} onClick={handleClick}>Skapa rum</button>
                </>  
                :   ""} 
            {/* Temporary */}
            <button style={{padding: "10px"}} onClick={handleGetRooms}>Hämta alla rum</button>  {/* Temporär bara för att checka så att det funkar */}
        </div>
    )
}

export default CreateRoom