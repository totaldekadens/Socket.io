import TextareaAutosize from '@mui/base/TextareaAutosize';
import Msg from './msg';

const handleSubmit = (event) => {
    event.preventDefault();

}

const handleKeyPress = (event) => {

    if (event.key == "Enter" && event.shiftKey) {

        return console.log('SHIIIIFT')
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('enter press here! ')
    }
}

const Chat = () => {

    return (
        <div className='chat' style={{ display: "flex", flexDirection: "column", background: "#383838", height: "100vh", overflow:"hidden", padding:"20px"}}>

            <div className="chat__header">
                <div className="chat__roomName">
                    <h1 style={{color:"gray", marginBottom:"15px"}}># ROOOOOM</h1>
                </div>
            </div>

            <div className="chat__messages" style={{flexGrow: 1,flexDirection: "column", justifyContent: "flex-end", overflowY: "auto", flex: "1", padding: "20px" }}>
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
                <Msg />
             
            </div>

            <div className="chat__input" style={{ maxHeight: "50%", display: "flex", padding: "10px", margin:"0 15px 40px 15px", backgroundColor: "#474b53", borderRadius: "5px" }}>

                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="#Message someone in chat.."
                    maxRows={14}
                    style={{ hight:"100%",width: "80%", resize: 'none', overflow:"hidden", background: "transparent", outlineWidth: "0px", marginLeft:"5px",color: "white", border: "none", fontSize: "16px" }}
                    onKeyPress={handleKeyPress}
                />
                <button onSubmit={handleSubmit} style={{}}>SEND</button>
            </div>
        </div>
    )
}



export default Chat