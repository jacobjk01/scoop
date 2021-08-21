import React, {useState, useEffect} from 'react'
import { Text, View } from 'react-native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        //this.setState({ userInfo });
    } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
    } else {
        // some other error happened
    }
    }
};
const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    //this.setState({ isLoginScreenPresented: !isSignedIn });
};

export default function Test() {
    const [signInStatus, setSignInStatus] = useState(isSignedIn());
    GoogleSignin.configure();

    return (
        <View style={{paddingTop:100}}>
            <Text>{signInStatus ? 'You are signed in' : 'No Account detected'}</Text>
        </View>
    )
}
