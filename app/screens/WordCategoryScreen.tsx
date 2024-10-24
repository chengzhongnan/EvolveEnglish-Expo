import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import CardComponent from '@/components/ReadingCategoryCard';
import { getWordCategory } from '../api/api';
import { useRouter } from 'expo-router'; // 导入 useRouter

type CardData = {
    id: string;
    name: string;
    image: string;
}

export default function WordCategoryScreen() {
    const [configs, setConfigs] = useState<CardData[]>([]);
    const router = useRouter(); // 使用 useRouter 钩子

    useEffect(() => {
      const fetchConfigs = async () => {
        try {
            const data = await getWordCategory();
            setConfigs(data.map(x => ({
                id: x.id,
                name: x.level,
                image: x.image
            })));
        }
        catch(err: any) {
            console.log(err);
            router.push({
                pathname: '/screens/ErrorMessageScreen',
                params: {
                    errorMessage: err.message,
                }
            })
        }
      };
  
      fetchConfigs();
    }, []);

    const handleWordCategoryNavigation = async (cardData: CardData) => {
        router.push({
            pathname: '/screens/LearningWordScreen',
            params: { id: cardData.id }
        });
    };

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth / 2) - 20; // 每个卡片占屏幕宽度的一半，减去一些间距

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Hi, what would you like to study today?</Text>
            </View>
            <View style={styles.cardGrid}>
                {configs ? configs.map((card, index) => (
                    <View key={index} style={[styles.cardWrapper, { width: cardWidth }]}>
                        <CardComponent title={card.name} image={card.image} onPress={() => handleWordCategoryNavigation(card)} />
                    </View>
                )) : (<p>Loading configs...</p>)
            }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    header: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111418',
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // 保证每行的卡片平分空间
    },
    cardWrapper: {
        marginBottom: 10, // 卡片之间的间距
    },
});
