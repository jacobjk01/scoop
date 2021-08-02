import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ImageBackground} from 'react-native';


const Booking = ({navigation}) => {
    return(
        <SafeAreaView>
            <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: "100%"}}>
                <Text style={styles.titleText}>Booking</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Checkout')}
                style={{flex: 1, alignSelf: "center", height: 20, backgroundColor: '#3D68CC'}}>
                    <Text>Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Helvetica"
    },
    titleText: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 50
    },
})

export default Booking;