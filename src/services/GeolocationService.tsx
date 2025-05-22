import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// This would be replaced with actual geolocation implementation
const PokerRoomGeolocationService = {
  getCurrentPosition: () => {
    return new Promise((resolve) => {
      // Simulate getting current position
      setTimeout(() => {
        resolve({
          coords: {
            latitude: 36.1126,
            longitude: -115.1767,
          }
        });
      }, 1000);
    });
  },
  
  findNearbyPokerRooms: (latitude, longitude, radius = 10) => {
    return new Promise((resolve) => {
      // Simulate API call to find nearby poker rooms
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Bellagio Poker Room', address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109', distance: 0.2, lat: 36.1126, lng: -115.1767 },
          { id: '2', name: 'Aria Poker Room', address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158', distance: 0.5, lat: 36.1072, lng: -115.1728 },
          { id: '3', name: 'Wynn Poker Room', address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109', distance: 1.2, lat: 36.1291, lng: -115.1628 },
        ]);
      }, 1500);
    });
  }
};

const GeolocationService = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [nearbyRooms, setNearbyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const position = await PokerRoomGeolocationService.getCurrentPosition();
        setLocation(position.coords);
        
        const rooms = await PokerRoomGeolocationService.findNearbyPokerRooms(
          position.coords.latitude,
          position.coords.longitude
        );
        
        setNearbyRooms(rooms);
        setLoading(false);
      } catch (err) {
        setError('Failed to get location or nearby poker rooms');
        setLoading(false);
      }
    };
    
    fetchLocation();
  }, []);

  const handleStartSession = (room) => {
    navigation.navigate('NewSession', { venue: room.name, venueType: 'Live' });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Finding poker rooms near you...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Nearby Poker Rooms</Text>
      
      {nearbyRooms.length === 0 ? (
        <Text style={styles.noRoomsText}>No poker rooms found nearby</Text>
      ) : (
        <View style={styles.roomsList}>
          {nearbyRooms.map(room => (
            <View key={room.id} style={styles.roomItem}>
              <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.roomAddress}>{room.address}</Text>
                <Text style={styles.roomDistance}>{room.distance} miles away</Text>
              </View>
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => handleStartSession(room)}
              >
                <Text style={styles.startButtonText}>Start Session</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#0a3b0a',
  },
  loadingText: {
    fontSize: 18,
    color: '#e6c700',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#e6c700',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 20,
  },
  noRoomsText: {
    fontSize: 16,
    color: '#e6c700',
    textAlign: 'center',
    marginTop: 20,
  },
  roomsList: {
    flex: 1,
  },
  roomItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.1)',
  },
  roomInfo: {
    marginBottom: 15,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 5,
  },
  roomAddress: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
    marginBottom: 5,
  },
  roomDistance: {
    fontSize: 14,
    color: '#e6c700',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#e6c700',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
  },
});

export default GeolocationService;
