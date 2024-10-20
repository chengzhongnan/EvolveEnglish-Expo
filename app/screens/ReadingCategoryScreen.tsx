import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import CardComponent from '@/components/ReadingCategoryCard';
import { getMaterialConfigs } from '../api/api';
import { useRouter } from 'expo-router'; // 导入 useRouter

type CardData = {
    name: string;
    image: string;
}

export default function ReadingCategoryScreen() {
    const [configs, setConfigs] = useState<CardData[]>([]);

    useEffect(() => {
      const fetchConfigs = async () => {
        const data = await getMaterialConfigs();
        setConfigs(data.types);
      };
  
      fetchConfigs();
    }, []);

    const router = useRouter(); // 使用 useRouter 钩子

    const handleQuizNavigation = async (name: string) => {
        // 随机从数据库中获取一个问题，并导航到 QuizScreen 页面
        const randId = Math.random() * 1000 >> 0;
        router.push({
            pathname: '/screens/QuizScreen',
            params: { name, id: randId } // 传递 name 和 randId 参数
        });
    };

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth / 2) - 20; // 每个卡片占屏幕宽度的一半，减去一些间距

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Hi, what would you like to read today?</Text>
            </View>
            <View style={styles.cardGrid}>
                {configs ? configs.map((card, index) => (
                    <View key={index} style={[styles.cardWrapper, { width: cardWidth }]}>
                        <CardComponent title={card.name} image={card.image} onPress={handleQuizNavigation} />
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
