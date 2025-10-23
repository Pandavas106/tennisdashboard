import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTennisData = async () => {
  try {
    const [rankingsResponse, matchesResponse] = await Promise.all([
      api.get('/tennis/rankings/wta'),
      api.get('/tennis/matches/live')
    ]);

    return {
      rankings: rankingsResponse.data,
      matches: matchesResponse.data
    };
  } catch (error) {
    console.error('Error fetching tennis data:', error);
    throw error;
  }
};

export const getPlayerDetails = async (playerId: string) => {
  try {
    const response = await api.get(`/tennis/player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw error;
  }
};

export const getMatchStats = async (matchId: string) => {
  try {
    const response = await api.get(`/tennis/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match stats:', error);
    throw error;
  }
};

export const getWTARankings = async () => {
  try {
    const response = await api.get('/tennis/rankings/wta');
    return response.data;
  } catch (error) {
    console.error('Error fetching WTA rankings:', error);
    throw error;
  }
};