import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useState, useRef } from "react"
import { margin } from '@mui/system';


const Msg = (props) => {

    return (
        <div style={container} >

            <AccountCircleIcon style={{ color: props.avatarColor, fontSize: "45px" }} />

            <div style={msgContainer}>
                
                <p style={{ fontSize: "18px", fontWeight: "bolder", width: "100%" }}>{props.nickname}</p> 

                {!props.gifUrl ? (
                    <p style={{ fontSize: "14px", margin: "", color: "#d9d9d9" , fontWeight: "lighter", whiteSpace: "pre-wrap"}}>{props.message}</p>
                ) : undefined}
                {props.weather ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img style={{ maxWidth: "50px", maxHeight: "50px" }} src={props.weather.symbol} />
                        <h2 style={{ marginLeft: "30px" }}>{props.weather.temp} ℃</h2>
                    </div>
                ) : undefined}
                {props.gifUrl ? (
                    <img style={{ maxWidth: "300px", maxHeight: "300px" }} src={props.gifUrl} />
                ) : undefined}
            </div>

        </div>
    )
}

const container = {
    with: "100%", 
    display: "flex",
    borderBottom: "1px solid #3c3c3c",
    marginTop: "15px"
}

const msgContainer = {
    width: "100%",
    marginLeft: "20px",
    marginBottom:"20px",
}

export default Msg