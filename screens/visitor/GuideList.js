import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';

const GuideList = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>Guide List Page</Text>
        <Button title='guide profile' onPress={() => navigation.navigate('GuideProfile')}/>
    </SafeAreaView>
    )
};

export default GuideList;
