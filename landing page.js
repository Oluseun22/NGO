// LandingPage.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VolunteerBridge</Text>
      <Button 
        title="NGO Admin Portal" 
        onPress={() => navigation.navigate('AdminAuth')} 
      />
      <View style={{ marginVertical: 10 }}/>
      <Button 
        title="Volunteer Portal" 
        onPress={() => navigation.navigate('UserAuth')} 
      />
    </View>
  );
}