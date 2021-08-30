import React, {useState, useEffect} from 'react'
import { Text, View, Button } from 'react-native'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const signIn = async () => {
    try {
        //await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const {idToken} = userInfo;

        //this hopefully puts user in firebase
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);

        return userInfo
    } catch (error) {
        throw Error('sign in failed')
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
    return isSignedIn
};

const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    //this.setState({ currentUser });
    //console.log(currentUser)
    return currentUser;
};

const signOut = async () => {
    try {
        const res = await GoogleSignin.signOut();
        //this.setState({ user: null }); // Remember to remove the user from your app's state as well
        await GoogleSignin.revokeAccess();
    } catch (error) {
    console.error(error);
    }
    
};


export default function Test() {
    const [signInStatus, setSignInStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [signInProgress, setSignInProgress] = useState(false);
    const [databaseTest, setDatabaseTest] = useState('if you are recieving this message, you have not accessed the database')
    const [firestoreTest, setFirestoreTest] = useState('if you are recieving this message, you have not accessed the database')
    const [uuid, setUuid] = useState(null);
    GoogleSignin.configure(); //needs to done before signin attempts

    useEffect(() => {
        var unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setUuid(user.uid)
                console.log(user.uid)
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
                <Button title="get public value realtime"
                onPress={() => {
                    database().ref('/public/hello')
                        .once('value')
                        .then(snapshot => {
                            const val = snapshot.val();
                            setDatabaseTest(val)
                        });
                }}/>
                <Text>From realtime database: {databaseTest}</Text>

                {/* <Button title="get public value firestore"
                onPress={() => {
                    firestore().collection('users').doc(currentUser.uid)
                        .get()
                        .then(res => {
                            setFirestoreTest(val.type);
                        });
                }}/> */}
                <Text>From firestore database: {}</Text>
        </View>
    )
}
