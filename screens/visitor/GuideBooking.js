import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    Button
} from 'react-native';

const GuideBooking = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>Guide Booking 1 Page</Text>
        <Button title="Guide booking" onPress={() => navigation.navigate('TourBooking3')}/>
    </SafeAreaView>
    )
};

export default GuideBooking;
