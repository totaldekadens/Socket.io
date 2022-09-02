import Button from '@mui/material/Button';
import TextInput from './textField';
import ChooseColor from "./chooseColor";

const SingleInput = (props) => {

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px" }}>
            <h2 style={{color: "rgb(62,62,62)"}}>{props.title}</h2>
            { props.isGetStarted ? <ChooseColor/> : ""} 
            <TextInput setState={props.setState} state={props.state} label={props.label} />
            <Button style={{ padding: "10px" }} onClick={props.handleClick} variant="contained">{props.btnLabel}</Button>
        </div>
    )
}

export default SingleInput
