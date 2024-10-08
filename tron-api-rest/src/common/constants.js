require('dotenv').config() // importar dotenv para obtener las variables de entorno

module.exports = {
    ENDPOINT: process.env.ENDPOINT,  
    GAS_STATION_ADDRESS: process.env.GAS_STATION_ADDRESS,  
    GAS_STATION_SECRET: process.env.GAS_STATION_SECRET,
    API_KEY: process.env.API_KEY,
}