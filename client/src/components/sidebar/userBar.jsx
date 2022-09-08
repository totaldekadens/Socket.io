import { useContext } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserBar = () => {

    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)

    return (
        <div style={userBarStyle}>
            <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                <AccountCircleIcon style={{color: socketInfo.avatarColor}}/>
                <p style={{fontSize: "20px"}}>{socketInfo.nickname}</p>
            </div>
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