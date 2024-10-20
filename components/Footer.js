// components/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <FooterButton icon="🏠" label="Home" />
      <FooterButton icon="📚" label="Courses" />
      <FooterButton icon="📈" label="My progress" />
      <FooterButton icon="👤" label="Profile" />
    </View>
  );
};

const FooterButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f0f2f5',
    paddingVertical: 10,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#60758a',
  },
});

export default { Footer, FooterButton };