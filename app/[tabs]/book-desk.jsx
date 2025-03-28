import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import  BookingOptions from '../../components/BookingUI/BookingOptions';
import  DeskSelection from '../../components/BookingUI/DeskSelection';
import  LayoutSelection from '../../components/BookingUI/LayoutSelection';
import  TeamBookingConfirmation from '../../components/BookingUI/TeamBooking';
import {
  fetchUser,
  fetchLayouts,
  getAvailabilityForDate,
  fetchTeamLayoutSuggestions,
  bookIndividualDesk,
  bookTeamDesks
} from '../../api/bookingService';

import Header from '../../components/Header';
import DateSelector from '../../components/DateSelector';
import LoadingScreen from '../../components/LoadingScreen';


const BookDesk = () => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingMode, setBookingMode] = useState(null);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teamSeats, setTeamSeats] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [step, setStep] = useState(1);
  const [desks, setDesks] = useState([]);
  const [layouts, setLayouts] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // user data
        const userData = await fetchUser(22);
        setUser(userData);
        
        setDesks([]);
        
        // Desk availability for today
        const desksData = await getAvailabilityForDate(new Date());
        setDesks(desksData);
        
        // Layouts
        const layoutsData = await fetchLayouts();
        setLayouts(layoutsData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Handlers
  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    try {
      const desksData = await getAvailabilityForDate(newDate);
      setDesks(desksData);
    } catch (error) {
      console.error('Error fetching desk availability:', error);
    }
  };

  const handleBookingModeSelect = (mode) => {
    setBookingMode(mode);
    setStep(2);
  };

  const handleLayoutSelect = async (layout) => {
    try {
      setSelectedLayout(layout);
      
      const suggestedDesks = await fetchTeamLayoutSuggestions(
        user.teamId, 
        selectedDate, 
        layout.name
      );
      
      setTeamSeats(suggestedDesks);
      setStep(3);
    } catch (error) {
      Alert.alert('Error', 'Failed to get layout suggestions');
    }
  };

  const confirmBooking = async () => {
    try {
      
      if (bookingMode === 'individual') {
        await bookIndividualDesk(
          selectedDesk.id,
          user.id,
          selectedDate,
          selectedDesk.label
        );
      }  
      
      if (bookingMode === 'team') {
        await bookTeamDesks(
          user.teamId,
          user.id,
          teamSeats.map(desk => desk.id),
          selectedDate,
          selectedLayout.name,
          teamSeats.map(desk => desk.label)
        );
      }
  
      Alert.alert('Success', 'Booking confirmed!');
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Booking failed. Please try again.');
    }
  };

  const resetForm = () => {
    setStep(1);
    setBookingMode(null);
    setSelectedDesk(null);
    setSelectedLayout(null);
    setTeamSeats([]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack.Screen name="book-desk" options={{ title: "Book Desk" }} />
      <SafeAreaView className="bg-primary flex-1">
        <ScrollView className="p-6">
          <Header title="Book a Desk" />
          
          <DateSelector 
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          
          {step === 1 && user.role === 'team_leader' && (
            <BookingOptions 
              onSelect={handleBookingModeSelect} 
              teamSize={user.teamSize}
            />
          )}

          {step === 1 && user.role !== 'team_leader' && (
            <DeskSelection
              desks={desks}
              selectedDesk={selectedDesk}
              onSelectDesk={setSelectedDesk}
              onConfirm={confirmBooking}
            />
          )}

          {step === 2 && bookingMode === 'individual' && (
            <DeskSelection
              desks={desks}
              selectedDesk={selectedDesk}
              onSelectDesk={setSelectedDesk}
              onConfirm={confirmBooking}
            />
          )}

          {step === 2 && bookingMode === 'team' && (
            <LayoutSelection
              layouts={layouts}
              selectedLayout={selectedLayout}
              onSelectLayout={handleLayoutSelect}
            />
          )}

          {step === 3 && bookingMode === 'team' && (
            <TeamBookingConfirmation
              teamSeats={teamSeats}
              teamSize={user.teamSize}
              layoutName={selectedLayout.name}
              onConfirm={confirmBooking}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BookDesk;