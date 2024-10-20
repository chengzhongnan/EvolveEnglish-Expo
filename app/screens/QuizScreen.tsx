import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import QuizComponent from '@/components/QuizComponent';

import { useRoute } from '@react-navigation/native';
import { getReadingMaterial } from '../api/api';

export default function QuizScreen() {

  const route: any = useRoute();
  const name = route.params.name; // 获取传递的参数
  const id = route.params.id;

  type QuizQuestion = Parameters<typeof QuizComponent>[0]['questions'];
  
  const [questionData, setQuestionData] = useState<QuizQuestion>([])
  const [articleContent, setArticleContent] = useState('')
  const [translateContent, setTranslateContent] = useState('')

  const convertQuestionData = (article: Awaited<ReturnType<typeof getReadingMaterial>>): QuizQuestion => {
    const questions = article.material.questions;
    const results: QuizQuestion = [];

    for (let q of questions) {
      results.push({
        id: (results.length + 1).toString(),
        question: q.question,
        options: q.option.map(o => ({ id: o.name, text: o.content })),
        answer: q.answer
      })
    }

    return results;
  }

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getReadingMaterial(name, id);
      setArticleContent(article.material.contents);
      setTranslateContent(article.material.translate);
      setQuestionData(convertQuestionData(article));
    };

    setQuestionData([]);
    fetchArticle();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {articleContent ? (<QuizComponent id={id} name={name} content={articleContent} translate={translateContent} questions={questionData}/>) 
      : (<p>Loading ...</p>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
});