import makeRequest from "../request.js";



export const getWeather = async(coordinates) => {

    try {
        
        let response = await makeRequest(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.long}/lat/${coordinates.lat}/data.json`);
        
        let weatherList = [];

        response.timeSeries.map((timeStamp) => {

            let weatherObject = {}

            let time = new Date(timeStamp.validTime)

            let hour = time.getHours()
            weatherObject.hour = hour

            timeStamp.parameters.map((parameter) => {

                if(parameter.name == "t") {
                    weatherObject.temp = parameter.values[0];
                } else if(parameter.name = "Wsymb2") {
                    weatherObject.symbol = parameter.values[0];
                }
            })

            weatherList.push(weatherObject)
        })

        return(weatherList[0])

    } catch(err) {
        return (err.status);
    }
}
