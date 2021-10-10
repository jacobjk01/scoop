import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'

export default  ({navigation}) => {
    const {mode, setMode} = useContext(UserContext);
    useEffect(() => {
        if (mode === 'visitor') {
            navigation.navigate('OnboardingVisitor')
        } else if (mode === 'guide') {
            navigation.navigate('OnboardingGuide')
        }
    })
    return (
        <SafeAreaView>
            <Text>
                Welcome to Otour. 
            </Text>
            <Text>
                Which of these best suit you?
            </Text>
            <Button onPress={() => {
                setMode('visitor');
                navigation.navigate('OnboardingVisitor')
            }} title='visitor'/>
            <Button onPress={() => {
                setMode('guide')
                navigation.navigate('OnboardingGuide')
            }} title='guide'/>
            <Button onPress={() => {
                //setFirstTimeOpen(false);
                //TODO: go to login account page
            }} title='Already have an account'/>
        </SafeAreaView>
    )
}
