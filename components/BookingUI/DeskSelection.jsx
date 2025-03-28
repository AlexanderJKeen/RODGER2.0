import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../CustomButton';

const DeskSelection = ({ 
  desks, 
  selectedDesk, 
  onSelectDesk, 
  onConfirm,
  title = 'Select a desk:' 
}) => {
  return (
    <View style={styles.deskSelection}>
      <Text className='text-white mb-5'>{title}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={desks}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select desk"
        value={selectedDesk}
        onChange={onSelectDesk}
      />
      
      {selectedDesk && (
        <CustomButton 
          title="Confirm Booking"
          handlePress={onConfirm}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
});

export default DeskSelection;