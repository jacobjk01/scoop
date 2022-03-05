import React, { useContext, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from 'contexts'
import SigninButton from 'components/SigninButton';
import SignoutButton from 'components/SignoutButton';
import {titleText, graySmallText, mediumBold, largeBoldText, linearGrad} from '../config/typography.js'
import {black, grayDark, grayLight, grayMed, white, primary} from '../config/colors';
export default  ({navigation}) => {
    const {mode, setMode} = useContext(UserContext);
    useEffect(() => {
        if (mode === 'visitor') {
            navigation.navigate('OnboardingVisitor')
        } else if (mode === 'guide') {
            navigation.navigate('OnboardingGuide')
        }
    })
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
    return (
        <SafeAreaView style={{height: '100%', width: '100%', backgroundColor: white}}>
            <View style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                <Text style={{...mediumBold, marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, color: black}}>
                    Welcome to Otour. 
                </Text>
                <TouchableOpacity
                    style={{...styles.button, marginBottom: 20}}
                    onPress={() => {
                        setMode('visitor');
                        navigation.navigate('OnboardingVisitor')
                    }}
                >
                    <Text style={{...mediumBold, color: white, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 15}}>
                        Visitor
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...styles.button}}
                    onPress={() => {
                        setMode('guide')
                        navigation.navigate('OnboardingGuide')
                    }} title='guide'
                >
                    <Text style={{...mediumBold,color: white, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 15}}>
                        Guide
                    </Text>
                </TouchableOpacity>
                {divider()}
                <SigninButton/>
            </View>
            {/* <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                //setFirstTimeOpen(false);
                //TODO: go to login account page
                }} 
                title='Already have an account'/> */}
            {/* <Button onPress={() => {
                navigation.navigate('Feedback')
            }} title='Feedback'/> */}
            <SignoutButton/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        backgroundColor: primary,
        borderRadius: 10,
    },
    line: {
        width: '35%',
        height: 1,
        borderRadius: 1,
        backgroundColor: primary,
    }
})
