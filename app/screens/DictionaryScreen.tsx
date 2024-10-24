import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // 导入 useRouter

import { getWordsRandom } from '../api/api';

import WordTranslationComponent from '@/components/WordTranslationComponent';
import CommonPhrasesComponent from '@/components/CommonPhrasesComponent';

interface WordTranslation {
    translation: string,
    type: string
}

interface WordPhrase {
    phrase: string,
    translation: string
}

interface WordDetail {
    id: number,
    word: string,
    level: string,
    phrases: WordPhrase[],
    translations: WordTranslation[]
}

type getWordsRandomItemType = Awaited<ReturnType<typeof getWordsRandom>>[0]

export default function DictionaryScreen() {

    const route: any = useRoute();
    const id = route.params.id;
    const type = route.params.type;

    const [mainWord, setMainWord] = useState('');
    const [translates, setTranslates] = useState<WordTranslation[]>([]);
    const [phrases, setPhrases] = useState<WordPhrase[]>([]);

    const [wordIndex, setWordIndex] = useState(0);

    const [wordList, setWordList] = useState<WordDetail[]>([]);

    const base64ToText = (base64String: string): string => {
        // 解码 base64 字符串为二进制字符串
        const binaryString = atob(base64String);
        
        // 将二进制字符串转换为 UTF-8 文本
        const text = decodeURIComponent(escape(binaryString));
        
        return text;
      }

    const decodeWords = (wordItem: getWordsRandomItemType): WordDetail => {
        const phrases = base64ToText(wordItem.phrases);
        const translations = base64ToText(wordItem.translations);

        return {
            id: wordItem.id,
            word: wordItem.word,
            level: wordItem.level,
            phrases: JSON.parse(phrases),
            translations: JSON.parse(translations)
        };
    }

    const fetchRandomWords = useCallback(
        async() => {
            const words = await getWordsRandom(id, 10);
            const decode_words = words.map(x => decodeWords(x));

            setWordList(decode_words);
    
            const firstWord = decode_words[0];

            setMainWord(firstWord.word)
            setTranslates(firstWord.translations);
            setPhrases(firstWord.phrases);
            setWordIndex(0);
    
            console.log(decode_words);
        }, []
    ) 

    const fetchRangeWords = useCallback( async() => {

    }, [])

    useEffect(() => {
        if (type === 'random') {
            fetchRandomWords();
        } else {
            fetchRangeWords();
        }
    }, [type, fetchRandomWords, fetchRangeWords]);

    // 这里可以添加词典数据和导航逻辑
    const handlePrevious = () => {
        // 处理前一个单词
        console.log('Navigate to previous word');
        let index = wordIndex;
        if (wordIndex - 1 >= 0) {
            index -= 1;
            setWordIndex(index);
            const word = wordList[index];
            setMainWord(word.word);
            setTranslates(word.translations);
            setPhrases(word.phrases);
        }
    };

    const handleNext = () => {
        // 处理后一个单词
        console.log('Navigate to next word');
        let index = wordIndex;
        if (index + 1 < wordList.length) {
            index += 1;
            setWordIndex(index);
            const word = wordList[index];
            setMainWord(word.word);
            setTranslates(word.translations);
            setPhrases(word.phrases);
        }
    };

    const handleQuiz = () => {
        // 处理测验功能
        console.log('Start quiz');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 关闭按钮 */}
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* 进度条 */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            {/* 主要内容 */}
            <View style={styles.content}>
                <Text style={styles.word}>{mainWord}</Text>

                <WordTranslationComponent translates={translates}></WordTranslationComponent>

                <CommonPhrasesComponent phrases={phrases} pageSize={5}></CommonPhrasesComponent>
            </View>

            {/* 导航按钮 */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={[styles.navButton, styles.prevButton]}
                    onPress={handlePrevious}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, styles.nextButton]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* 测验按钮 */}
            <TouchableOpacity
                style={styles.quizButton}
                onPress={handleQuiz}
            >
                <Text style={styles.quizButtonText}>Quiz</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    closeButton: {
        padding: 15,
    },
    closeButtonText: {
        fontSize: 24,
    },
    progressContainer: {
        height: 4,
        backgroundColor: 'white',
        marginHorizontal: 15,
    },
    progressBar: {
        width: '30%',
        height: '100%',
        backgroundColor: '#FF00FF',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    word: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    section: {
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    definition: {
        fontSize: 18,
        lineHeight: 24,
    },
    phrase: {
        fontSize: 18,
        lineHeight: 28,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    navButton: {
        padding: 15,
        borderRadius: 8,
        width: '48%',
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    prevButton: {
        backgroundColor: '#E5E7EB',  // 略深的灰色背景
        borderWidth: 1,
        borderColor: '#D1D5DB',  // 添加边框
    },
    nextButton: {
        backgroundColor: '#F3F4F6',  // 略浅的灰色背景
        borderWidth: 1,
        borderColor: '#E5E7EB',  // 添加边框
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    quizButton: {
        margin: 15,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        alignItems: 'center',
    },
    quizButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});