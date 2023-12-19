import React, { useState } from 'react';
import { getWeatherData } from '../utils/api';
import '../style.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Cidade não encontrada. Por favor, verifique o nome e tente novamente.');
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>Condições Climáticas em {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Descrição: {weatherData.weather[0].description}</p>
          {/* Outros dados climáticos */}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
