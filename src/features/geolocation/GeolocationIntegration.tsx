import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  fetchLocationStart, 
  fetchLocationSuccess, 
  fetchLocationFailure,
  fetchNearbyRoomsStart,
  fetchNearbyRoomsSuccess,
  fetchNearbyRoomsFailure
} from '../features/geolocation/geolocationSlice';

// This would be replaced with actual implementation
const GeolocationManager = {
  // Function to request location permissions
  requestPermissions: async () => {
    try {
      // Simulate permission request
      return { granted: true };
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return { granted: false };
    }
  },
  
  // Function to get current location
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      // Simulate getting current position
      setTimeout(() => {
        resolve({
          coords: {
            latitude: 36.1126,
            longitude: -115.1767,
            accuracy: 10,
          },
          timestamp: Date.now(),
        });
      }, 1000);
    });
  },
  
  // Function to calculate distance between two coordinates
  calculateDistance: (lat1, lon1, lat2, lon2) => {
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
  }
};

// Sample poker room data from CSV
const pokerRoomData = [
  { id: '1', name: 'Bellagio Poker Room', address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1126, lng: -115.1767 },
  { id: '2', name: 'Aria Poker Room', address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158', lat: 36.1072, lng: -115.1728 },
  { id: '3', name: 'Wynn Poker Room', address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1291, lng: -115.1628 },
  { id: '4', name: 'Venetian Poker Room', address: '3355 S Las Vegas Blvd, Las Vegas, NV 89109', lat: 36.1211, lng: -115.1692 },
];

const GeolocationIntegration = () => {
  const dispatch = useAppDispatch();
  const { currentLocation, nearbyPokerRooms, loading, error } = useAppSelector(state => state.geolocation);
  
  // Function to request location permissions and get current location
  const initializeGeolocation = async () => {
    try {
      dispatch(fetchLocationStart());
      
      // Request permissions
      const { granted } = await GeolocationManager.requestPermissions();
      
      if (!granted) {
        dispatch(fetchLocationFailure('Location permission denied'));
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to use the poker room finder feature.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Get current position
      const position = await GeolocationManager.getCurrentPosition();
      
      dispatch(fetchLocationSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
      
      // Find nearby poker rooms
      findNearbyPokerRooms(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error('Error initializing geolocation:', error);
      dispatch(fetchLocationFailure('Failed to get location'));
    }
  };
  
  // Function to find nearby poker rooms
  const findNearbyPokerRooms = (latitude, longitude, radius = 10) => {
    try {
      dispatch(fetchNearbyRoomsStart());
      
      // Calculate distance for each poker room and filter by radius
      const nearbyRooms = pokerRoomData.map(room => {
        const distance = GeolocationManager.calculateDistance(
          latitude,
          longitude,
          room.lat,
          room.lng
        );
        
        return {
          ...room,
          distance: parseFloat(distance.toFixed(2)),
        };
      }).filter(room => room.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
      
      dispatch(fetchNearbyRoomsSuccess(nearbyRooms));
    } catch (error) {
      console.error('Error finding nearby poker rooms:', error);
      dispatch(fetchNearbyRoomsFailure('Failed to find nearby poker rooms'));
    }
  };
  
  // Function to detect current venue
  const detectCurrentVenue = () => {
    if (!currentLocation.latitude || !currentLocation.longitude) {
      return null;
    }
    
    // Find the closest poker room
    const closestRoom = nearbyPokerRooms.reduce((closest, room) => {
      if (!closest || room.distance < closest.distance) {
        return room;
      }
      return closest;
    }, null);
    
    // If the closest room is within 0.1 km (100m), consider the user at that venue
    if (closestRoom && closestRoom.distance <= 0.1) {
      return closestRoom;
    }
    
    return null;
  };
  
  // Initialize geolocation when component mounts
  useEffect(() => {
    initializeGeolocation();
    
    // Set up location tracking interval (every 5 minutes)
    const trackingInterval = setInterval(() => {
      initializeGeolocation();
    }, 5 * 60 * 1000);
    
    // Clean up interval when component unmounts
    return () => {
      clearInterval(trackingInterval);
    };
  }, []);
  
  // Detect current venue whenever location or nearby rooms change
  useEffect(() => {
    const currentVenue = detectCurrentVenue();
    if (currentVenue) {
      console.log('User is at:', currentVenue.name);
      // Here you could trigger a notification or suggest starting a session
    }
  }, [currentLocation, nearbyPokerRooms]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geolocation Integration</Text>
      
      {loading && (
        <Text style={styles.statusText}>Loading location data...</Text>
      )}
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {currentLocation.latitude && currentLocation.longitude && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Current Location:</Text>
          <Text style={styles.coordinatesText}>
            Latitude: {currentLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordinatesText}>
            Longitude: {currentLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}
      
      {nearbyPokerRooms.length > 0 ? (
        <View style={styles.roomsContainer}>
          <Text style={styles.roomsTitle}>Nearby Poker Rooms:</Text>
          {nearbyPokerRooms.map(room => (
            <View key={room.id} style={styles.roomItem}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomDistance}>{room.distance} km away</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noRoomsText}>No poker rooms found nearby</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a3b0a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    color: '#e6c700',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    marginBottom: 8,
  },
  locationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 8,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#e6c700',
    marginBottom: 4,
  },
  roomsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  roomsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 8,
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 199, 0, 0.1)',
  },
  roomName: {
    fontSize: 14,
    color: '#e6c700',
  },
  roomDistance: {
    fontSize: 14,
    color: '#e6c700',
    fontWeight: 'bold',
  },
  noRoomsText: {
    fontSize: 16,
    color: '#e6c700',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default GeolocationIntegration;
