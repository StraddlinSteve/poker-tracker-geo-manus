import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchLocationStart, fetchLocationSuccess, fetchLocationFailure } from '../geolocation/geolocationSlice';

// This would be replaced with actual implementation using react-native-maps
const MapComponent = ({ currentLocation, pokerRooms, onRoomSelect }) => {
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapText}>Interactive map showing poker rooms near you</Text>
      </View>
      
      {/* Simulated markers */}
      <View style={styles.mapMarkers}>
        {pokerRooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={[styles.marker, { top: `${40 + Math.random() * 20}%`, left: `${40 + Math.random() * 20}%` }]}
            onPress={() => onRoomSelect(room)}
          >
            <Text style={styles.markerText}>P</Text>
          </TouchableOpacity>
        ))}
        
        {currentLocation && (
          <View style={[styles.marker, styles.userMarker, { top: '50%', left: '50%' }]}>
            <Text style={styles.markerText}>U</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const PokerRoomFinderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { currentLocation } = useAppSelector(state => state.geolocation);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [nearbyRooms, setNearbyRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder data for poker rooms
  const pokerRooms = [
    { id: '1', name: 'Bellagio Poker Room', address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1126, lng: -115.1767 },
    { id: '2', name: 'Aria Poker Room', address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158', lat: 36.1072, lng: -115.1728 },
    { id: '3', name: 'Wynn Poker Room', address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1291, lng: -115.1628 },
    { id: '4', name: 'Venetian Poker Room', address: '3355 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1211, lng: -115.1692 },
  ];

  // Function to get current location
  const getCurrentLocation = async () => {
    try {
      dispatch(fetchLocationStart());
      
      // Simulate getting location
      setTimeout(() => {
        const location = {
          latitude: 36.1126,
          longitude: -115.1767,
        };
        
        dispatch(fetchLocationSuccess(location));
        setLoading(false);
        
        // Find nearby rooms based on location
        findNearbyRooms(location);
      }, 1500);
    } catch (error) {
      console.error('Error getting location:', error);
      dispatch(fetchLocationFailure('Failed to get location'));
      setLoading(false);
      
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check your location settings and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Function to find nearby poker rooms
  const findNearbyRooms = (location) => {
    // Calculate distance for each poker room
    const roomsWithDistance = pokerRooms.map(room => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        room.lat,
        room.lng
      );
      
      return {
        ...room,
        distance: parseFloat(distance.toFixed(2)),
      };
    });
    
    // Sort by distance
    const sortedRooms = roomsWithDistance.sort((a, b) => a.distance - b.distance);
    setNearbyRooms(sortedRooms);
  };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Handle venue selection
  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  // Close venue popup
  const closeVenuePopup = () => {
    setSelectedVenue(null);
  };

  // Start a session at the selected venue
  const startSession = () => {
    if (selectedVenue) {
      navigation.navigate('NewSession', { 
        venue: selectedVenue.name,
        venueType: 'Live',
        location: {
          latitude: selectedVenue.lat,
          longitude: selectedVenue.lng,
          address: selectedVenue.address
        }
      });
      closeVenuePopup();
    }
  };

  // Get directions to the selected venue
  const getDirections = () => {
    Alert.alert(
      'Get Directions',
      `Opening directions to ${selectedVenue.name}`,
      [{ text: 'OK' }]
    );
    // In a real app, this would open the device's map app with directions
  };

  // Open PokerAtlas info for the selected venue
  const openPokerAtlasInfo = () => {
    Alert.alert(
      'PokerAtlas Info',
      `Opening PokerAtlas information for ${selectedVenue.name}`,
      [{ text: 'OK' }]
    );
    // In a real app, this would open the PokerAtlas website or deep link to the app
  };

  // Suggest a new poker room
  const suggestNewVenue = () => {
    navigation.navigate('SuggestVenue');
  };

  // Get location and find nearby rooms when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Finding poker rooms near you...</Text>
        </View>
      ) : (
        <>
          <MapComponent 
            currentLocation={currentLocation}
            pokerRooms={nearbyRooms}
            onRoomSelect={handleVenueSelect}
          />
          
          {selectedVenue && (
            <View style={styles.venuePopup}>
              <View style={styles.popupHeader}>
                <Text style={styles.venueName}>{selectedVenue.name}</Text>
                <TouchableOpacity onPress={closeVenuePopup}>
                  <Text style={styles.closePopup}>×</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.venueAddress}>{selectedVenue.address}</Text>
              <Text style={styles.venueDistance}>{selectedVenue.distance} km away</Text>
              <View style={styles.venueActions}>
                <TouchableOpacity style={styles.venueAction} onPress={getDirections}>
                  <Text style={styles.actionText}>Get Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.venueAction} onPress={openPokerAtlasInfo}>
                  <Text style={styles.actionText}>PokerAtlas Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.venueAction} onPress={startSession}>
                  <Text style={styles.actionText}>Start Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.suggestVenue}
            onPress={suggestNewVenue}
          >
            <Text style={styles.suggestVenueText}>+</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3b0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#e6c700',
    textAlign: 'center',
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
    marginBottom: 5,
    opacity: 0.9,
  },
  venueDistance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 15,
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

export default PokerRoomFinderScreen;
