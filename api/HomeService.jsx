import { API_BASE_URL } from '../api/Config';

export const fetchUserData = async (userId = 22) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`User API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    // Return default user data in case of error
    return {
      id: userId,
      name: 'User Data Unavailable',
      role: 'employee',
      team: null,
      teamSize: 0,
      teamId: null
    };
  }
};

export const fetchNotifications = async (userId = 22) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${userId}`);
    
    if (response.ok) {
      return await response.json();
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export default {
  fetchNotifications,
  fetchUserData
};