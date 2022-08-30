import { useContext, useState } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import Modal from '../modal/modal'
import SingleInput from "../interaction/singleInput";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

const CreateRoom = () => {

    // Context
    const { socket, socketInfo, setSocketInfo } = useContext(socketInfoContext)

    // States
    const [shouldShowModal, setShouldShowModal] = useState(false)
    const [room, setRoom] = useState("")

    // Copy of context
    let socketInfoCopy = socketInfo  // Checka med Victor om kopieringen blir rätt {...socketInfo}. Skillnad?

    // Handle "skapa rum"-button. Closes modal, "Sends" new object when joining new room and updates context. 
    const handleClick = () => {

        if(room.length > 0) {
            socket.emit("join", {
                roomToLeave: socketInfo.joinedRoom, 
                roomToJoin: room, 
                nickname: socketInfo.nickname
            })
    
            socketInfoCopy.joinedRoom = room
            setSocketInfo(socketInfoCopy)
            setShouldShowModal(false)
            setRoom("")
        }
    }

    // Temporary
    const handleGetRooms = () => {
        socket.emit("getRooms")
    }

    return (
    <>
        <div style={{display: "flex", flexDirection: "column", padding: "10px"}}>
            <div 
                style={{
                    padding: "10px", 
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    cursor: "pointer",
                    color: "white",
                    fontSize:"25px",
                    columnGap: "5px",
                    alignItems: "center"
                }} 
                onClick={() => setShouldShowModal(true)}
            >
                <p>Skapa rum</p><AddBoxRoundedIcon/>
            </div> 
                    
            {/* Temporary */}
            <button style={{padding: "10px"}} onClick={handleGetRooms}>Hämta alla rum</button> 
        </div>
        <Modal
            shouldShow={shouldShowModal}
            onRequestClose={() => setShouldShowModal(false)}
            isGetStarted={false}
        >
            <SingleInput
                state={room}
                setState={setRoom}
                handleClick={handleClick}
                label="Fyll i rum..."
                btnLabel="Skapa"
                title="Skapa ditt egna rum"
            />
        </Modal>
    </>
    )
}

export default CreateRoom