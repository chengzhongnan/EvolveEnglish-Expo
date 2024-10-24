import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // 导入 useRouter

export default function LearningWordScreen() {

    const route: any = useRoute();
    const id = route.params.id;

    const router = useRouter();

    const handleSequentialLearning = () => {
        // 跳转到 Sequential Learning 页面
        console.log('顺序学习：' + id)
    };

    const handleRandomLearning = () => {
        // 跳转到 Random Learning 页面
        console.log('随机学习：'  + id)
        router.push({
            pathname: '/screens/DictionaryScreen',
            params: {
                id: id,
                type: 'random'
            }
        })
    };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Learn</Text>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>How would you like to learn?</Text>
            
            <TouchableOpacity style={styles.sequentialButton} onPress={handleSequentialLearning}>
              <Text style={styles.sequentialButtonText}>Sequential Learning</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.randomButton} onPress={handleRandomLearning}>
              <Text style={styles.randomButtonText}>Random Learning</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    searchButton: {
      padding: 8,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 40,
    },
    sequentialButton: {
      backgroundColor: '#007AFF',
      borderRadius: 25,
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    sequentialButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '500',
    },
    randomButton: {
        backgroundColor: '#007AFF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    randomButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
  });