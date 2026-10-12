import { WardrobeItem } from '../types';
import { apiFetch } from './apiClient';

export interface WeatherCondition {
  city: string;
  temp: number; // in Celsius
  tempFormatted: string;
  condition: string;
  humidity: string;
  windSpeed: string;
  iconName: 'sun' | 'cloud-sun' | 'rain' | 'wind';
  advice: string;
}

function mapIconName(condition: string): WeatherCondition['iconName'] {
  const c = (condition || '').toLowerCase();
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower') || c.includes('storm')) return 'rain';
  if (c.includes('wind') || c.includes('breez') || c.includes('gale')) return 'wind';
  if (c.includes('cloud') || c.includes('overcast') || c.includes('fog')) return 'cloud-sun';
  return 'sun';
}

const FORECASTS: Record<string, WeatherCondition> = {
  paris: {
    city: 'Paris',
    temp: 16,
    tempFormatted: '16°C (61°F)',
    condition: 'Partly Cloudy & Breezy',
    humidity: '58%',
    windSpeed: '14 km/h',
    iconName: 'cloud-sun',
    advice: 'Layer a light cotton trench coat or merino wool knit over a collared shirt.',
  },
  london: {
    city: 'London',
    temp: 12,
    tempFormatted: '12°C (54°F)',
    condition: 'Light Drizzle & Overcast',
    humidity: '84%',
    windSpeed: '18 km/h',
    iconName: 'rain',
    advice: 'Water-resistant outerwear and leather ankle boots recommended.',
  },
  newyork: {
    city: 'New York',
    temp: 19,
    tempFormatted: '19°C (66°F)',
    condition: 'Crisp Sunshine',
    humidity: '45%',
    windSpeed: '10 km/h',
    iconName: 'sun',
    advice: 'Comfortable day for breathable poplin shirts, jeans, or relaxed tailoring.',
  },
  milan: {
    city: 'Milan',
    temp: 21,
    tempFormatted: '21°C (70°F)',
    condition: 'Warm Golden Sunlight',
    humidity: '48%',
    windSpeed: '8 km/h',
    iconName: 'sun',
    advice: 'Perfect for linen, light dresses, or effortless lightweight trousers.',
  },
  tokyo: {
    city: 'Tokyo',
    temp: 17,
    tempFormatted: '17°C (63°F)',
    condition: 'Clear Autumn Sky',
    humidity: '52%',
    windSpeed: '12 km/h',
    iconName: 'wind',
    advice: 'A lightweight unstructured blazer or soft knit pullover is ideal.',
  },
};

/**
 * weatherService provides local atmospheric data and temperature-matched clothing advice,
 * connected directly to the backend /api/weather endpoint powered by live Open-Meteo data.
 */
export const weatherService = {
  /**
   * Retrieves live weather forecast for given city from backend /api/weather.
   */
  getForecast: async (city: string = 'Paris'): Promise<WeatherCondition> => {
    try {
      const res = await apiFetch<{
        city: string;
        tempC: number;
        condition: string;
        humidity: number;
        windKph: number;
        advice: string;
      }>(`/api/weather?city=${encodeURIComponent(city.trim())}`);

      if (res.ok && res.data) {
        const d = res.data;
        const tempF = Math.round((d.tempC * 9) / 5 + 32);
        return {
          city: d.city || city,
          temp: d.tempC,
          tempFormatted: `${d.tempC}°C (${tempF}°F)`,
          condition: d.condition || 'Clear',
          humidity: `${d.humidity}%`,
          windSpeed: `${d.windKph} km/h`,
          iconName: mapIconName(d.condition),
          advice: d.advice || 'Pleasant weather for your favorite wardrobe layers.',
        };
      }
    } catch (e) {
      console.warn(`Backend /api/weather call failed for ${city}, using local fallback:`, e);
    }

    const key = city.toLowerCase().replace(/[^a-z]/g, '');
    return FORECASTS[key] || FORECASTS.paris;
  },

  /**
   * Generates weather-appropriate outfit suggestions from the collection.
   */
  getDailyFitRecommendation: (
    temp: number,
    items: WardrobeItem[]
  ): { top?: WardrobeItem; bottom?: WardrobeItem; outer?: WardrobeItem; footwear?: WardrobeItem; advice: string } => {
    if (!items.length) {
      return { advice: 'No items in collection to recommend from.' };
    }

    const isCold = temp < 15;
    const isWarm = temp >= 22;

    const tops = items.filter((i) => i.category.toLowerCase().includes('top'));
    const bottoms = items.filter((i) => i.category.toLowerCase().includes('bottom'));
    const outerwear = items.filter((i) => i.category.toLowerCase().includes('outer'));
    const footwear = items.filter((i) => i.category.toLowerCase().includes('footwear'));

    const selectedTop = isCold
      ? tops.find((t) => t.fabric.toLowerCase().includes('wool') || t.fabric.toLowerCase().includes('knit')) || tops[0]
      : tops[0];

    const selectedOuter = isCold ? outerwear[0] : isWarm ? undefined : outerwear[0];

    return {
      top: selectedTop,
      bottom: bottoms[0],
      outer: selectedOuter,
      footwear: footwear[0],
      advice: isCold
        ? 'Cold weather detected: Prioritize natural wool insulating layers and closed leather footwear.'
        : isWarm
        ? 'Warm temperatures: Opt for breathable cotton or linen fabrics with minimalist layering.'
        : 'Temperate weather: Perfect conditions for smart-casual two-piece layering with a light jacket.',
    };
  },
};
