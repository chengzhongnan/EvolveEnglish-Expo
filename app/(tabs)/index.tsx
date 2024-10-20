// app/(tabs)/HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // 导入 useRouter
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import Header from '../../components/Header';
import FeatureCard from '../../components/FeatureCard';
import PopularCourse from '../../components/PopularCourse';

export default function HomeScreen() {
  const [hasNotice, setNotice] = useState(false);

  const router = useRouter(); // 使用 useRouter 钩子

  const handleQuizNavigation = () => {
    router.push('/screens/ReadingCategoryScreen');
  };

  return (
    <View style={styles.container}>
      {hasNotice ? <Header /> : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={{ uri: 'https://pub-3294fa67962142329433e7edea572259.r2.dev/619d0891-f60e-4724-b599-e95ac54b2a9c.png' }}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Learn English with AI</Text>
            <Text style={styles.bannerSubtitle}>Start your learning journey now</Text>
          </View>
        </ImageBackground>

        <View style={styles.featureContainer}>
          <FeatureCard
            title="单词学习"
            description="学习新的单词和短语"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/e8df879f-7354-4688-963b-ff07b5bc4705.png"
          />
          <FeatureCard
            title="选择填空"
            description="测试单词的理解程度"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/bafc9d4a-5176-4da4-83bc-fb7b50b973aa.png"
          />
          <FeatureCard
            title="阅读理解"
            description="阅读文章回答问题"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/ac9e1fe6-0260-4a8c-b3c4-0d1904130d24.png"
            onPress={handleQuizNavigation}
          />
          
        </View>

        <Text style={styles.popularCoursesTitle}>Popular courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PopularCourse
            title="English: Intermediate"
            description="Course · 10 lessons"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/f3f81377-06a6-4c6a-ac51-de004be1da7b.png"
          />
          <PopularCourse
            title="Advanced English"
            description="Course · 20 lessons"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/322bbf1b-b9c4-4183-8d9e-05b5e15503ef.png"
          />
          <PopularCourse
            title="Business English"
            description="Course · 15 lessons"
            imageUrl="https://pub-3294fa67962142329433e7edea572259.r2.dev/eb519062-ae08-4147-9e90-76e492100189.png"
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  banner: {
    minHeight: 480,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    borderRadius: 16,
  },
  bannerContent: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  featureContainer: {
    marginTop: 15,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  popularCoursesTitle: {
    padding: 16,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
