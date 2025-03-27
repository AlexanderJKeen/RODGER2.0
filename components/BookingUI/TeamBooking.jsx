import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

const TeamBookingConfirmation = ({ 
  teamSeats, 
  teamSize, 
  layoutName, 
  onConfirm 
}) => {
  return (
    <View style={styles.teamBookingConfirmation}>
      <Text style={styles.sectionTitle}>Team Desk Assignment</Text>
      <Text style={styles.sectionDescription}>
        {`The following desks will be assigned to your team of ${teamSize} using the ${layoutName} layout:`}
      </Text>
      
      <View style={styles.teamDesksContainer}>
        {teamSeats.map((desk, index) => (
          <View key={desk.id} style={styles.teamDeskItem}>
            <Text style={styles.teamMemberLabel}>{`Team Member ${index + 1}`}</Text>
            <Text style={styles.teamDeskLabel}>{desk.label}</Text>
          </View>
        ))}
      </View>
      
      <CustomButton 
        title="Confirm Team Booking"
        handlePress={onConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  teamBookingConfirmation: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  teamDesksContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  teamDeskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  teamMemberLabel: {
    fontSize: 14,
    color: '#666',
  },
  teamDeskLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00296b',
  },
});

export default TeamBookingConfirmation;