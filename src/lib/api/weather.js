const { API_CONFIG } = require("./api-config");

class WeatherAPI {
  createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  async fetchWeatherData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getCurrentWeather({ lat, lon }) {
    const url = this.createUrl(
      `${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    }
    );

    return this.fetchWeatherData(url);
  }

  async getWeatherForecast({ lat, lon }) {
    const url = this.createUrl(
      `${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    }
    );
    return this.fetchWeatherData(url);
  }

  async reverseGeocode({ lat, lon }) {
    const url = this.createUrl(
      `${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1
    }
    );
    return this.fetchWeatherData(url);
  }

  async searcheLocations(query) {
    const url = this.createUrl(
      `${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5
    }
    );
    return this.fetchWeatherData(url);
  }
}


export const weatherAPI = new WeatherAPI();