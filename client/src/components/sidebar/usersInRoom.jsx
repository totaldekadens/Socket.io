
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UsersInRoom = (props) => {

    return (
        <div style={{display: "flex", flexDirection: "column", gap:"10px"}}>
            {
                props.users.map((user, index) => {
                    
                    return(
                        <div style={userContainerStyle} key={index}>
                            <AccountCircleIcon style={{color: user.avatarColor}}/>
                            <p key={user.id} style={{color: "white"}}>{user.nickname}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

const userContainerStyle = {
    padding: "5px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    backgroundColor: "rgb(56, 56, 56)",
    borderRadius: "10px"
}

export default UsersInRoom