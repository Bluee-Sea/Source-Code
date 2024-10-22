// src/api.js

import axios from 'axios';

// Set up the axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle user signup API call
export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Function to handle login API call
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
