// services/parkingService.js

import { API_BASE_URL } from '../api/Config';

/**
 * Get user data by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User data object
 */
export const fetchUserData = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`User API error: ${response.status}`);
  }
  return await response.json();
};

/**
 * Get available parking spaces for a specific date and type
 * @param {Date} date - Date to check for availability
 * @param {string} type - Space type (standard, disabled, electric, or all)
 * @returns {Promise<Array>} List of available parking spaces
 */
export const getAvailableSpaces = async (date, type) => {
  // Format the date as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];
  
  // Use a GET request with query parameters
  const response = await fetch(
    `${API_BASE_URL}/api/parking/availability?date=${formattedDate}${type !== 'all' ? `&type=${type}` : ''}`,
    { method: 'GET' }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch parking spaces: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Book a parking space
 * @param {Object}
 * @returns {Promise<Object>}
 */
export const bookParkingSpace = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/api/parking/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to book parking space');
  }

  return await response.json();
};

export default {
  fetchUserData,
  getAvailableSpaces,
  bookParkingSpace
};