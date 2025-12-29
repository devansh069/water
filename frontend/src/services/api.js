import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Assuming the backend runs on port 5000
});

export const getAreas = async () => {
  try {
    const response = await api.get('/areas');
    return response.data;
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
};

export const getWaterQualityData = async (area) => {
  try {
    const response = await api.get(`/water-quality/${area}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching water quality data for ${area}:`, error);
    return null;
  }
};

export const getWeeklyWaterQualityData = async (area) => {
  try {
    const response = await api.get(`/water-quality/${area}/weekly`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weekly water quality data for ${area}:`, error);
    return null;
  }
};

export const getMonthlyWaterQualityData = async (area) => {
  try {
    const response = await api.get(`/water-quality/${area}/monthly`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monthly water quality data for ${area}:`, error);
    return null;
  }
};

export const getAIAssessment = async (area) => {
  try {
    const response = await api.get(`/ai-assessment/${area}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AI assessment:', error);
    return null;
  }
};

export const getAlerts = async () => {
  try {
    const response = await api.get('/alerts');
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};