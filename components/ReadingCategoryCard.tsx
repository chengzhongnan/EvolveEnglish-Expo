import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

type ReadingCategoryComponentProps = {
    title: string;
    image: string;
    onPress: (name: string) => void
}

const CardComponent: React.FC<ReadingCategoryComponentProps> = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(title)} style={styles.cardContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#111418',
  },
});

export default CardComponent;