import React, { useState } from 'react';
import axios from 'axios';

function BracketComponent() {
  const [inputString, setInputString] = useState('');
  const [isValid, setIsValid] = useState(null);

  const checkBrackets = async () => {
    try {
      const response = await axios.post('http://localhost:8080/validate', { inputString });
      setIsValid(response.data.isValid);
    } catch (error) {
      console.error('Erro ao validar sequência de colchetes:', error);
      setIsValid(false);
    }
  };

  return (
    <div className="bracket-component">
      <h2>Verificar Sequência de Colchetes</h2>
      <input
        type="text"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        placeholder="Digite a sequência de colchetes"
      />
      <button onClick={checkBrackets}>Verificar</button>

      {isValid !== null && (
        <p className="validation-result">
          A sequência de colchetes é {isValid ? 'válida' : 'inválida'}.
        </p>
      )}
    </div>
  );
}

export default BracketComponent;
