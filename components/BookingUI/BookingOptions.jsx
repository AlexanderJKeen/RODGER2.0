import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons } from '../../constants';

const BookingOptions = ({ onSelect, teamSize = 0 }) => {
  return (
    <View style={styles.bookingOptions}>
      <Text style={styles.sectionTitle}>How would you like to book?</Text>
      
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => onSelect('individual')}
      >
        <Image source={icons.profile} style={styles.optionIcon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Book for yourself</Text>
          <Text style={styles.optionDescription}>Select a single desk for your use</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => onSelect('team')}
      >
        <Image source={icons.team} style={styles.optionIcon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionDescription}>{`Book desks for your team`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingOptions: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    tintColor: '#00296b',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00296b',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});

export default BookingOptions;