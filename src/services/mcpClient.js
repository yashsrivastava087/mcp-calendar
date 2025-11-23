import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

// Fetch all events
export async function fetchEvents() {
  const res = await axios.get(`${API_URL}/events`);
  return res.data.events; 
}

export async function createEvent(newEvent) {
  const res = await axios.post(`${API_URL}/events/create`, newEvent);
  return res.data;   
}