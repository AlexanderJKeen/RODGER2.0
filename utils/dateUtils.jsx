export const formatShortDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };
  
  /**
   * Format date to long display format (e.g. "Monday, 10 March 2025")
   */
  export const formatLongDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };