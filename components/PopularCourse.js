// components/PopularCourse.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const PopularCourse = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageInner}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 10,
  },
  imageInner: {
    borderRadius: 12,
  },
  title: {
    color: '#111418',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#60758a',
    fontSize: 12,
  },
});

export default PopularCourse;