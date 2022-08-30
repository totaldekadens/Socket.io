import { useState } from "react"

const CreateRoom = () => {

    const [isCreateRoom, setIsCreateRoom] = useState(false)

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div onClick={() => setIsCreateRoom(!isCreateRoom)}>Skapa rum +</div> {/* ikon sedan */}
            
            { isCreateRoom ? 
            <>
            <input type="text" />
            <button>Skapa rum</button>
            </>  : ""} 
        </div>
    )
}

export default CreateRoom