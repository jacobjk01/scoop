import React, { useContext } from 'react'
import { signIn } from 'api/auth'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { UserContext } from 'contexts';

export default function SigninButton(){
    const {userAuth} = useContext(UserContext);
    return <GoogleSigninButton
    style={{ width: '100%', height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={async () => {
        await signIn().catch(err => {
            console.log(err)
        })
    }}
    disabled={userAuth ? true : false}
    />
}