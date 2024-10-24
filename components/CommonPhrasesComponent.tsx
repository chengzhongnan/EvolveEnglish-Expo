import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 类型定义
interface Phrase {
  phrase: string;
  translation: string;
}

interface CommonPhrasesComponentProps {
  phrases: Phrase[];
  pageSize?: number;
}

const CommonPhrasesComponent: React.FC<CommonPhrasesComponentProps> = ({ 
  phrases, 
  pageSize = 5  // 默认每页显示5条
}) => {
  // 状态管理
  const [currentPage, setCurrentPage] = useState(0);

  // 计算总页数
  const totalPages = Math.ceil(phrases.length / pageSize);

  // 获取当前页的短语
  const currentPhrases = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return phrases.slice(start, end);
  }, [currentPage, phrases, pageSize]);

  // 页面导航函数
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // 单个短语项组件
  const PhraseItem: React.FC<Phrase> = ({ phrase, translation }) => (
    <View style={styles.phraseItem}>
      <View style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
      </View>
      <View style={styles.phraseContent}>
        <Text style={styles.phraseText}>{phrase}</Text>
        <Text style={styles.translationText}>{translation}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Common phrases</Text>
      
      <View style={styles.phrasesList}>
        {currentPhrases.map((item, index) => (
          <PhraseItem
            key={`${item.phrase}-${index}`}
            phrase={item.phrase}
            translation={item.translation}
          />
        ))}
      </View>

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity 
            style={[
              styles.pageButton,
              currentPage === 0 && styles.pageButtonDisabled
            ]}
            onPress={handlePrevPage}
            disabled={currentPage === 0}
          >
            <Text style={[
              styles.pageButtonText,
              currentPage === 0 && styles.pageButtonTextDisabled
            ]}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            {currentPage + 1} / {totalPages}
          </Text>

          <TouchableOpacity 
            style={[
              styles.pageButton,
              currentPage === totalPages - 1 && styles.pageButtonDisabled
            ]}
            onPress={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <Text style={[
              styles.pageButtonText,
              currentPage === totalPages - 1 && styles.pageButtonTextDisabled
            ]}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  phrasesList: {
    gap: 12,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletPoint: {
    width: 20,
    alignItems: 'center',
  },
  bullet: {
    fontSize: 16,
    color: '#4B5563',
  },
  phraseContent: {
    flex: 1,
  },
  phraseText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 16,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
  },
  pageButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  pageButtonTextDisabled: {
    color: '#9CA3AF',
  },
  pageInfo: {
    fontSize: 14,
    color: '#4B5563',
  },
});

export default CommonPhrasesComponent;