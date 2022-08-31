import { geoNamesUserName } from "../apiKeys.js"
import makeRequest from "../request.js";




export const getCity = async (city) => {

    try {

        let response = await makeRequest(`http://api.geonames.org/searchJSON?username=${geoNamesUserName}&featureClass=P&country=SE&maxRows=1&name_startsWith=${city}`)

        let coordinates = {
            cityName: response.geonames[0].name,
            long: response.geonames[0].lng,
            lat: response.geonames[0].lat,
        };

        return coordinates;

    } catch(err) {
        return (err.status);
    }
}

