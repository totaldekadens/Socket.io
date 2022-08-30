
const UsersInRoom = (props) => {

    return (
        <div>
            {
                props.users.map((user) => {
                    
                    return(
                        <p style={{color: "white"}}>{user.nickname}</p>
                    )
                })
            }
            <div style={joinButton}>
                <p style={{color: "white"}}>Anslut</p> {/* Use context to check if the room = the room that the user is connected to. And render "leave" instead of "connect". */}
            </div>
        </div>
    )
}

const joinButton = {
    padding: "3px",
    marginTop: "20px",
    backgroundColor: "green",
    width: "70px",
    textAlign: "center",
    borderRadius: "5px"
}

export default UsersInRoom