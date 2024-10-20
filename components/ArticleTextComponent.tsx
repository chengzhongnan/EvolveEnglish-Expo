import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';

type ArticleTextComponentProps = {
    text: string
    textStyle: object
}

const ArticleTextComponent = (props: ArticleTextComponentProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleMenuItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={handleLongPress}>
        <Text style={props.textStyle}>{props.text}</Text>
      </TouchableOpacity>

      {/* 自定义菜单 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable onPress={() => handleMenuItemPress('Option 1')}>
              <Text style={styles.menuItem}>Option 1</Text>
            </Pressable>
            <Pressable onPress={() => handleMenuItemPress('Option 2')}>
              <Text style={styles.menuItem}>Option 2</Text>
            </Pressable>
            <Pressable onPress={() => handleMenuItemPress('Option 3')}>
              <Text style={styles.menuItem}>Option 3</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111418',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  menuItem: {
    padding: 10,
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ArticleTextComponent;