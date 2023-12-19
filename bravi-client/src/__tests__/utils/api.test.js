import axios from 'axios';
import { getWeatherData } from '../../utils/api';

jest.mock('axios');

const API_KEY = '61d4c6089a2162907c97c400bb66fe29';

describe('getWeatherData function', () => {
  test('fetches weather data for a city', async () => {
    const local = 'New York';
    const mockData = {
      name: local,
      main: {
        temp: 20,
      },
      weather: [{ description: 'Cloudy' }],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const weatherData = await getWeatherData(local);

    expect(weatherData.name).toBe(local);
    expect(weatherData.main.temp).toBe(20);
    expect(weatherData.weather[0].description).toBe('Cloudy');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${API_KEY}&units=metric&lang=pt`
    );
  });

  test('throws an error when fetching weather data fails', async () => {
    const city = 'InvalidCity';

    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    try {
      await getWeatherData(city);
    } catch (error) {
      expect(error.message).toBe('Erro ao obter dados climáticos');
    }
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
    );
  });
});
