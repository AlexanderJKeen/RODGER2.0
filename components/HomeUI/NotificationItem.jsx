import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationItem = ({ message, timestamp }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    
    const suffix = 
      day === 1 || day === 21 || day === 31 ? 'st' :
      day === 2 || day === 22 ? 'nd' :
      day === 3 || day === 23 ? 'rd' : 'th';
    
    return `${dayOfWeek} ${day}${suffix} ${month}`;
  };

  return (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>
        {`${message}  ${formatDate(new Date(timestamp))}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default NotificationItem;