
const UsersInRoom = (props) => {

    return (
        <div>
            {
                props.users.map((user) => {
                    
                    return(
                        <p key={user.id} style={{color: "white"}}>{user.nickname}</p>
                    )
                })
            }

        </div>
    )
}

export default UsersInRoom