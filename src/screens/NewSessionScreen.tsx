import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewSessionScreen = () => {
  const navigation = useNavigation();
  const [sessionData, setSessionData] = useState({
    venue: '',
    gameType: '',
    buyIn: '',
    cashOut: '',
    startTime: new Date(),
    endTime: null,
    notes: '',
  });

  // Placeholder data for game types
  const gameTypes = [
    { id: '1', name: '$1/$2 No Limit Hold\'em' },
    { id: '2', name: '$2/$5 No Limit Hold\'em' },
    { id: '3', name: '$5/$10 No Limit Hold\'em' },
    { id: '4', name: '$1/$2 Pot Limit Omaha' },
    { id: '5', name: '$1/$3 No Limit Hold\'em' },
  ];

  const handleInputChange = (field, value) => {
    setSessionData({
      ...sessionData,
      [field]: value,
    });
  };

  const handleSaveSession = () => {
    // Here we would save the session data to Redux/database
    console.log('Saving session:', sessionData);
    
    // Navigate back to the dashboard or sessions screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Venue Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Venue Type</Text>
            <View style={styles.venueTypeContainer}>
              <TouchableOpacity style={[styles.venueTypeButton, styles.venueTypeButtonActive]}>
                <Text style={[styles.venueTypeText, styles.venueTypeTextActive]}>Live Venue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.venueTypeButton}>
                <Text style={styles.venueTypeText}>Home Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.venueTypeButton}>
                <Text style={styles.venueTypeText}>Online</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Venue Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter venue name"
              placeholderTextColor="rgba(230, 199, 0, 0.5)"
              value={sessionData.venue}
              onChangeText={(text) => handleInputChange('venue', text)}
            />
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Game Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Game Type</Text>
            <View style={styles.gameTypeContainer}>
              {gameTypes.map((game) => (
                <TouchableOpacity 
                  key={game.id}
                  style={[
                    styles.gameTypeButton,
                    sessionData.gameType === game.name ? styles.gameTypeButtonActive : null
                  ]}
                  onPress={() => handleInputChange('gameType', game.name)}
                >
                  <Text 
                    style={[
                      styles.gameTypeText,
                      sessionData.gameType === game.name ? styles.gameTypeTextActive : null
                    ]}
                  >
                    {game.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Financial Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Buy-in Amount ($)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter buy-in amount"
              placeholderTextColor="rgba(230, 199, 0, 0.5)"
              keyboardType="numeric"
              value={sessionData.buyIn}
              onChangeText={(text) => handleInputChange('buyIn', text)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cash-out Amount ($)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter cash-out amount"
              placeholderTextColor="rgba(230, 199, 0, 0.5)"
              keyboardType="numeric"
              value={sessionData.cashOut}
              onChangeText={(text) => handleInputChange('cashOut', text)}
            />
          </View>
          
          <View style={styles.profitContainer}>
            <Text style={styles.profitLabel}>Profit/Loss:</Text>
            <Text style={styles.profitAmount}>
              {sessionData.buyIn && sessionData.cashOut
                ? `$${(parseFloat(sessionData.cashOut) - parseFloat(sessionData.buyIn)).toFixed(2)}`
                : '$0.00'}
            </Text>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Notes</Text>
          
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            placeholder="Enter session notes (optional)"
            placeholderTextColor="rgba(230, 199, 0, 0.5)"
            multiline
            numberOfLines={4}
            value={sessionData.notes}
            onChangeText={(text) => handleInputChange('notes', text)}
          />
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveSession}
        >
          <Text style={styles.saveButtonText}>Save Session</Text>
        </TouchableOpacity>
      </View>
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
  formSection: {
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
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#e6c700',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.3)',
    borderRadius: 5,
    padding: 12,
    color: '#e6c700',
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  venueTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  venueTypeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.3)',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  venueTypeButtonActive: {
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderColor: '#e6c700',
  },
  venueTypeText: {
    color: 'rgba(230, 199, 0, 0.7)',
    fontSize: 14,
  },
  venueTypeTextActive: {
    color: '#e6c700',
    fontWeight: 'bold',
  },
  gameTypeContainer: {
    flexDirection: 'column',
  },
  gameTypeButton: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(230, 199, 0, 0.3)',
    marginBottom: 8,
    borderRadius: 5,
  },
  gameTypeButtonActive: {
    backgroundColor: 'rgba(230, 199, 0, 0.2)',
    borderColor: '#e6c700',
  },
  gameTypeText: {
    color: 'rgba(230, 199, 0, 0.7)',
    fontSize: 14,
  },
  gameTypeTextActive: {
    color: '#e6c700',
    fontWeight: 'bold',
  },
  profitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    padding: 12,
    marginTop: 10,
  },
  profitLabel: {
    fontSize: 16,
    color: '#e6c700',
  },
  profitAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6c700',
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 199, 0, 0.3)',
  },
  saveButton: {
    backgroundColor: '#e6c700',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#0a3b0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewSessionScreen;
