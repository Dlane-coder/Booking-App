import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Home() {
    return (
        <View style={StyleSheet.container}>
            <Image source={require('..assets/getitdone-logo.jpg')}
            style={StyleSheet.logo}
            resizeMode="contain"/>
            <Text style={styles.title}>Hey! Hey! Hey!</Text>
            <Text style={styles.subtitle}>Book your next appointment today</Text>
        

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});