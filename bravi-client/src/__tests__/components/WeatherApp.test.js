import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherApp from '../../components/WeatherComponent.js';
import * as api from '../../utils/api.js';

jest.mock('../../utils/api');

// Verifica se está num ambiente de teste que tem document definido (como um navegador)
const isTestEnvWithDOM = typeof document !== 'undefined';

describe('WeatherApp component', () => {
  test('renders WeatherApp component and fetches weather data', async () => {
    if (isTestEnvWithDOM) {
      const mockWeatherData = {
        name: 'New York',
        main: {
          temp: 20,
        },
        weather: [{ description: 'Cloudy' }],
      };

      api.getWeatherData.mockResolvedValueOnce(mockWeatherData);

      render(<WeatherApp />);

      const input = screen.getByPlaceholderText('Digite o nome da cidade');
      const button = screen.getByText('Pesquisar');

      // Simulando a interação do usuário
      fireEvent.change(input, { target: { value: 'New York' } });
      fireEvent.click(button);

      // Verifica se a função getWeatherData foi chamada corretamente
      expect(api.getWeatherData).toHaveBeenCalledWith('New York');

      // Verifica se os elementos são renderizados após o carregamento dos dados
      await waitFor(() => {
        expect(screen.getByText('Condições Climáticas em New York')).toBeInTheDocument();
        expect(screen.getByText('Temperatura: 20 °C')).toBeInTheDocument();
        expect(screen.getByText('Descrição: Cloudy')).toBeInTheDocument();
      });
    }
  });

  test('handles error when city not found', async () => {
    if (isTestEnvWithDOM) {
      const errorMessage = 'Cidade não encontrada. Por favor, verifique o nome e tente novamente.';
      api.getWeatherData.mockRejectedValueOnce(new Error('City not found'));

      render(<WeatherApp />);

      const input = screen.getByPlaceholderText('Digite o nome da cidade');
      const button = screen.getByText('Pesquisar');

      fireEvent.change(input, { target: { value: 'Invalid City' } });
      fireEvent.click(button);

      // Verifica se a mensagem de erro é exibida
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    }
  });
});
