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

            if(weatherObject.symbol === 1 || weatherObject.symbol === 2){
                weatherObject.symbol = ("./../src/assets/weatherImg/sun.png")
            } else if(weatherObject.symbol === 3 || weatherObject.symbol === 4 || weatherObject.symbol === 5 || weatherObject.symbol === 6 || weatherObject.symbol === 7) {
                weatherObject.symbol = ("./../src/assets/weatherImg/cloudy.png")
            } else if(weatherObject.symbol === 8 || weatherObject.symbol === 9 || weatherObject.symbol === 10 || weatherObject.symbol === 11 || weatherObject.symbol === 12 || weatherObject.symbol === 13 || weatherObject.symbol === 14 || weatherObject.symbol === 18 || weatherObject.symbol === 19 || weatherObject.symbol === 20 || weatherObject.symbol === 22 || weatherObject.symbol === 23 || weatherObject.symbol === 24) {
                weatherObject.symbol = ("./../src/assets/weatherImg/rain.png")
            } else if(weatherObject.symbol === 15 || weatherObject.symbol === 16 || weatherObject.symbol === 17 || weatherObject.symbol === 25 || weatherObject.symbol === 26 || weatherObject.symbol === 27){
                weatherObject.symbol = ("./../src/assets/weatherImg/snowing.png")
            } else if (weatherObject.symbol === 21) {
                weatherObject.symbol = ("./../src/assets/weatherImg/storm.png")
            }
            weatherList.push(weatherObject)
        })

        return(weatherList[0])

    } catch(err) {
        return (err.status);
    }
}
