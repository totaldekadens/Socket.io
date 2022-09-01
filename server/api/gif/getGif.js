import makeRequest from "../request.js";
import { gifApiKey } from "../apiKeys.js";



export const getGif = async (gifName) => {

    try {
        
        let response = await makeRequest(`https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${gifName}&limit=1&offset=0&rating=pg-13&lang=en`)
        
        if(!response.data.length) {
            return false
        }

        return response.data[0].images.original.url

    } catch(err) {
        return (err.status);
    }
    
}