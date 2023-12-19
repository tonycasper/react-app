import React from 'react';
import WeatherComponent from './components/WeatherComponent';
import BracketComponent from './components/BracketComponent';

function App() {
  return (
    <div className="App">
      <h1>Combinação de Funcionalidades</h1>
      <div className="functionality">
        <WeatherComponent />
      </div>
      <div className="functionality">
        <BracketComponent />
      </div>
    </div>
  );
}

export default App;