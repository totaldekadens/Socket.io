import CreateRoom from "./createRoom"
import ListOfRooms from "./listOfRooms"

const Sidebar = () => {

    return (
        <div style={{flexGrow: "1", backgroundColor: "#484848"}}>
            <CreateRoom/>
            <ListOfRooms/>
        </div>
    )
}

export default Sidebar
