import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { Stack } from 'expo-router';

// Import custom components
import Header from '../../components/Header';
import DateSelector from '../../components/DateSelector';
import LoadingScreen from '../../components/LoadingScreen';
import CustomButton from '../../components/CustomButton';

// Import API service
import parkingService from '../../api/parkingService';

const Parking = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [spaceTypes, setSpaceTypes] = useState(['standard', 'disabled', 'electric']);
  const [selectedType, setSelectedType] = useState('standard');

  // Initialize default times
  useEffect(() => {
    const defaultStart = new Date();
    defaultStart.setHours(9, 0, 0, 0);
    setStartTime(defaultStart);

    const defaultEnd = new Date();
    defaultEnd.setHours(17, 0, 0, 0);
    setEndTime(defaultEnd);
  }, []);

  // Fetch initial data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch user data. default user specified for MVP purposes
        const userData = await parkingService.fetchUserData(22);
        setUser(userData);
        
        // Fetch available spaces for todays date
        await fetchAvailableSpaces(new Date());
      } catch (error) {
        console.error('Error initializing data:', error);
        // Set default user so app loads
        setUser({
          id: 22,
          name: 'User Data Unavailable',
          role: 'employee'
        });
        setAvailableSpaces([]);
      } finally {
        // Always set loading to false, even on error
        setLoading(false);
      }
    };
  
    initializeData();
  }, []);

  const fetchAvailableSpaces = async (date) => {
    try {
      const spaces = await parkingService.getAvailableSpaces(date, selectedType);
      setAvailableSpaces(spaces);
    } catch (error) {
      console.error('Error fetching parking spaces:', error);
      setAvailableSpaces([]);
    }
  };

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    await fetchAvailableSpaces(newDate);
  };

  const handleTypeChange = async (type) => {
    setSelectedType(type);
    await fetchAvailableSpaces(selectedDate);
  };

  const confirmBooking = async () => {
    try {
      if (!selectedSpace) {
        alert('Please select a parking space');
        return;
      }

      const bookingData = {
        spaceId: selectedSpace.id,
        userId: user.id,
        bookingDate: selectedDate.toISOString().split('T')[0],
        startTime: startTime.toTimeString().split(' ')[0],
        endTime: endTime.toTimeString().split(' ')[0],
        spaceNumber: selectedSpace.label
      };

      await parkingService.bookParkingSpace(bookingData);
      alert('Parking space booked successfully!');
      resetForm();
    } catch (error) {
      console.error('Booking failed:', error);
      alert(`Booking failed: ${error.message}`);
    }
  };

  const resetForm = () => {
    setSelectedSpace(null);
    // Space refresh
    fetchAvailableSpaces(selectedDate);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
  <>
    <Stack.Screen name="parking" options={{ title: "Parking" }} />
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Book a Parking Space" />
        
        <DateSelector 
          selectedDate={selectedDate} 
          onDateChange={handleDateChange} 
        />

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Space Type:</Text>
          <View style={styles.typeFilterContainer}>
            {spaceTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeFilter,
                  selectedType === type && styles.selectedTypeFilter
                ]}
                onPress={() => handleTypeChange(type)}
              >
                <Text 
                  style={[
                    styles.typeFilterText,
                    selectedType === type && styles.selectedTypeFilterText
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.spaceSelection}>
          <Text style={styles.sectionTitle}>Select a parking space:</Text>
          {availableSpaces.length > 0 ? (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={availableSpaces}
              maxHeight={300}
              labelField="label"
              valueField="id"
              placeholder="Select parking space"
              value={selectedSpace?.id}
              onChange={item => {
                setSelectedSpace(item);
              }}
            />
          ) : (
            <Text style={styles.noSpacesText}>No parking spaces available for the selected criteria</Text>
          )}

          {selectedSpace && (
            <View style={styles.spaceDetails}>
              <Text style={styles.spaceDetailTitle}>Space Details:</Text>
              <View style={styles.spaceDetailRow}>
                <Text style={styles.spaceDetailLabel}>Number:</Text>
                <Text style={styles.spaceDetailValue}>{selectedSpace.label}</Text>
              </View>
              <View style={styles.spaceDetailRow}>
                <Text style={styles.spaceDetailLabel}>Location:</Text>
                <Text style={styles.spaceDetailValue}>{selectedSpace.location}</Text>
              </View>
              <View style={styles.spaceDetailRow}>
                <Text style={styles.spaceDetailLabel}>Type:</Text>
                <Text style={styles.spaceDetailValue}>
                  {selectedSpace.type.charAt(0).toUpperCase() + selectedSpace.type.slice(1)}
                </Text>
              </View>
            </View>
          )}

          {selectedSpace && (
            <CustomButton 
              title="Confirm Booking"
              handlePress={confirmBooking}
              containerStyles="mt-4"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  typeFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeFilter: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTypeFilter: {
    backgroundColor: '#00296b',
    borderColor: '#00296b',
  },
  typeFilterText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTypeFilterText: {
    color: '#fff',
  },
  spaceSelection: {
    marginTop: 10,
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
  noSpacesText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 20,
  },
  spaceDetails: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  spaceDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  spaceDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  spaceDetailLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
  },
  spaceDetailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
export default Parking;