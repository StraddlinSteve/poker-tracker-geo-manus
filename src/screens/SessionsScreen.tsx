import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SessionsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  // Placeholder data for sessions
  const sessions = [
    { id: '1', venue: 'Bellagio Poker Room', date: 'May 19, 2025', game: '$2/$5 NL Hold\'em', profit: '+$350', buyIn: '$500', duration: '3h 45m', cashOut: '$850', isPositive: true, type: 'Live' },
    { id: '2', venue: 'Aria Poker Room', date: 'May 17, 2025', game: '$1/$3 NL Hold\'em', profit: '-$120', buyIn: '$300', duration: '2h 15m', cashOut: '$180', isPositive: false, type: 'Live' },
    { id: '3', venue: 'Home Game', date: 'May 15, 2025', game: '$1/$2 NL Hold\'em', profit: '+$215', buyIn: '$200', duration: '4h 30m', cashOut: '$415', isPositive: true, type: 'Home' },
    { id: '4', venue: 'PokerStars', date: 'May 12, 2025', game: '$0.50/$1 NL Hold\'em', profit: '+$75', buyIn: '$100', duration: '2h 00m', cashOut: '$175', isPositive: true, type: 'Online' },
    { id: '5', venue: 'Wynn Poker Room', date: 'May 10, 2025', game: '$1/$2 Pot Limit Omaha', profit: '-$150', buyIn: '$300', duration: '3h 20m', cashOut: '$150', isPositive: false, type: 'Live' },
  ];

  const filteredSessions = activeTab === 'All' 
    ? sessions 
    : sessions.filter(session => session.type === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.filterTabs}>
        {['All', 'Live', 'Home', 'Online'].map(tab => (
          <TouchableOpacity 
            key={tab}
            style={[styles.filterTab, activeTab === tab ? styles.filterTabActive : null]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.filterTabText, activeTab === tab ? styles.filterTabTextActive : null]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView style={styles.sessionsList}>
        {filteredSessions.map(session => (
          <TouchableOpacity 
            key={session.id} 
            style={styles.sessionItem}
            onPress={() => navigation.navigate('SessionDetails', { sessionId: session.id })}
          >
            <View style={styles.sessionHeader}>
              <Text style={styles.sessionVenue}>{session.venue}</Text>
              <Text style={styles.sessionDate}>{session.date}</Text>
            </View>
            <View style={styles.sessionDetails}>
              <Text style={styles.sessionGame}>{session.game}</Text>
              <Text style={[styles.sessionProfit, session.isPositive ? styles.positive : styles.negative]}>
                {session.profit}
              </Text>
            </View>
            <View style={styles.sessionStats}>
              <Text style={styles.sessionStat}>Buy-in: {session.buyIn}</Text>
              <Text style={styles.sessionStat}>Duration: {session.duration}</Text>
              <Text style={styles.sessionStat}>Cash-out: {session.cashOut}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  filterTabs: {
    flexDirection: 'row',
    margin: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.3)',
  },
  filterTab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterTabActive: {
    backgroundColor: 'rgba(230, 199, 0, 0.3)',
  },
  filterTabText: {
    color: 'rgba(230, 199, 0, 0.7)',
    fontSize: 14,
  },
  filterTabTextActive: {
    color: '#e6c700',
    fontWeight: 'bold',
  },
  sessionsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sessionItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.1)',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sessionVenue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  sessionDate: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sessionGame: {
    fontSize: 16,
    color: '#e6c700',
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
  sessionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sessionStat: {
    fontSize: 14,
    color: '#e6c700',
    opacity: 0.8,
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

export default SessionsScreen;
