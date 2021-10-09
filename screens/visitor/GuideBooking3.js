import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    Button
} from 'react-native';

const GuideBooking3 = ({navigation, route}) => {
    const item = {item:'asdfasdf'}
    //TODO ^^^^^^^^^^^^^^^^^^^^^
    return (
    <SafeAreaView>
        <Text>Guide Booking 3 Page</Text>
        <Button title="BookingCheckout" onPress={() => navigation.navigate('BookingCheckout', {item})}/>
    </SafeAreaView>
    )
};

export default GuideBooking3;
