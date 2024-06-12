const {Sequelize,DataTypes}=require('sequelize')
const axios=require("axios")
// const isOnline=require('is-online')



//weather api
exports.weather=async(req,res)=>{
    const apiKey = '4a691b469d984552bb554543232912';
    try {

        if(req.session.user){
            const location =req.session.user.city;
            console.log(location)
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
            console.log("this is wether---->",weatherData)
            return res.json(weatherData);
        }else{
            // console.log(location)
            const l="india"
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${l}&aqi=no`;
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
            // console.log(weatherData);
            return res.json(weatherData);
        }
    } catch (error) {
        console.log(error)
        const l="india"
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${l}&aqi=no`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        return res.json(weatherData);
    }
}


exports.isOnline=async(req,res)=>{
    try {
        const online=await isOnline();
        if(online){
            console.log('device is online')
            return res.send("device is online")
        }else{
            console.log('Internet Not connected')
            return res.send("Internet Not Connected")
        }

        
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
