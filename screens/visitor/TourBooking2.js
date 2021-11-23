import React, {useState} from 'react';
import {
    Text,
    Button,
    SafeAreaView,
} from 'react-native';

const TourBooking2 = ({navigation}) => {

    return (
    <SafeAreaView>
        <Text>tour Booking 2 Page</Text>
        <Button title='tour booking 2' onPress={() => navigation.navigate('TourBooking3')}/>
    </SafeAreaView>
    )
};

export default TourBooking2;
