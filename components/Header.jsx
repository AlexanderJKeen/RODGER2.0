import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatLongDate } from '../utils/dateUtils';

const Header = ({ title, subtitle = null }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      ) : (
        <Text style={styles.headerSubtitle}>
          {formatLongDate(new Date())}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f08012',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#f08012',
    marginTop: 5,
  },
});

export default Header;