import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubscriptionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.subtitle}>Upgrade to Premium</Text>
      <Text style={styles.description}>
        Get unlimited access to all features by upgrading to our premium plan.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default SubscriptionScreen;
