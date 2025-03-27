import { API_BASE_URL } from '../api/Config';

export const fetchUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`User API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    // Return basic user info to prevent app crash
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

export const fetchLayouts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/layouts`);
    if (response.ok) {
      return await response.json();
    } else {
      console.warn('Failed to fetch layouts, using defaults');
      return [
        { id: 1, name: 'Linear', iconName: 'linear', description: 'Team sits in a row' },
        { id: 2, name: 'Quadrant', iconName: 'quad', description: 'Team sits in a square formation' }
      ];
    }
  } catch (error) {
    console.error('Error fetching layouts:', error);
    return [
      { id: 1, name: 'Linear', iconName: 'linear', description: 'Team sits in a row' },
      { id: 2, name: 'Quadrant', iconName: 'quad', description: 'Team sits in a square formation' }
    ];
  }
};

export const getAvailabilityForDate = async (date) => {
  try {
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/api/desks/availability?date=${formattedDate}`, 
      { method: 'GET' }
    );
    
    if (response.ok) {
      return await response.json();
    } else {
      console.warn('Failed to fetch desks, using empty array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching desk availability:', error);
    return [];
  }
};

export const fetchTeamLayoutSuggestions = async (teamId, date, layoutType) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/teams/${teamId}/layout-suggestions?date=${date.toISOString()}&layoutType=${layoutType.toLowerCase()}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch layout suggestions');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching layout suggestions:', error);
    throw error;
  }
};

export const bookIndividualDesk = async (deskId, userId, date, deskNumber) => {
  try {
  
    const response = await fetch(`${API_BASE_URL}/api/bookings/desk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deskId,
        userId,
        bookingDate: date.toISOString().split('T')[0],
        bookedById: userId,
        deskNumber
      })
    });
    
    if (!response.ok) throw new Error('Failed to book desk');
    return await response.json();
  } catch (error) {
    console.error('Error booking desk:', error);
    throw error;
  }
};

export const bookTeamDesks = async (teamId, userId, deskIds, date, layoutType, deskNumbers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        deskIds,
        bookingDate: date.toISOString().split('T')[0],
        bookedById: userId,
        layoutType,
        deskNumbers
      })
    });
    
    if (!response.ok) throw new Error('Failed to book team desks');
    return await response.json();
  } catch (error) {
    console.error('Error booking team desks:', error);
    throw error;
  }
};

export default {
  bookTeamDesks,
  bookIndividualDesk,
  fetchTeamLayoutSuggestions,
  getAvailabilityForDate,
  fetchLayouts,
  fetchUser
};