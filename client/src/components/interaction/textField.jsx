import TextField from '@mui/material/TextField';

const TextInput = (props) => {

    return (
        <TextField
            sx={{
                padding: "10px 0px 10px 0px",
                marginTop: "20px"
            }}
            id="outlined-basic"
            label={props.label}
            variant="outlined"
            type="text"
            value={props.state}
            onChange={(event) => { props.setState(event.target.value) }}
        />
    )
}

export default TextInput