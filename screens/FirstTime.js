import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'
import {GoogleSigninButton} from  '@react-native-google-signin/google-signin';
import {signOut, signIn} from '../api/auth';
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
                Choose mode.
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

            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    await signIn().catch(err => {
                        console.log(err)
                    })
                }}
                // disabled={userAuth ? true : false}
                />
                <Button
                    title="Sign Out"
                    onPress={async ()=> {
                        await signOut();
                }}
                    // disabled={!userAuth}
                />
        </SafeAreaView>
    )
}
