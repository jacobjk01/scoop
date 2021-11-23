import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    Button
} from 'react-native';

const GuideBooking1 = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>Guide Booking 1 Page</Text>
        <Button title='Guide booking 2' onPress={() => navigation.navigate('GuideBooking2')}/>
    </SafeAreaView>
    )
};

export default GuideBooking1;
