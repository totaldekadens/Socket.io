import { useContext } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserBar = () => {

    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)

    const buttonHandler = (room) => {

        let socketInfoCopy = {...socketInfo}  
        let socket = getSocket()

        socket.emit("leave", room)

        socketInfoCopy.joinedRoom = ""
        setSocketInfo(socketInfoCopy)
}

    return (
        <div style={userBarStyle}>
            <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                <AccountCircleIcon style={{color: socketInfo.avatarColor}}/>
                <p style={{fontSize: "20px"}}>{socketInfo.nickname}</p>
            </div>
            {/* Bortkommenterad så länge. Kolla med Hugo och Fredrik */}
            {/* {socketInfo.joinedRoom != "" ? (
            <div 
                style={{background: "red", cursor: "pointer", borderRadius: "5px", width: "100px", textAlign: "center"}} 
                onClick={() => buttonHandler(socketInfo.joinedRoom)}
                >
                <p style={{padding: "5px"}}>Lämna rum</p>
            </div>
        ): undefined} */}
        </div>
    )
}

const userBarStyle = { 
    height: "50px", 
    width: "100%", 
    display: "flex",
    gap: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid grey",
    color: "white"
}

export default UserBar;