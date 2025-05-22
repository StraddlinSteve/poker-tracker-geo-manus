import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  // Placeholder data for the dashboard
  const freeSessionsLeft = 7;
  const profitLoss = '+$1,245.00';
  const recentSessions = [
    { id: '1', venue: 'Bellagio Poker Room', details: '$2/$5 NL Hold\'em • May 19', profit: '+$350', isPositive: true },
    { id: '2', venue: 'Aria Poker Room', details: '$1/$3 NL Hold\'em • May 17', profit: '-$120', isPositive: false },
    { id: '3', venue: 'Home Game', details: '$1/$2 NL Hold\'em • May 15', profit: '+$215', isPositive: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.freeSessionsCard}>
          <Text style={styles.freeSessionsText}>You have</Text>
          <Text style={styles.freeSessionsCount}>{freeSessionsLeft} Free Sessions Left</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Profit/Loss</Text>
            <Text style={styles.statsPeriod}>Last 30 Days</Text>
          </View>
          <Text style={styles.profitAmount}>{profitLoss}</Text>
          <View style={styles.profitChart}>
            <View style={styles.chartLine}></View>
            <View style={styles.chartData}></View>
          </View>
        </View>
        
        <View style={styles.sessionsCard}>
          <View style={styles.sessionsHeader}>
            <Text style={styles.sessionsTitle}>Recent Sessions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sessions')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentSessions.map(session => (
            <TouchableOpacity 
              key={session.id} 
              style={styles.sessionItem}
              onPress={() => navigation.navigate('SessionDetails', { sessionId: session.id })}
            >
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionVenue}>{session.venue}</Text>
                <Text style={styles.sessionDetails}>{session.details}</Text>
              </View>
              <Text style={[styles.sessionProfit, session.isPositive ? styles.positive : styles.negative]}>
                {session.profit}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.newSessionBtn}
        onPress={() => navigation.navigate('NewSession')}
      >
        <Text style={styles.newSessionBtnText}>+</Text>
      </TouchableOpacity>
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
  freeSessionsCard: {
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  freeSessionsText: {
    fontSize: 16,
    color: '#e6c700',
    marginBottom: 5,
  },
  freeSessionsCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  statsCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  statsPeriod: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
  },
  profitAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 10,
  },
  profitChart: {
    height: 100,
    backgroundColor: 'rgba(230, 199, 0, 0.1)',
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 10,
  },
  chartLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 199, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 199, 0, 0.3)',
  },
  chartData: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
  },
  sessionsCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sessionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  viewAll: {
    fontSize: 14,
    color: '#e6c700',
    textDecorationLine: 'underline',
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 199, 0, 0.1)',
  },
  sessionInfo: {
    flexDirection: 'column',
  },
  sessionVenue: {
    fontSize: 16,
    color: '#e6c700',
    marginBottom: 5,
  },
  sessionDetails: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
  },
  sessionProfit: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  newSessionBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#e6c700',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  newSessionBtnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0a3b0a',
  },
});

export default DashboardScreen;
