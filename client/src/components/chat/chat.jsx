import { useContext, useEffect, useState, useRef } from "react"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Msg from './msg';
import { socketInfoContext } from "../context/socketInfoProvider";
import BeatLoader from 'react-spinners/BeatLoader';


const Chat = () => {

    // Context
    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)
    const [getValue, setValue] = useState("")
    const msgRef = useRef()
    const [getMsg, setMsg] = useState([])
    msgRef.current = getMsg;
    const [isTyping, setTyping] = useState(false)
    const [buddyIsTyping, setBuddyIsTyping] = useState([])

    const myRef = useRef(500);

    console.log(socketInfo.joinedRoom)

    // Gets socket
    let socket = getSocket()

    // Send message
    const handleSubmit = () => {

        if (getValue.trim().length > 0) {
            socket.emit("msg", { msg: getValue, joinedRoom: socketInfo.joinedRoom, avatarColor: socketInfo.avatarColor })
            setValue("")
        }
    }

    // Scrolls to "myRef" (div in the bottom of chat window) when called. (everytime a message arrives)
    const executeScroll = () => myRef.current.scrollIntoView({
        behavior: "auto",
    })


    // Receives message from senders
    useEffect(() => {

        socket.on("msg", (msgObj) => {
            const newMsgList = [...msgRef.current];

            newMsgList.push({
                nickname: msgObj.nickname,
                message: msgObj.msg,
                avatarColor: msgObj.avatarColor,
                weather: msgObj.weather,
                gifUrl: msgObj.gifUrl
            })

            setMsg(newMsgList)

        })

        return () => {
            socket.off('msg');
        };
    }, [])


    // When reloading page, reset array to an empty list
    useEffect(() => {
        let empty = []

        socket.emit("resetIsTypingList", empty )
    }, [])
    

    // Receives and sends status if someone is typing 
    useEffect(() => {

        // Checks if user is typing or not
        if (getValue.length > 0) {
            setTyping(true)
        } else {
            setTyping(false)
        }

        // If joined room is set send status to server
        if(socketInfo.joinedRoom.length > 0 ) {
            socket.emit("isTyping", { isTyping })

            // If rooms doesnt match, set list to an empty array
            if(buddyIsTyping.length > 0 && buddyIsTyping[0].joinedRoom) {
                if(socketInfo.joinedRoom != buddyIsTyping[0].joinedRoom) {
                    setBuddyIsTyping([])
                }
            }
        }

        // Receives status from senders
        socket.on("isTyping", (msgArray) => {

            // Removes user from list of current typers
            const removeId = msgArray.filter(id => id.id != socket.id)
            msgArray = removeId

            console.log(msgArray)

            // Set the list which renders who are typing
            setBuddyIsTyping(msgArray)
        })

        return () => {
            socket.off('isTyping');
        };


    }, [getValue, isTyping, socketInfo])

    // Calls on executescroll when a message from sender is received
    useEffect(() => {
        executeScroll()
    }, [getMsg])


    const handleKeyPress = (event) => {
        if (event.key == "Enter" && event.shiftKey) {
            return
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit()
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#383838", height: "100vh", overflow:"hidden", padding:"20px"}}>

            <div>
                <div>
                    <h1 style={{color:"gray", marginBottom:"15px"}}># {socketInfo.joinedRoom}</h1>
                </div>
            </div>

            <div style={{flexGrow: 1,flexDirection: "column", justifyContent: "flex-end", flex: 1, overflowY: "auto", padding: "20px"}}>
            { 
                socketInfo.joinedRoom.length > 0 ? (

                
                        getMsg.map((msgObj, index) => {
                            return(

                                <Msg key={index} 
                                nickname={msgObj.nickname} 
                                message={msgObj.message} 
                                weather={msgObj.weather} 
                                gifUrl={msgObj.gifUrl}
                                avatarColor= {msgObj.avatarColor}
                                />

                            )
                        })

                ) : (
                    <h3>Du är inte ansluten till något rum, välj ett i listan till vänster eller skapa ett nytt för att börja chatta...</h3>
                )
                }
                <div ref={myRef} style={{backgroundColor:"orange"}} />
            </div>

            { socketInfo.joinedRoom.length > 0 ? (
            <>
            <div style={{display: "flex",padding:"20px"}}>
                    {buddyIsTyping.length > 0 ? buddyIsTyping.map((item, index) => {return <div key={index} style={{display:"flex"}}><BeatLoader style={{marginLeft: "10px"}}  /><div style={{marginLeft: "10px"}}>{item.nickname}</div></div> })
                    : ""
                    } 
            </div>
                { getValue === "/" ? (
                <div style={commandStyle}>
                    <h4>Tillgängliga kommandon:</h4>
                    {
                        socketInfo.commandList.map((command, index) => {

                            return (
                                <div key={index} style={{padding: "5px"}}>
                                        {command.command} - {command.desc}
                                </div>
                            )
                        })
                    }
                </div>
                ) : undefined
                }
            <div style={{ maxHeight: "50%", display: "flex", justifyContent: "space-between", padding: "10px", margin:"0 15px 0px 15px", backgroundColor: "#474b53", borderRadius: "5px" }}>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="# Skriv någonting i chatten.."
                    maxRows={14}
                    style={{ hight: "100%", width: "80%", resize: 'none', overflow: "hidden", background: "transparent", outlineWidth: "0px", marginLeft: "5px", color: "white", border: "none", fontSize: "16px" }}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => { setValue(event.target.value) }}
                    value={getValue}
                />
                <button onClick={handleSubmit} style={{textDecoration: "none", color: "white", backgroundColor: "#474b53", border: 0, cursor:"pointer"}}>SEND</button>
            </div>
            </>
            ): undefined}
        </div>
    )
}


const commandStyle = {
    margin: "0 15px",
    marginBottom: "5px",
    padding: "10px",
    backgroundColor: "#474b53",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "5px"
}



export default Chat