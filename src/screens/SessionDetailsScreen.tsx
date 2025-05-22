import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SessionDetailsScreen = () => {
  const route = useRoute();
  const { sessionId } = route.params || {};
  
  // Placeholder session data - in a real app, this would be fetched from Redux/database
  const sessionData = {
    id: sessionId || '1',
    venue: 'Bellagio Poker Room',
    venueType: 'Live',
    date: 'May 19, 2025',
    startTime: '6:30 PM',
    endTime: '10:15 PM',
    duration: '3h 45m',
    game: '$2/$5 No Limit Hold\'em',
    buyIn: '$500',
    cashOut: '$850',
    profit: '+$350',
    isPositive: true,
    notes: 'Played tight early, opened up after dinner break. Hit a set of Kings against villain\'s top two pair for a big pot.',
    location: {
      latitude: 36.1126,
      longitude: -115.1767,
      address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109'
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSection}>
          <Text style={styles.venueName}>{sessionData.venue}</Text>
          <Text style={styles.sessionDate}>{sessionData.date}</Text>
          <View style={styles.profitContainer}>
            <Text style={[styles.profitAmount, sessionData.isPositive ? styles.positive : styles.negative]}>
              {sessionData.profit}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Game</Text>
              <Text style={styles.detailValue}>{sessionData.game}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Venue Type</Text>
              <Text style={styles.detailValue}>{sessionData.venueType}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Start Time</Text>
              <Text style={styles.detailValue}>{sessionData.startTime}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>End Time</Text>
              <Text style={styles.detailValue}>{sessionData.endTime}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{sessionData.duration}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Financial Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Buy-in</Text>
              <Text style={styles.detailValue}>{sessionData.buyIn}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Cash-out</Text>
              <Text style={styles.detailValue}>{sessionData.cashOut}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Profit/Loss</Text>
              <Text style={[styles.detailValue, sessionData.isPositive ? styles.positive : styles.negative]}>
                {sessionData.profit}
              </Text>
            </View>
          </View>
        </View>
        
        {sessionData.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{sessionData.notes}</Text>
          </View>
        )}
        
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Map view of session location</Text>
          </View>
          <Text style={styles.locationAddress}>{sessionData.location.address}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Session</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3b0a',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  headerSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  venueName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 5,
    textAlign: 'center',
  },
  sessionDate: {
    fontSize: 16,
    color: '#e6c700',
    opacity: 0.8,
    marginBottom: 15,
  },
  profitContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
  },
  profitAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  detailsSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  financialSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#e6c700',
    fontWeight: 'bold',
  },
  notesSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 16,
    color: '#e6c700',
    lineHeight: 22,
  },
  locationSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mapIcon: {
    fontSize: 36,
    color: '#e6c700',
    marginBottom: 10,
  },
  mapText: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
  },
  locationAddress: {
    fontSize: 14,
    color: '#e6c700',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  editButton: {
    flex: 1,
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#e6c700',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
});

export default SessionDetailsScreen;
