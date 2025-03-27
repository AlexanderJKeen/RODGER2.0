import { View, Text, Image } from 'react-native'
import {Tabs, router, usePathname} from 'expo-router'
import React from 'react'

import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {

  return(
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 60, height: 50 }}>
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
        style={{bottom: -3}}
      />
      <Text        
      style={{
          fontSize: 10,
          textAlign: 'center',
          fontWeight: focused ? '600' : '400',
          bottom: -12,
          color: color
        }}
        numberOfLines={1}>
        {name.trim()}
      </Text>
    </View>
  )
}

const TabsLayout = () => {

  return (
  <>   
    <Tabs
      screenOptions = {{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fdc500',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#00296b',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 54,
        }
      }}
      >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon  
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="book-desk"
        options = {{
          title: "Book Desk",
          headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon  
            icon={icons.bookmark}
            color={color}
            name="Book Desk"
            focused={focused}
          />
        )
      }}
      />
      <Tabs.Screen
        name="parking"
        options = {{
          headerTitle: "Parking",
          headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon  
            icon={icons.plus}
            color={color}
            name="Parking"
            focused={focused}
          />
        )
      }}
      />
      </Tabs>
   </>
  )
}

export default TabsLayout