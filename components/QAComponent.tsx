// app/components/QnAComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type QnAComponentProps = {
  questions: QuizQuestion[];
  answers: { [key: string]: string };
  onSelect: (questionId: string, optionId: string) => void;
};

type QuestionOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuestionOption[];
  answer: string
}

const QAComponent: React.FC<QnAComponentProps> = ({ questions, answers, onSelect }) => {
  return (
    <View style={styles.container}>
      {questions.map((q) => (
        <View key={q.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{q.question}</Text>
          {q.options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionContainer,
                answers[q.id] === opt.id && styles.selectedOption,
              ]}
              onPress={() => onSelect(q.id, opt.id)}
            >
              <View style={styles.radioButton}>
                {answers[q.id] === opt.id && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionText}>{opt.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    color: '#111418',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row', // 修改为 'row' 以将元素从左到右排列
    alignItems: 'center',
    gap: 16, // 如果使用 'gap'，请确保在React Native的版本中支持
    padding: 12,
    borderWidth: 1,
    borderColor: '#dbe0e6',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#111418',
    backgroundColor: '#f0f0f0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dbe0e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111418',
  },
  optionText: {
    color: '#111418',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QAComponent;
