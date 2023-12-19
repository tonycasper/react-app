const axios = require('axios');

const API_KEY = '61d4c6089a2162907c97c400bb66fe29';

export async function getWeatherData(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados climáticos:', error);
    throw new Error('Erro ao obter dados climáticos');
  }
}
