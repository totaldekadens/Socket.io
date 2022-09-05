import CreateRoom from "./createRoom"
import ListOfRooms from "./listOfRooms"
import UserBar from "./userBar"

const Sidebar = () => {

    return (
        <div style={{minWidth:"300px", backgroundColor: "#484848", padding: "10px", display:"flex", flexDirection:"column", justifyContent:"space-between", boxShadow:"2px 0px 5px 0px #2E2E2E", zIndex: "1"}}>
            <div>
                <CreateRoom/>
                <ListOfRooms/>
            </div>
            <UserBar />
        </div>
    )
}

export default Sidebar
