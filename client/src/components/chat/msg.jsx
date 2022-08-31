
const Msg = (props) => {

    return (
        <div style={{with: "100%", display:"flex", flexDirection: "column"}}>
            <p style={{fontSize:"16px", margin:"5px 0px", fontWeight:"bolder"}}>{props.nickname}</p>
            {!props.weather && !props.gifUrl ? (
                <p style={{fontSize:"14px", margin:"5px 0px 30px 0px", color:"#d9d9d9"}}>{props.message}</p>
            ): undefined}
            {props.weather ? (
                <div style={{display: "flex", alignItems:"center"}}>
                    <img style={{maxWidth: "50px", maxHeight: "50px"}} src={props.weather.symbol} />
                    <h2 style={{marginLeft: "30px"}}>{props.weather.temp} ℃</h2>
                </div>
            ): undefined}
            {props.gifUrl ? (
                <img style={{maxWidth: "300px", maxHeight: "300px"}} src={props.gifUrl} />
                ): undefined}
        </div>
    )
}

export default Msg