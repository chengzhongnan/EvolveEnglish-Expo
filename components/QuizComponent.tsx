// app/components/QuizComponent.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import ArticleComponent from './ArticleComponent';
import QAComponent from './QAComponent';

type QuizQuestions = Parameters<typeof QAComponent>[0]['questions'];

type QuizComponentProps = {
  id: number;
  title?: string;
  name: string;
  content: string;
  translate: string;
  questions: QuizQuestions
};

const QuizComponent: React.FC<QuizComponentProps> = (props: QuizComponentProps) => {
  const articleTitle = props.title || props.name + ' ' + props.id;
  const articleContent = props.content.split(/\r\n|\n|\r/);

  const questions = props.questions;

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    // 在此处处理提交逻辑，例如发送到服务器或进行验证
    // 这里简单地显示一个提示
    Alert.alert('Submit', 'Your answers have been submitted.');
    console.log('User Answers:', answers);
  };

  return (
    <View style={styles.container}>
      <ArticleComponent title={articleTitle} content={articleContent} />
      <QAComponent questions={questions} answers={answers} onSelect={handleSelect} />
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit} color="#0d7cf2" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    padding: 16,
  },
});

export default QuizComponent;
