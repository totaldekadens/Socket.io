import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from "@mui/material"


const Modal = (props) => {

	// Theme mediaquery
	const theme = useTheme();
	const isSmMatch = useMediaQuery(theme.breakpoints.down("sm")); // 600px 

	return props.shouldShow ? (
		<div style={ModalBackground}>
			<div style={{...ModalBody, width: isSmMatch ? "80%" : "50%"}} onClick={e => e.stopPropagation()}>
                {props.isGetStarted ? "" : 
					<Button 
						style={{ backgroundColor: "rgb(255,51,51,0.7)", marginBottom: "30px"}}
						variant="contained"
						onClick={() => {props.onRequestClose(false)}}
					>
						Avbryt
					</Button>
				}
                {props.children}
			</div>
		</div>
	) 
	: 
		null;
}

const ModalBackground = {
	position: "fixed",
	zIndex: 1,
	left: 0,
	top: 0,
	width: "100%",
	height: "100%",
	overflow: "auto",
	backgroundColor: "rgba(0, 0, 0, 0.5)"
}

const ModalBody = {
	backgroundColor: "white",
	margin: "10% auto",
	padding: "20px",
	maxWidth: "475px",
    borderRadius: "10px",
    boxShadow: "0px 0px 30px black"
}

export default Modal