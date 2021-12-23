import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';

const SelectSchool = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>Select School Page</Text>
        <Button title='view tour' onPress={() => navigation.navigate('HomeVisitor')} />
    </SafeAreaView>
    )
};

export default SelectSchool;
