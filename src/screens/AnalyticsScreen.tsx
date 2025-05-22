import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnalyticsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Time');

  // Placeholder data for analytics
  const overallStats = {
    totalProfit: '+$8,245',
    sessions: 42,
    avgProfit: '+$196',
  };

  const gameTypeStats = [
    { name: '$1/$2 No Limit Hold\'em', profit: '+$3,450', isPositive: true },
    { name: '$2/$5 No Limit Hold\'em', profit: '+$5,120', isPositive: true },
    { name: '$1/$2 Pot Limit Omaha', profit: '-$325', isPositive: false },
  ];

  const venueStats = [
    { name: 'Bellagio Poker Room', profit: '+$4,250', isPositive: true },
    { name: 'Aria Poker Room', profit: '+$2,780', isPositive: true },
    { name: 'Home Game', profit: '+$1,215', isPositive: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.filterTabs}>
          {['All Time', 'Year', 'Month', 'Week'].map(tab => (
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
        
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Overall Performance</Text>
          </View>
          
          <View style={styles.statsSummary}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, styles.positive]}>{overallStats.totalProfit}</Text>
              <Text style={styles.summaryLabel}>Total Profit</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{overallStats.sessions}</Text>
              <Text style={styles.summaryLabel}>Sessions</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{overallStats.avgProfit}</Text>
              <Text style={styles.summaryLabel}>Avg Profit</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartGrid}></View>
            <View style={styles.chartData}></View>
          </View>
          
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Jan</Text>
            <Text style={styles.chartLabel}>Feb</Text>
            <Text style={styles.chartLabel}>Mar</Text>
            <Text style={styles.chartLabel}>Apr</Text>
            <Text style={styles.chartLabel}>May</Text>
          </View>
        </View>
        
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>By Game Type</Text>
          </View>
          
          {gameTypeStats.map((stat, index) => (
            <View key={index} style={styles.performanceItem}>
              <Text style={styles.performanceName}>{stat.name}</Text>
              <Text style={[styles.performanceValue, stat.isPositive ? styles.positive : styles.negative]}>
                {stat.profit}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>By Venue</Text>
          </View>
          
          {venueStats.map((stat, index) => (
            <View key={index} style={styles.performanceItem}>
              <Text style={styles.performanceName}>{stat.name}</Text>
              <Text style={[styles.performanceValue, stat.isPositive ? styles.positive : styles.negative]}>
                {stat.profit}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.taxReportCard}>
          <Text style={styles.taxReportIcon}>📄</Text>
          <Text style={styles.taxReportTitle}>Year-End Tax Report</Text>
          <Text style={styles.taxReportDescription}>Generate a comprehensive profit/loss statement for tax filing purposes</Text>
          <TouchableOpacity style={styles.taxReportButton}>
            <Text style={styles.taxReportButtonText}>Generate PDF Report</Text>
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
  mainContent: {
    flex: 1,
    padding: 15,
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 20,
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
  statsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#e6c700',
    opacity: 0.8,
  },
  chartContainer: {
    height: 200,
    backgroundColor: 'rgba(230, 199, 0, 0.1)',
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 10,
  },
  chartGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    height: '70%',
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartLabel: {
    fontSize: 12,
    color: '#e6c700',
    opacity: 0.8,
  },
  performanceCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 199, 0, 0.1)',
  },
  performanceName: {
    fontSize: 16,
    color: '#e6c700',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  taxReportCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  taxReportIcon: {
    fontSize: 36,
    marginBottom: 10,
    color: '#e6c700',
  },
  taxReportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
    marginBottom: 10,
  },
  taxReportDescription: {
    fontSize: 14,
    color: '#e6c700',
    marginBottom: 15,
    opacity: 0.9,
    textAlign: 'center',
  },
  taxReportButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e6c700',
    borderRadius: 5,
  },
  taxReportButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a3b0a',
  },
});

export default AnalyticsScreen;
