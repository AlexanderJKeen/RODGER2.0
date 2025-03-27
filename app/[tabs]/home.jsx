import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons, images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import QuickAccessCard from '../../components/HomeUI/QuickAccessCard';
import NotificationItem from '../../components/HomeUI/NotificationItem';

// Import API utilities
import { fetchUserData, fetchNotifications } from '../../api/HomeService';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetches the users data
        const userData = await fetchUserData();
        setUser(userData);

        // Fetches the notifications
        const notificationsData = await fetchNotifications();
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error initializing home screen:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const refreshedNotifications = await fetchNotifications();
      setNotifications(refreshedNotifications);
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <> 
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <SafeAreaView className="bg-primary flex-1">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View className="mb-5">
            <View className="flex-row justify-between items-center">
              <View>
                <Header
                  title={`Welcome, ${user.name}`}
                />
              </View>
              <Image 
                source={images.profile} 
                className="w-10 h-10 rounded-full" 
              />
            </View>
          </View>
      
          <View className="mb-5">
            <Text className="text-lg font-bold text-white mb-2.5">Quick Access</Text>
            <View className="flex-row justify-between">
              <QuickAccessCard 
                title="Book a Desk" 
                description="Find and reserve your workspace"
                icon={icons.search}
                onPress={() => {
                  router.push('/[tabs]/book-desk')
                }}
              />
              <QuickAccessCard 
                title="Parking" 
                description="Reserve your parking spot"
                icon={icons.search}
                onPress={() => {
                  router.push('/[tabs]/parking')
                }}
              />
            </View>
          </View>
  
          <View>
            <CustomButton 
              title='Refresh' 
              handlePress={handleRefresh} 
              containerStyles="mb-2.5" 
              isLoading={isRefreshing}
            />
            <Text className="text-lg font-bold text-white mb-2.5">Notifications</Text>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <NotificationItem 
                  key={index}
                  message={notification.message}
                  timestamp={notification.timestamp}
                />
              ))
            ) : (
              <Text className="text-center text-gray-400 italic">No new notifications</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>   
  );
};

export default Home;