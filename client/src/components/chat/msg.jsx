
const Msg = (props) => {

    return (
        <div style={{with: "100%", display:"flex", flexDirection: "column"}}>
            <p style={{fontSize:"16px", margin:"5px 0px", fontWeight:"bolder"}}>{props.nickname}</p>
            <p style={{fontSize:"14px", margin:"5px 0px 30px 0px", color:"#d9d9d9"}}>{props.message}</p>
        </div>
    )
}

export default Msg