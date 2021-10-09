import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    Button
} from 'react-native';

const GuideBooking2 = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>Guide Booking 2 Page</Text>
        <Button title="guide booking 3" onPress={() => navigation.navigate('GuideBooking3')}/>
    </SafeAreaView>
    )
};

export default GuideBooking2;
