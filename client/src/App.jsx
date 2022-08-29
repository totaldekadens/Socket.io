import io from 'socket.io-client';
import { useEffect } from 'react'
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';

function App() {

  const socket = io('http://localhost:3000');

  useEffect(() => {
    console.log("kommer in i useeffect")

    socket.on("newSocketConnected", (socketId) => {
      console.log("New socket connected: " + socketId)
    })

  }, [])


  return (
    <div style={{display: "flex", width: "100vw", height: "100vh"}}>
      <Sidebar/>
      <Content/>
    </div>
  )
}

export default App
