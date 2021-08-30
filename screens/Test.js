import React, {useState, useEffect} from 'react'
import { Text, View, Button } from 'react-native'
import { signIn, isSignedIn, getCurrentUser, signOut, onAuthStateChanged } from '../api/auth';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { getUser } from '../api/users';
export default function Test() {
    const [signInStatus, setSignInStatus] = useState(false);
    const [signInProgress, setSignInProgress] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState('if you are recieving this message, you have not accessed the database')
    

    useEffect(() => {
        var unsubscribe = onAuthStateChanged(user2 => {
            console.log('auth state changed')
            if (user2) { //gets currentUser if logined in but currentUser is null
                console.log(user2.uid);
                getCurrentUser().then(user => {
                    console.log(user);
                    user.uid = user2.uid;
                    if (!user) {
                        setCurrentUser(user);
                    }
                }).catch(console.error)
            }
            
        })
        return () => {
            unsubscribe();
        }
    })
    

    return (
        <View style={{paddingTop:100}}>
            <Text>{signInStatus ? 'Signed In' : 'No Account detected'}</Text>
            <Text>{currentUser ? currentUser.user.email : 'No User'}</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                    setSignInProgress(true)
                    signIn().then(userInfo => {
                        setSignInProgress(false)
                        setSignInStatus(true)
                        setCurrentUser(userInfo)
                    }).catch(err => {
                        setSignInProgress(false)
                        console.log(err)
                    })
                }}
                disabled={signInProgress}
                />
                <Button 
                    title="Sign Out"
                    onPress={()=> {
                        signOut().then(() => {
                            return isSignedIn()
                        }).then((isSignedIn) => {
                            setSignInStatus(isSignedIn)
                            if (isSignedIn == false) {
                                setCurrentUser(null)
                            }
                        } )
                }}/>

                <Button title="get public value firestore"
                onPress={() => {
                    if (currentUser == null) {
                        setUserType('currentUser is not detected')
                    } else if (currentUser.uid == null) {
                        setUserType('uid is missing, please login')
                    } else {
                        getUser(currentUser.uid, (res) => {
                            setUserType(res._data.type);
                        })
                    }
                }}/>
                <Text>From firestore database: {userType}</Text>
        </View>
    )
}
