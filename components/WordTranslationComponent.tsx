import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 类型定义
interface Translate {
  translation: string;
  type: string;
}

interface TypeBadgeProps {
  type: string;
}

interface TranslateItemProps extends Translate {}

interface TranslateSectionProps {
    translates: Translate[];
}

// 词性标签组件
const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => (
  <View style={styles.typeBadge}>
    <Text style={styles.typeText}>{type}</Text>
  </View>
);

// 单个释义条目组件
const WordTranslationItemComponent: React.FC<TranslateItemProps> = ({ type, translation }) => (
  <View style={styles.definitionItem}>
    <TypeBadge type={type} />
    <Text style={styles.translationText}>{translation}</Text>
  </View>
);

// 主要的释义部分组件
const WordTranslationComponent: React.FC<TranslateSectionProps> = ({ translates }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>释义：</Text>
      <View style={styles.definitionsList}>
        {translates.map((translate, index) => (
          <WordTranslationItemComponent
            key={`${translate.type}-${index}`}
            type={translate.type}
            translation={translate.translation}
          />
        ))}
      </View>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  definitionsList: {
    gap: 12,
  },
  definitionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  typeBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    color: '#1F2937',
  },
});

export default WordTranslationComponent;