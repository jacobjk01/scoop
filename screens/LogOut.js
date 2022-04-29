import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import {black, gray, white, primary} from '../config/colors';
import BackButton from 'components/BackButton';
import SigninButton from 'components/SigninButton';
import SignoutButton from 'components/SignoutButton';

const LogOut = ({navigation}) => {
    const divider = () => {
        return (
            <View
                style={{width: '100%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 10}}
            >
                <View style={{...styles.line}}/>
                <Text
                    style={{fontSize: 12, color: primary}}
                >
                    or
                </Text>
                <View style={{...styles.line}}/>
            </View>
        )
    }
    return(
        <SafeAreaView style={{backgroundColor: white, height: '100%', width: '100%'}}>
            <ScrollView>
                {/* <BackButton navigation={navigation}/> */}
                <View style={{marginLeft: 'auto', marginRight: 'auto',width: '60%',marginHorizontal: 30, marginTop: 100, marginBottom: 30}}>
                    <Text style={{textAlign: 'center',marginTop: '40%', marginBottom: 50, fontSize: 18, fontFamily:'Helvetica-Bold'}}>
                        Sign In
                    </Text>                    
                    <SigninButton ></SigninButton>
                    
                    {divider()}

                    <TouchableOpacity
                    style={{...styles.button, marginBottom: 20}}
                    onPress={() => {
                        setMode('visitor');
                        navigation.navigate('OnboardingVisitor')
                    }}
                >
                    <Text style={{color: primary, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 15}}>
                        Add a Tour Guide Account
                    </Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 45,
        backgroundColor: white,
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 10,
    },
    line: {
        width: '35%',
        height: 1,
        borderRadius: 1,
        backgroundColor: primary,
    }
})
export default LogOut