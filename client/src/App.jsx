import io from 'socket.io-client';
/* import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"; */
import { useEffect } from 'react'

function App() {

  const socket = io('http://localhost:3000');

  useEffect(() => {
    console.log("kommer in i useeffect")

    socket.on("newSocketConnected", (socketId) => {
      console.log("New socket connected: " + socketId)
    })

  }, [])


  return (
    <div>hej</div>
  )
}

export default App
