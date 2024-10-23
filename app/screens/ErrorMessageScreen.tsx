import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type ErrorMessageScreenRouteProp = RouteProp<{ ErrorMessageScreen: { errorMessage: string, name: string } }, 'ErrorMessageScreen'>;

export default function ErrorMessageScreen() {
    const route = useRoute<ErrorMessageScreenRouteProp>();

    const errorMessage = route.params.errorMessage;
    const navigation = useNavigation();

    const handleGoBack = () => {
        // 返回到之前的页面
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.errorTitle}>An Error Occurred</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button title="Go Back" onPress={handleGoBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'red',
    },
    errorMessage: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
});

