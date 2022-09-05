import { useContext, useEffect, useState, useRef } from "react"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Msg from './msg';
import { socketInfoContext } from "../context/socketInfoProvider";
import BeatLoader from 'react-spinners/BeatLoader';


const Chat = () => {
    
    // Context
    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)
    const [ getValue, setValue] = useState("")
    const msgRef = useRef()
    const [ getMsg, setMsg ] = useState([])
    msgRef.current = getMsg;
    const [isTyping, setTyping] = useState(false)
    const [buddyIsTyping, setBuddyIsTyping] = useState({nickname: "", isTyping: false})
    
    const myRef = useRef(500);


    // Gets socket
    let socket = getSocket()

    const handleSubmit = () => {
        
        if(getValue != "" || getValue != " ") {
            socket.emit("msg", { msg: getValue, joinedRoom: socketInfo.joinedRoom, avatarColor: socketInfo.avatarColor })
            setValue("")
            
        }
    }
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
           // executeScroll()
        })
        
        return () => {
            socket.off('msg');
        };
    }, [])

    // Receives and sends status if someone is typing 
    useEffect(() => {

        if(getValue.length > 0) {
            setTyping(true)
        } else {
            setTyping(false)
        }

        socket.emit("isTyping", { joinedRoom: socketInfo.joinedRoom, isTyping })

        socket.on("isTyping", (msgObj) => {
            setBuddyIsTyping({
                nickname: msgObj.nickname,
                isTyping: msgObj.isTyping
            })
        })
        
        return () => {
            socket.off('isTyping');
        };


    }, [getValue, isTyping])

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
        <div className='chat' style={{ display: "flex", flexDirection: "column", background: "#383838", height: "100vh", overflow:"hidden", padding:"20px"}}>

            <div className="chat__header">
                <div className="chat__roomName">
                    <h1 style={{color:"gray", marginBottom:"15px"}}># {socketInfo.joinedRoom}</h1>
                </div>
            </div>

            
            <div className="chat__messages" style={{flexGrow: 1,flexDirection: "column", justifyContent: "flex-end", overflowY: "auto", flex: "1", padding: "20px" }}>
                {
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
                   
                }
               
               <div ref={myRef} className="helloooo_____hej" style={{backgroundColor:"orange"}} />
            </div>
           
            <div style={{display: "flex",padding:"20px"}}>
                    {buddyIsTyping.isTyping ? <><BeatLoader /><div style={{marginLeft: "10px"}}>{buddyIsTyping.nickname}</div></> : ""}
                </div> 
            <div className="chat__input" style={{ maxHeight: "50%", display: "flex", padding: "10px", margin:"0 15px 40px 15px", backgroundColor: "#474b53", borderRadius: "5px" }}>
                
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="#Message someone in chat.."
                    maxRows={14}
                    style={{ hight:"100%",width: "80%", resize: 'none', overflow:"hidden", background: "transparent", outlineWidth: "0px", marginLeft:"5px",color: "white", border: "none", fontSize: "16px" }}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => {setValue(event.target.value)}}
                    value={getValue}
                />
                <button onClick={handleSubmit} style={{}}>SEND</button>
            </div>
        </div>
    )
}



export default Chat