import React, {useState, useEffect} from 'react'
import { Text, View, Button, Image } from 'react-native'
import { signIn, signOut, onAuthStateChanged } from '../api/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { changeIntro, changeUsername, getUser } from '../api/users';
import { HeaderTitle } from '@react-navigation/stack';
import { addTour, editTour, switchTour, archiveTour, unarchiveTour, bookTour} from '../api/tours';

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
                setUserType(currentUser._data.userType)
                setUserName(currentUser._data.username)
                setUserIntro(currentUser._data.intro)
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
                            setUserName(user._data.username)
                            console.log("Username successfully changed")
                        } else {
                            console.log("There was an error in changing the username")
                        }
                }}
                />
                <Button
                    title="add tour"
                    onPress={async () => {
                        addTour(2211, 2541, 3341, 65, 654, 1562, 64, 1324, 64, 334).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
                />
                <Button
                    title="edit tour"
                    onPress={async () => {
                        editTour(21, 2321, "date", 612341).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
                />
                <Button
                    title="archive tours"
                    onPress={async () => {
                        let i = [
                            [21, 2321], 
                            [2211, 2541],
                        ]
                        archiveTour(i).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
                />
                <Button
                    title="unarchive tours"
                    onPress={async () => {
                        let i = [
                            [21, 2321], 
                            [2211, 2541],
                        ]
                        unarchiveTour(i).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
                />
                <Button
                    title="switch tours"
                    onPress={async () => {
                        switchTour(2211, 2541, 734).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
                />
                <Button
                    title="book tours"
                    onPress={async () => {
                        bookTour(2211, 2541, 62322222, 522213).catch((error)=>{
                            console.log(error);
                        });
                    }
                    }
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
                        if (await changeIntro(userAuth.uid, "test")) {
                            const user = await getUser(userAuth);
                            setUserIntro(user._data.intro)
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
