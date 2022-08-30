import express from "express";
import makeRequest from "../request.js";
import { gifApiKey } from "../apiKeys.js";


export const router = express.Router();


router.get("/:gif", async (req, res) => {

    try {

        let response = await makeRequest(`https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${req.params.gif}&limit=5&offset=0&rating=pg-13&lang=en`)

        res.json(response)

    } catch(err) {
        res.status(err.status).json(err.message);
    }

})