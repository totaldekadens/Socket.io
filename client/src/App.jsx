
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import { useContext, useState, useEffect } from "react"
import { socketInfoContext } from './components/context/socketInfoProvider';
import Modal from './components/modal/modal';
import SingleInput from './components/interaction/singleInput';

function App() {

  // Context
  const { socketInfo, setSocketInfo, connectSocket, getSocket} = useContext(socketInfoContext)

  // State
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [nickname, setNickname] = useState("")

  // Updates socketInfo with nickname and closes modal.
  const handleClick = () => {

    let socketInfoCopy = socketInfo

    if (nickname.length > 0) {
      socketInfoCopy.nickname = nickname
      setSocketInfo(socketInfoCopy)
      setShouldShowModal(false)
      connectSocket()

     // let hej = getSocket()
      //console.log("ConnectSocket/Nickname: " + hej)
    }

  }

  // If nickname is not set then modal will show up and ask for nickname before proceed.
  useEffect(() => {

    socketInfo.nickname == "" ?
      setShouldShowModal(true) :
      setShouldShowModal(false)

  }, [])

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar />
      <Content />
      <Modal
        shouldShow={shouldShowModal}
        onRequestClose={() => setShouldShowModal(false)}
        isGetStarted={true}
      >
        <SingleInput
          state={nickname}
          setState={setNickname}
          handleClick={handleClick}
          label="Fyll i ditt smeknamn..."
          btnLabel="Fortsätt"
          title="Välkommen till chatten!"
        />
      </Modal>
    </div>
  )
}

export default App
