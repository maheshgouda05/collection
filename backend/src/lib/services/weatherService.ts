import { apiRequest } from './apiClient.ts';
import type { WeatherInfo } from '../types.ts';

export const weatherService = {
  async getWeather(city: string = 'New York'): Promise<WeatherInfo> {
    const query = new URLSearchParams({ city });
    return apiRequest<WeatherInfo>(`/api/weather?${query.toString()}`);
  },
};
