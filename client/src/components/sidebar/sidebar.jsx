import CreateRoom from "./createRoom"
import ListOfRooms from "./listOfRooms"
import UserBar from "./userBar"

const Sidebar = () => {

    return (
        <div style={{flexGrow: "1", backgroundColor: "#484848", padding: "10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div>
                <CreateRoom/>
                <ListOfRooms/>
            </div>
            <UserBar />
        </div>
    )
}

export default Sidebar
