
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import { useContext, useState, useEffect } from "react"
import { socketInfoContext } from './components/context/socketInfoProvider';
import Modal from './components/modal/modal';
import TextField from '@mui/material/TextField';

function App() {

    // Context
  const { socketInfo, setSocketInfo } = useContext(socketInfoContext)

  // State
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [nickname, setNickname] = useState("")


  const handleClick = () => {
   
    let socketInfoCopy = socketInfo

    if(nickname.length > 0) {
      socketInfoCopy.nickname = nickname
      setSocketInfo(socketInfoCopy)
      setShouldShowModal(false)
    }

  }

  // If nickname is not set then modal will show up and ask for nickname before proceed.
  useEffect(() => {

    socketInfo.nickname == "" ? 
      setShouldShowModal(true) : 
      setShouldShowModal(false)

}, [] )

  return (
    <div style={{display: "flex", width: "100vw", height: "100vh"}}>
        <Sidebar/>
        <Content/>
        <Modal shouldShow={shouldShowModal} onRequestClose={() => setShouldShowModal(false)} >
            {/* Component for add nickname */}
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <TextField sx={{padding: "10px"}} id="outlined-basic" label="Fyll i ditt smeknamn" variant="outlined" type="text" value={nickname} onChange={(event) => {setNickname(event.target.value)}} />
              <button style={{padding: "10px"}} onClick={handleClick}>Fortsätt</button>
            </div>
            
        </Modal>
    </div>
  )
}

export default App
