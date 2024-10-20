// app/components/ArticleComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArticleTextComponent from './ArticleTextComponent';

type ArticleComponentProps = {
  title: string;
  content: string[];
};

const ArticleComponent: React.FC<ArticleComponentProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <ArticleTextComponent textStyle={styles.title} text={title} />
      {content.map((para, index) => (para.length > 0 ?
        <ArticleTextComponent key={index} textStyle={styles.paragraph} text={para} /> : null
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: '#111418',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 12,
    paddingTop: 20,
  },
  paragraph: {
    color: '#111418',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    paddingBottom: 12,
    paddingTop: 4,
  },
});

export default ArticleComponent;
