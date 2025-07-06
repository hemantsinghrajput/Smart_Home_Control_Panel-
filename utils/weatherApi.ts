export interface WeatherData {
  temp: number | string;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

const API_KEY = '5633f885abd945378ef132621250507'; 
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export const POPULAR_CITIES = [
  'Delhi',
  'Mumbai', 
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Sydney',
  'Toronto'
];

function getMockWeather(unit: string, city: string = 'Delhi'): WeatherData {
  const cityHash = city.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  let temp;
  if (city.toLowerCase().includes('delhi') || city.toLowerCase().includes('mumbai') || 
      city.toLowerCase().includes('bangalore') || city.toLowerCase().includes('chennai') ||
      city.toLowerCase().includes('kolkata') || city.toLowerCase().includes('hyderabad') ||
      city.toLowerCase().includes('pune') || city.toLowerCase().includes('ahmedabad')) {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 20) + 25
      : Math.abs(cityHash % 36) + 77;
  } else if (city.toLowerCase().includes('london') || city.toLowerCase().includes('paris')) {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 15) + 10
      : Math.abs(cityHash % 27) + 50;
  } else if (city.toLowerCase().includes('new york') || city.toLowerCase().includes('toronto')) {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 25) + 5
      : Math.abs(cityHash % 45) + 41;
  } else if (city.toLowerCase().includes('tokyo')) {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 20) + 15
      : Math.abs(cityHash % 36) + 59;
  } else if (city.toLowerCase().includes('sydney')) {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 20) + 20
      : Math.abs(cityHash % 36) + 68;
  } else {
    temp = unit === 'metric' 
      ? Math.abs(cityHash % 30) + 15
      : Math.abs(cityHash % 50) + 60;
  }
  
  const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Clear', 'Misty', 'Foggy', 'Overcast'];
  const descriptions = ['clear sky', 'scattered clouds', 'broken clouds', 'few clouds', 'mist', 'fog', 'overcast'];
  const conditionIndex = Math.abs(cityHash % conditions.length);
  const condition = conditions[conditionIndex];
  const description = descriptions[conditionIndex];
  
  const humidity = Math.abs(cityHash % 40) + 30;
  const windSpeed = Math.abs(cityHash % 15) + 3;
  
  return { 
    temp, 
    condition, 
    description,
    humidity,
    windSpeed,
    city
  };
}

export async function getWeather(city: string = 'Delhi', unit: string = 'metric'): Promise<WeatherData> {
  return getMockWeather(unit, city);
} 