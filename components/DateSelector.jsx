import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '../constants';
import { formatShortDate } from '../utils/dateUtils';

const DateSelector = ({ selectedDate, onDateChange, title = 'Select Date:' }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, newDate) => {
    if (newDate) {
      onDateChange(newDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.dateSelector}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Image source={icons.calendar} style={styles.dateIcon} />
        <Text style={styles.dateText}>
          {formatShortDate(selectedDate)}
        </Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateSelector: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DateSelector;