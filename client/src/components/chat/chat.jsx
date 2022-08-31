import { useContext, useEffect, useState, useRef } from "react"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Msg from './msg';
import { socketInfoContext } from "../context/socketInfoProvider";


const Chat = () => {
    
    // Context
    const { socket, socketInfo, setSocketInfo } = useContext(socketInfoContext)
    const [ getValue, setValue] = useState("")
    const msgRef = useRef()
    const [ getMsg, setMsg ] = useState([])
    msgRef.current = getMsg;

    const handleSubmit = () => {
        if(getValue != "" || getValue != " ") {
            socket.emit("msg", { msg: getValue, joinedRoom: socketInfo.joinedRoom })
            setValue("")
        }
    }

    useEffect(() => {

        socket.on("msg", (msgObj) => {
            const newMsgList = [...msgRef.current];
            newMsgList.push({
                nickname: msgObj.nickname,
                message: msgObj.msg
            })
            setMsg(newMsgList)
        })

    }, [])

    const handleKeyPress = (event) => {
        if (event.key == "Enter" && event.shiftKey) {
            return
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit()
        }
    }
    console.log(getMsg)
    return (
        <div className='chat' style={{ display: "flex", flexDirection: "column", background: "#383838", height: "100vh", overflow:"hidden", padding:"20px"}}>

            <div className="chat__header">
                <div className="chat__roomName">
                    <h1 style={{color:"gray", marginBottom:"15px"}}># ROOOOOM</h1>
                </div>
            </div>

            <div className="chat__messages" style={{flexGrow: 1,flexDirection: "column", justifyContent: "flex-end", overflowY: "auto", flex: "1", padding: "20px" }}>
                {
                    getMsg.map((msgObj, index) => {
                        return(
                            <Msg key={index} nickname={msgObj.nickname} message={msgObj.message} weather={msgObj.weather}/>
                        )
                    })
                }
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