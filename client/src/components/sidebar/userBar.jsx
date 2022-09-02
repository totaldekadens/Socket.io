import { useContext } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserBar = () => {

    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)

    const setButtonColor = (e, color) => {
        e.target.style.background = color;
    }

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
                <p>{socketInfo.nickname}</p>
            </div>
            {socketInfo.joinedRoom != "" ? (
            <div 
                style={{background: "red", cursor: "pointer"}} 
                onMouseOver={(e) => {setButtonColor(e, "#ff6347")}} onMouseOut={(e) => {setButtonColor(e, "red")}}
                onClick={() => buttonHandler(socketInfo.joinedRoom)}
                >
                <p style={{padding: "3px"}}>Lämna rum</p>
            </div>
        ): undefined}
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