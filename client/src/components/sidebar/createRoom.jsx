import { useContext, useState } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import Modal from '../modal/modal'
import SingleInput from "../interaction/singleInput";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

const CreateRoom = () => {

    // Context
    const { socketInfo, setSocketInfo, getSocket} = useContext(socketInfoContext)

    // States
    const [shouldShowModal, setShouldShowModal] = useState(false)
    const [room, setRoom] = useState("")

    // Copy of context
    let socketInfoCopy = {...socketInfo}  // Checka med Victor om kopieringen blir rätt {...socketInfo}. Skillnad?

    // Gets socket
    let socket = getSocket()

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

   

    return (
    <>
        <div style={{display: "flex", flexDirection: "column", padding: "10px"}}>
            <div 
                style={container} 
                
            >
                <div  onClick={() => setShouldShowModal(true)} style={{display:"flex", gap:"20px", alignItems:"center",cursor: "pointer",}}>
                <p>Skapa rum</p><AddBoxRoundedIcon/>

                </div>
            </div> 
                    
           
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

const container = {
    padding: "10px", 
    width: "100%", 
    display: "flex", 
    justifyContent: "flex-end", 
    
    color: "white",
    fontSize:"25px",
    columnGap: "5px",
    alignItems: "center"
}

export default CreateRoom