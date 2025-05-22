import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FindRoomsScreen = () => {
  const navigation = useNavigation();
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Placeholder data for poker rooms
  const pokerRooms = [
    { id: '1', name: 'Bellagio Poker Room', address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1126, lng: -115.1767 },
    { id: '2', name: 'Aria Poker Room', address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158', lat: 36.1072, lng: -115.1728 },
    { id: '3', name: 'Wynn Poker Room', address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1291, lng: -115.1628 },
    { id: '4', name: 'Venetian Poker Room', address: '3355 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1211, lng: -115.1692 },
  ];

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const closeVenuePopup = () => {
    setSelectedVenue(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Interactive map showing poker rooms near you</Text>
        </View>
        
        <View style={styles.mapMarkers}>
          {pokerRooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[styles.marker, { top: `${40 + Math.random() * 20}%`, left: `${40 + Math.random() * 20}%` }]}
              onPress={() => handleVenueSelect(room)}
            >
              <Text style={styles.markerText}>P</Text>
            </TouchableOpacity>
          ))}
          <View style={[styles.marker, styles.userMarker, { top: '50%', left: '50%' }]}>
            <Text style={styles.markerText}>U</Text>
          </View>
        </View>
        
        {selectedVenue && (
          <View style={styles.venuePopup}>
            <View style={styles.popupHeader}>
              <Text style={styles.venueName}>{selectedVenue.name}</Text>
              <TouchableOpacity onPress={closeVenuePopup}>
                <Text style={styles.closePopup}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.venueAddress}>{selectedVenue.address}</Text>
            <View style={styles.venueActions}>
              <TouchableOpacity style={styles.venueAction}>
                <Text style={styles.actionText}>Get Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.venueAction}>
                <Text style={styles.actionText}>PokerAtlas Info</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.venueAction}
                onPress={() => {
                  closeVenuePopup();
                  navigation.navigate('NewSession', { venue: selectedVenue });
                }}
              >
                <Text style={styles.actionText}>Start Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.suggestVenue}
          onPress={() => navigation.navigate('SuggestVenue')}
        >
          <Text style={styles.suggestVenueText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3b0a',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1a4a1a',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  mapIcon: {
    fontSize: 48,
    color: '#e6c700',
    marginBottom: 15,
  },
  mapText: {
    fontSize: 16,
    color: '#e6c700',
    textAlign: 'center',
    maxWidth: '80%',
  },
  mapMarkers: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  userMarker: {
    backgroundColor: '#2196F3',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  venuePopup: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(10, 59, 10, 0.9)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.5)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  closePopup: {
    fontSize: 24,
    color: '#e6c700',
    marginTop: -5,
  },
  venueAddress: {
    fontSize: 14,
    color: '#e6c700',
    marginBottom: 15,
    opacity: 0.9,
  },
  venueActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  venueAction: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#e6c700',
  },
  suggestVenue: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#e6c700',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  suggestVenueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a3b0a',
  },
});

export default FindRoomsScreen;
