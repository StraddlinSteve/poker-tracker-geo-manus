import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    sessionReminders: true,
    nearbyPokerRooms: true,
    appUpdates: false,
    darkMode: true,
  });

  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.settingsSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.sectionTitleText}>Account</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Profile</Text>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>John Doe</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.itemLabel}>Subscription</Text>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>Annual Plan</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Change Password</Text>
            <View style={styles.itemValue}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>🔔</Text>
            <Text style={styles.sectionTitleText}>Notifications</Text>
          </View>
          
          <View style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Session Reminders</Text>
            <View style={styles.itemValue}>
              <Switch
                trackColor={{ false: 'rgba(230, 199, 0, 0.3)', true: 'rgba(76, 175, 80, 0.5)' }}
                thumbColor={settings.sessionReminders ? '#4CAF50' : '#e6c700'}
                ios_backgroundColor="rgba(230, 199, 0, 0.3)"
                onValueChange={() => toggleSetting('sessionReminders')}
                value={settings.sessionReminders}
              />
            </View>
          </View>
          
          <View style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Nearby Poker Rooms</Text>
            <View style={styles.itemValue}>
              <Switch
                trackColor={{ false: 'rgba(230, 199, 0, 0.3)', true: 'rgba(76, 175, 80, 0.5)' }}
                thumbColor={settings.nearbyPokerRooms ? '#4CAF50' : '#e6c700'}
                ios_backgroundColor="rgba(230, 199, 0, 0.3)"
                onValueChange={() => toggleSetting('nearbyPokerRooms')}
                value={settings.nearbyPokerRooms}
              />
            </View>
          </View>
          
          <View style={styles.settingsItem}>
            <Text style={styles.itemLabel}>App Updates</Text>
            <View style={styles.itemValue}>
              <Switch
                trackColor={{ false: 'rgba(230, 199, 0, 0.3)', true: 'rgba(76, 175, 80, 0.5)' }}
                thumbColor={settings.appUpdates ? '#4CAF50' : '#e6c700'}
                ios_backgroundColor="rgba(230, 199, 0, 0.3)"
                onValueChange={() => toggleSetting('appUpdates')}
                value={settings.appUpdates}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>🌐</Text>
            <Text style={styles.sectionTitleText}>Preferences</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Currency</Text>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>USD ($)</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Default Game</Text>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>$1/$2 No Limit Hold'em</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Dark Mode</Text>
            <View style={styles.itemValue}>
              <Switch
                trackColor={{ false: 'rgba(230, 199, 0, 0.3)', true: 'rgba(76, 175, 80, 0.5)' }}
                thumbColor={settings.darkMode ? '#4CAF50' : '#e6c700'}
                ios_backgroundColor="rgba(230, 199, 0, 0.3)"
                onValueChange={() => toggleSetting('darkMode')}
                value={settings.darkMode}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>ℹ️</Text>
            <Text style={styles.sectionTitleText}>About</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Privacy Policy</Text>
            <View style={styles.itemValue}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Terms of Service</Text>
            <View style={styles.itemValue}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.itemLabel}>Contact Support</Text>
            <View style={styles.itemValue}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionInfo}>Poker Tracker Geo v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3b0a',
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  settingsSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#e6c700',
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 199, 0, 0.1)',
  },
  itemLabel: {
    fontSize: 16,
    color: '#e6c700',
  },
  itemValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#e6c700',
    opacity: 0.8,
    marginRight: 5,
  },
  arrowIcon: {
    fontSize: 16,
    color: '#e6c700',
    opacity: 0.8,
  },
  logoutButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 6,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  versionInfo: {
    textAlign: 'center',
    fontSize: 12,
    color: '#e6c700',
    opacity: 0.7,
    marginBottom: 20,
  },
});

export default SettingsScreen;
