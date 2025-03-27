import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const QuickAccessCard = ({ title, description, icon, onPress }) => (
  <TouchableOpacity 
    style={styles.quickAccessCard}
    onPress={onPress}
  >
    <Image source={icon} style={styles.quickAccessIcon} />
    <View style={styles.quickAccessTextContainer}>
      <Text style={styles.quickAccessTitle}>{title}</Text>
      <Text style={styles.quickAccessDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  quickAccessCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    tintColor: '#00296b',
  },
  quickAccessTextContainer: {
    flex: 1,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 5,
  },
  quickAccessDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default QuickAccessCard;