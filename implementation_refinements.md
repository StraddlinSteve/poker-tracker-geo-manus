# Poker Tracker Geo - Implementation Refinements

## Background Location Tracking Optimization

```typescript
// Enhanced GeolocationManager with battery-efficient tracking
import BackgroundGeolocation from 'react-native-background-geolocation';

export const configureBackgroundGeolocation = () => {
  BackgroundGeolocation.configure({
    // Tracking Configuration
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    stationaryRadius: 50,
    distanceFilter: 100, // meters
    
    // Activity Recognition
    stopTimeout: 5, // minutes
    
    // Battery-saving settings
    saveBatteryOnBackground: true,
    startOnBoot: false,
    
    // Debug settings
    debug: false,
    
    // Logging
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    
    // Android specific
    notificationTitle: 'Poker Tracker Geo',
    notificationText: 'Tracking nearby poker rooms',
    notificationIconColor: '#e6c700',
    
    // iOS specific
    activityType: 'other',
    pausesLocationUpdatesAutomatically: true,
  });
  
  BackgroundGeolocation.on('location', (location) => {
    // Handle location update
    console.log('Background location update:', location);
    // Dispatch to Redux store
  });
  
  BackgroundGeolocation.on('error', (error) => {
    console.log('Background location error:', error);
  });
  
  BackgroundGeolocation.on('authorization', (status) => {
    console.log('Background location authorization status:', status);
    
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      // Request permissions
    }
  });
  
  BackgroundGeolocation.checkStatus(status => {
    if (status.isRunning) {
      BackgroundGeolocation.start();
    }
  });
};

export const startBackgroundTracking = () => {
  BackgroundGeolocation.start();
};

export const stopBackgroundTracking = () => {
  BackgroundGeolocation.stop();
};

export const setTrackingMode = (mode: 'high' | 'balanced' | 'low') => {
  let config = {};
  
  switch (mode) {
    case 'high':
      config = {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 50,
        interval: 5000,
      };
      break;
    case 'balanced':
      config = {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_BALANCED,
        distanceFilter: 100,
        interval: 10000,
      };
      break;
    case 'low':
      config = {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_LOW,
        distanceFilter: 500,
        interval: 30000,
      };
      break;
  }
  
  BackgroundGeolocation.setConfig(config);
};
```

## Offline Functionality Implementation

```typescript
// Enhanced SessionService with offline support
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export class SessionService {
  // Queue for storing sessions created offline
  private offlineQueue: Session[] = [];
  private isOnline: boolean = true;
  
  constructor() {
    this.loadOfflineQueue();
    this.setupNetworkListener();
  }
  
  private async loadOfflineQueue() {
    try {
      const queueData = await AsyncStorage.getItem('offlineSessionQueue');
      if (queueData) {
        this.offlineQueue = JSON.parse(queueData);
      }
    } catch (error) {
      console.error('Error loading offline queue:', error);
    }
  }
  
  private async saveOfflineQueue() {
    try {
      await AsyncStorage.setItem('offlineSessionQueue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }
  
  private setupNetworkListener() {
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected && state.isInternetReachable;
      
      // If we just came back online, sync the offline queue
      if (wasOffline && this.isOnline) {
        this.syncOfflineQueue();
      }
    });
  }
  
  async createSession(sessionData: Partial<Session>): Promise<Session> {
    const newSession: Session = {
      id: uuidv4(),
      ...sessionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncStatus: this.isOnline ? 'synced' : 'pending'
    };
    
    if (this.isOnline) {
      try {
        // Send to API
        const savedSession = await this.apiCreateSession(newSession);
        return savedSession;
      } catch (error) {
        console.error('Error creating session online:', error);
        // Fall back to offline storage if API call fails
        this.offlineQueue.push(newSession);
        this.saveOfflineQueue();
        return newSession;
      }
    } else {
      // Store in offline queue
      this.offlineQueue.push(newSession);
      this.saveOfflineQueue();
      return newSession;
    }
  }
  
  private async apiCreateSession(session: Session): Promise<Session> {
    // Implementation of API call to create session
    return session; // Placeholder
  }
  
  async syncOfflineQueue(): Promise<void> {
    if (!this.isOnline || this.offlineQueue.length === 0) {
      return;
    }
    
    const sessionsToSync = [...this.offlineQueue];
    this.offlineQueue = [];
    
    for (const session of sessionsToSync) {
      try {
        await this.apiCreateSession(session);
      } catch (error) {
        console.error('Error syncing session:', error);
        // Put back in queue if sync fails
        this.offlineQueue.push(session);
      }
    }
    
    this.saveOfflineQueue();
  }
  
  getOfflineQueueStatus(): { count: number, pendingSync: boolean } {
    return {
      count: this.offlineQueue.length,
      pendingSync: this.offlineQueue.length > 0 && this.isOnline
    };
  }
}
```

## Performance Optimization for Map Rendering

```typescript
// Optimized Map Component with performance improvements
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAppSelector } from '../../store';

const OptimizedMapComponent = ({ pokerRooms, onRoomSelect, initialRegion }) => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const { currentLocation } = useAppSelector(state => state.geolocation);
  
  // Memoize markers to prevent unnecessary re-renders
  const pokerRoomMarkers = useMemo(() => {
    return pokerRooms.map(room => (
      <Marker
        key={room.id}
        coordinate={{
          latitude: room.lat,
          longitude: room.lng
        }}
        title={room.name}
        description={`${room.distance} miles away`}
        onPress={() => onRoomSelect(room)}
        tracksViewChanges={false} // Important for performance
      />
    ));
  }, [pokerRooms, onRoomSelect]);
  
  // Only update user marker when location significantly changes
  const userMarker = useMemo(() => {
    if (!currentLocation?.latitude || !currentLocation?.longitude) {
      return null;
    }
    
    return (
      <Marker
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        }}
        title="Your Location"
        pinColor="blue"
        tracksViewChanges={false}
      />
    );
  }, [currentLocation?.latitude, currentLocation?.longitude]);
  
  // Optimize initial region calculation
  const region = useMemo(() => {
    if (initialRegion) {
      return initialRegion;
    }
    
    if (currentLocation?.latitude && currentLocation?.longitude) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      };
    }
    
    return {
      latitude: 36.1126,
      longitude: -115.1767,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    };
  }, [initialRegion, currentLocation?.latitude, currentLocation?.longitude]);
  
  // Handle map ready event
  const handleMapReady = () => {
    setMapReady(true);
  };
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
        initialRegion={region}
        onMapReady={handleMapReady}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        loadingEnabled={true}
        moveOnMarkerPress={false}
      >
        {mapReady && userMarker}
        {mapReady && pokerRoomMarkers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(OptimizedMapComponent);
```

## Cross-Platform UI Refinements

```typescript
// Responsive layout utilities for cross-platform consistency
import { Dimensions, Platform, PixelRatio, ScaledSize } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions for scaling (based on standard iPhone 11)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

// Determine if device is a tablet
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  return (
    (adjustedWidth >= 900 || adjustedHeight >= 900) || // Size threshold
    Platform.OS === 'ios' && Platform.isPad // iOS specific check
  );
};

// Scale size based on device width
export const scaleSize = (size: number) => {
  return Math.round(size * widthScale);
};

// Scale vertical size (for heights, margins, paddings)
export const scaleVertical = (size: number) => {
  return Math.round(size * heightScale);
};

// Scale font size with minimum size protection
export const scaleFontSize = (size: number) => {
  const newSize = Math.round(size * widthScale);
  return Platform.OS === 'ios' ? Math.round(newSize) : Math.round(newSize) - 2;
};

// Get platform-specific styles
export const getPlatformSpecificStyles = (iosStyles, androidStyles) => {
  return Platform.OS === 'ios' ? iosStyles : androidStyles;
};

// Get device-type specific styles
export const getDeviceTypeStyles = (mobileStyles, tabletStyles) => {
  return isTablet() ? tabletStyles : mobileStyles;
};

// Handle orientation changes
export const useOrientation = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    
    Dimensions.addEventListener('change', onChange);
    
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  
  return {
    ...dimensions,
    isPortrait: dimensions.height > dimensions.width,
    isLandscape: dimensions.width > dimensions.height,
  };
};
```

## Geolocation Accuracy Improvements

```typescript
// Enhanced venue detection with accuracy improvements
export const detectCurrentVenue = (
  currentLocation,
  pokerRooms,
  options = { threshold: 0.1, minAccuracy: 50 }
) => {
  if (
    !currentLocation?.latitude ||
    !currentLocation?.longitude ||
    !currentLocation?.accuracy ||
    currentLocation.accuracy > options.minAccuracy
  ) {
    return null;
  }
  
  // Find the closest poker room
  const closestRoom = pokerRooms.reduce((closest, room) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      room.lat,
      room.lng
    );
    
    if (!closest || distance < closest.distance) {
      return { ...room, distance };
    }
    return closest;
  }, null);
  
  // Adjust threshold based on location accuracy
  const dynamicThreshold = options.threshold * (1 + (currentLocation.accuracy / 100));
  
  // If the closest room is within threshold, consider the user at that venue
  if (closestRoom && closestRoom.distance <= dynamicThreshold) {
    return closestRoom;
  }
  
  return null;
};

// Improved distance calculation with Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

// Location filtering with Kalman filter for smoother tracking
export class LocationFilter {
  private lastLat: number | null = null;
  private lastLng: number | null = null;
  private variance: number = 0;
  
  // Process new location reading
  processLocation(lat: number, lng: number, accuracy: number): { latitude: number, longitude: number } {
    // Initialize with first reading
    if (this.lastLat === null || this.lastLng === null) {
      this.lastLat = lat;
      this.lastLng = lng;
      this.variance = accuracy * accuracy;
      return { latitude: lat, longitude: lng };
    }
    
    // Calculate Kalman gain
    const k = this.variance / (this.variance + (accuracy * accuracy));
    
    // Update estimate
    const newLat = this.lastLat + k * (lat - this.lastLat);
    const newLng = this.lastLng + k * (lng - this.lastLng);
    
    // Update variance
    this.variance = (1 - k) * this.variance;
    
    // Save for next iteration
    this.lastLat = newLat;
    this.lastLng = newLng;
    
    return { latitude: newLat, longitude: newLng };
  }
  
  // Reset filter
  reset() {
    this.lastLat = null;
    this.lastLng = null;
    this.variance = 0;
  }
}
```

## Analytics Visualization Enhancements

```typescript
// Enhanced analytics charts with improved visualization
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export const EnhancedProfitChart = ({ sessions, timeRange }) => {
  // Process data based on time range
  const chartData = processSessionsForChart(sessions, timeRange);
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Profit/Loss Over Time</Text>
      <LineChart
        data={chartData}
        width={width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#0a3b0a',
          backgroundGradientFrom: '#0a3b0a',
          backgroundGradientTo: '#1a4a1a',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#e6c700',
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: 'rgba(230, 199, 0, 0.2)',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

export const EnhancedGameTypeChart = ({ sessions }) => {
  // Process data for game types
  const chartData = processGameTypeData(sessions);
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Performance by Game Type</Text>
      <BarChart
        data={chartData}
        width={width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#0a3b0a',
          backgroundGradientFrom: '#0a3b0a',
          backgroundGradientTo: '#1a4a1a',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.7,
        }}
        style={styles.chart}
        showValuesOnTopOfBars
      />
    </View>
  );
};

export const EnhancedVenueChart = ({ sessions }) => {
  // Process data for venues
  const chartData = processVenueData(sessions);
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Performance by Venue</Text>
      <PieChart
        data={chartData}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#0a3b0a',
          backgroundGradientFrom: '#0a3b0a',
          backgroundGradientTo: '#1a4a1a',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(230, 199, 0, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </View>
  );
};

// Helper functions for data processing
const processSessionsForChart = (sessions, timeRange) => {
  // Implementation of data processing for time-based chart
  // ...
  
  // Placeholder return
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [100, 250, -50, 300, 400, 200],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

const processGameTypeData = (sessions) => {
  // Implementation of data processing for game types
  // ...
  
  // Placeholder return
  return {
    labels: ['$1/$2', '$2/$5', 'PLO', '$5/$10'],
    datasets: [
      {
        data: [300, 500, -100, 200],
      },
    ],
  };
};

const processVenueData = (sessions) => {
  // Implementation of data processing for venues
  // ...
  
  // Placeholder return
  return [
    {
      name: 'Bellagio',
      value: 40,
      color: '#4CAF50',
      legendFontColor: '#e6c700',
      legendFontSize: 12,
    },
    {
      name: 'Aria',
      value: 30,
      color: '#2196F3',
      legendFontColor: '#e6c700',
      legendFontSize: 12,
    },
    {
      name: 'Wynn',
      value: 20,
      color: '#FFC107',
      legendFontColor: '#e6c700',
      legendFontSize: 12,
    },
    {
      name: 'Home',
      value: 10,
      color: '#9C27B0',
      legendFontColor: '#e6c700',
      legendFontSize: 12,
    },
  ];
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
```
