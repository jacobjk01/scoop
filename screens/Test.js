import React, {useState, useEffect} from 'react'
import { Text, View, Button, Image } from 'react-native'
import { signIn, signOut, onAuthStateChanged } from '../api/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { changeIntro, changeUsername, getUser } from '../api/users';
import { HeaderTitle } from '@react-navigation/stack';

export default function Test() {
    const [signInStatus, setSignInStatus] = useState(false);
    const [signInProgress, setSignInProgress] = useState(false);
    const [user, setUser] = useState(null);
    const [userAuth, setUserAuth] = useState(null);
    const [userType, setUserType] = useState('currently userType is not set');
    const [userName, setUserName] = useState('currently userName is not set')
    const [userIntro, setUserIntro] = useState('currently userIntro is not set');
    
    
    useEffect(() => {
        var unsubscribe = onAuthStateChanged(async user => {
            if (user) {
                setUserAuth(user);
                const currentUser = await getUser(user);
                setUserType(currentUser.data().userType)
                setUserName(currentUser.data().username)
                setUserIntro(currentUser.data().intro)
            } else {
                setUserAuth(null);
            }
        })
        return () => {
            unsubscribe();
        }
    })
    

    return (
        <View style={{ paddingTop: 100 }}>
            {/* <Text>{signInStatus ? 'Signed In' : 'No Account detected'}</Text> */}
            <Text>{userAuth ? userAuth.email : 'No User'}</Text>
            {<Text>{userAuth ? 'Signed In' : 'No Account detected'}</Text>}
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
                <HeaderTitle>Welcome back, {userName}</HeaderTitle>
                <Button
                    title="Change username"
                    onPress={async () => {
                        if (await changeUsername(userAuth.uid, "Josh")) {
                            const user = await getUser(userAuth);
                            setUserName(user.data().username)
                            console.log("Username successfully changed")
                        } else {
                            console.log("There was an error in changing the username")
                        }
                }}
                />
                <View>
                    {userAuth ? <Image
                        style={{width: 100, height: 100}}
                        source={{uri: userAuth.photoURL}}/> : <></>}
                </View>
                <Text>{userIntro}</Text>
                <Button 
                    title="Change Intro"
                    onPress={async () => {
                        if (await changeIntro(userAuth.uid, "This is my bio!")) {
                            const user = await getUser(userAuth);
                            setUserIntro(user.data().intro)
                        }
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
                            if (user.data()) {
                                setUserType(user.data().type);
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
