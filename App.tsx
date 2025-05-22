import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Import screens (to be created)
import DashboardScreen from './src/screens/DashboardScreen';
import SessionsScreen from './src/screens/SessionsScreen';
import FindRoomsScreen from './src/screens/FindRoomsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NewSessionScreen from './src/screens/NewSessionScreen';
import SessionDetailsScreen from './src/screens/SessionDetailsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e6c700',
        tabBarInactiveTintColor: 'rgba(230, 199, 0, 0.5)',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderTopColor: 'rgba(230, 199, 0, 0.3)',
        },
        headerStyle: {
          backgroundColor: '#0a3b0a',
          borderBottomColor: 'rgba(230, 199, 0, 0.3)',
          borderBottomWidth: 1,
        },
        headerTintColor: '#e6c700',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
        }}
      />
      <Tab.Screen 
        name="Sessions" 
        component={SessionsScreen} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="sessions" color={color} />,
        }}
      />
      <Tab.Screen 
        name="FindRooms" 
        component={FindRoomsScreen} 
        options={{
          title: 'Find Poker Rooms',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Temporary TabBarIcon component until we implement proper icons
function TabBarIcon({ name, color }) {
  // This will be replaced with proper icons
  const iconMap = {
    dashboard: '📊',
    sessions: '📝',
    map: '🗺️',
    settings: '⚙️',
  };
  
  return <Text style={{ fontSize: 24, color }}>{iconMap[name]}</Text>;
}

// Main stack navigator that includes the tab navigator
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a3b0a',
          borderBottomColor: 'rgba(230, 199, 0, 0.3)',
          borderBottomWidth: 1,
        },
        headerTintColor: '#e6c700',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NewSession" 
        component={NewSessionScreen} 
        options={{ title: 'New Session' }}
      />
      <Stack.Screen 
        name="SessionDetails" 
        component={SessionDetailsScreen} 
        options={{ title: 'Session Details' }}
      />
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen} 
        options={{ title: 'Analytics' }}
      />
      <Stack.Screen 
        name="Subscription" 
        component={SubscriptionScreen} 
        options={{ title: 'Subscription' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
