import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: 'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                style={styles.backgroundImage}/>
            <Text style={styles.text}>Simplifiez la gestion de vos PC.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.buttonText}>Let's Go!</Text>
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 64,
        leading: 71,
        position: "absolute",
        display: "flex",
        top: 80,
        margin: 24,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        margin: 24,
        position: "absolute",
        display: "flex",
        bottom: 80,
        width: 330,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 18,
    },
});