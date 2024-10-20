// app/components/FeatureCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

type FeatureCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  onPress?: () => void; // 添加 onPress 属性
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 2, // Android 阴影
    shadowColor: '#000', // iOS 阴影
    shadowOffset: { width: 0, height: 2 }, // iOS 阴影
    shadowOpacity: 0.25, // iOS 阴影
    shadowRadius: 3.84, // iOS 阴影
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111418',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#60758a',
  },
});

export default FeatureCard;
