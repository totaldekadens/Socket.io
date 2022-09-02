import { useContext, useState } from "react"
import { socketInfoContext } from "../context/socketInfoProvider";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChooseColor = (props) => {

    // Context
    const { socketInfo, setSocketInfo, getSocket } = useContext(socketInfoContext)

    const [color, setColor] = useState('');

    const handleChange = (event) => {

        const socketInfoCopy = {...socketInfo}

        setColor(event.target.value);
        socketInfoCopy.avatarColor = event.target.value
        setSocketInfo(socketInfoCopy)

    };

    const list = ["red", "blue", "green", "purple", "yellow"]

    return (
        <Box sx={{ width: "130px", margin: "30px 0px 10px 0px"}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Välj avatar</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={color}
                    label="Välj avatar"
                    onChange={handleChange}
                >
                    {list.map((clr) => {
                        return <MenuItem key={clr} value={clr}><AccountCircleIcon style={{color: clr, fontSize:"50px"}}/></MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default ChooseColor