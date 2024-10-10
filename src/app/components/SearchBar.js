// SearchBar.js
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SearchBar = ({query, setQuery, handleSearch}) => {
    const [inputValue, setInputValue] = useState(query);

    const clearSearch = () => {
        setInputValue('');
        setQuery('');
        handleSearch('');
    };

    return (
        <View style={styles.container}>
            <Icon name="search1" size={20}/>
            <TextInput
                style={styles.searchBar}
                placeholder="Search computer..."
                autoCorrect={false}
                autoCapitalize="none"
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    setQuery(text);
                    handleSearch(text);
                }}
            />
            {inputValue ? (
                <TouchableOpacity onPress={clearSearch}>
                    <Icon name="delete" size={20}/>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: 240,
        margin: 'auto',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
    },
    clearIcon: {
        width: 20,
        height: 20,
    },
});

export default SearchBar;