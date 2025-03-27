import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LayoutSelection = ({ layouts, selectedLayout, onSelectLayout }) => {
  return (
    <View style={styles.layoutSelection}>
      <Text style={styles.sectionTitle}>Select seating arrangement:</Text>
      <View style={styles.layoutOptions}>
        {layouts.map(layout => (
          <TouchableOpacity
            key={layout.id}
            style={[
              styles.layoutOption,
              selectedLayout?.id === layout.id && styles.selectedLayoutOption
            ]}
            onPress={() => onSelectLayout(layout)}
          >
            <Image source={layout.icon} style={styles.layoutIcon} />
            <Text style={styles.layoutName}>{layout.name}</Text>
            <Text style={styles.layoutDescription}>{layout.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutSelection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 10,
  },
  layoutOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  layoutOption: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedLayoutOption: {
    borderColor: '#fdc500',
    borderWidth: 2,
    backgroundColor: '#fff9e6',
  },
  layoutIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#00296b',
  },
  layoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00296b',
    marginBottom: 5,
  },
  layoutDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default LayoutSelection;