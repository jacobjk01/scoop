import React, {useState, useEffect} from 'react'
import { Text, View, Button } from 'react-native'
import { signIn, signOut, onAuthStateChanged } from '../api/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { changeUsername, getUser } from '../api/users';

export default function Test() {
    const [signInStatus, setSignInStatus] = useState(false);
    const [signInProgress, setSignInProgress] = useState(false);
    const [user, setUser] = useState(null);
    const [userAuth, setUserAuth] = useState(null);
    const [userType, setUserType] = useState('currently userType is not set')
    
    useEffect(() => {
        var unsubscribe = onAuthStateChanged(user => {
            if (user) {
                setUserAuth(user);
            } else {
                setUserAuth(null);
            }
        })
        return () => {
            unsubscribe();
        }
    })
    

    return (
        <View style={{paddingTop:100}}>
            {/* <Text>{signInStatus ? 'Signed In' : 'No Account detected'}</Text> */}
            <Text>{userAuth ? userAuth.email : 'No User'}</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    await signIn().catch(err => {
                        console.log(err)
                    })
                }}
                disabled={userAuth ? true : false}
                />
                <Button 
                    title="Sign Out"
                    onPress={()=> {
                        signOut();
                }}
                    disabled={!userAuth}
                />
                <Button 
                    title="Change username"
                    onPress={async () => {
                        const user = await changeUsername(userAuth.uid, "other");
                        console.log(user)
                }}
                />

                <Button title="get public value firestore"
                onPress={async () => {
                    if (!userAuth) {
                        setUserType('currentUser is not detected')
                    } else {
                        try {
                            const user = await getUser(userAuth);
                            console.log(user)
                            if (user._data) {
                                setUserType(user._data.type);
                            } else {
                                console.error('something is wrong')
                            }
                        } catch(err) {
                            console.error(err)
                        }
                    }
                }}/>
                <Text>From firestore database: {userType}</Text>
        </View>
    )
}
