/**
 * 
 *  you should only have to use:
 *    - signIn
 *    - signOut
 * 
 */

import auth from '@react-native-firebase/auth';
import {client} from '../android/app/google-services.json'
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';

//note for sign ins to work properly, you need to run: GoogleSignin.configure(); //first!
GoogleSignin.configure({webClientId: client[0].oauth_client[1].client_id}); //needs to done before signin attempts

//this signs a user in
export const signIn = async () => {
    try {
        //await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const {
            idToken
        } = userInfo;

        //this places user in firebase authentication tab
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
        
        // return userInfo //this userInfo is not very useful, use the onAuthChange to get the user info
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


export const signOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
    } catch (error){
        console.error("revoke Access failed")
        console.error(error)
    }
    try {
        await GoogleSignin.signOut();
    } catch (error){
        console.error("signOut part 1 failed")
        console.error(error)
    }
    try {
        await auth().signOut();
    } catch (error) {
        console.error("signOut part 2 failed")
        console.error(error);
    }
};

//treat as an event listener
//https://www.pluralsight.com/guides/event-listeners-in-react-components
//sets of a subscriber and returns a unsubscriber
//useful for getting user uid
export const onAuthStateChanged = (cb) => {
    return auth().onAuthStateChanged(user => {
            cb(user)
    })
}
/**
 * Data that is in these functions
 */
//user for onAuthStateChanged
//note: uid is the id we are using to track the users
const onAuthData = {
    "displayName": "The Shagod",
    "email": "theshagod@gmail.com",
    "emailVerified": true,
    "isAnonymous": false,
    "metadata": {
        "creationTime": 1630195515029,
        "lastSignInTime": 1630286711824
    },
    "phoneNumber": null,
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhaKhMpzE0CUGUikJaLXGP2AkHuVfbFIj4cJHKRkA=s96-c",
    "providerData": [
        [Object]
    ],
    "providerId": "firebase",
    "refreshToken": "asdf",
    "tenantId": null,
    "uid": "asdf"
}

//signin and getcurrentUser data
const signInReturnData = {
    "idToken": "asdf",
    "scopes": ["Asdf"],
    "serverAuthCode": null,
    "user": {
        "email": "theshagod@gmail.com",
        "familyName": "Shagod",
        "givenName": "The",
        "id": "asdf",
        "name": "The Shagod",
        "photo": "https://lh3.googleusercontent.com/a-/AOh14GhaKhMpzE0CUGUikJaLXGP2AkHuVfbFIj4cJHKRkA=s120"
    }
}


// export const isSignedIn = async () => {
//     const isSignedIn = await GoogleSignin.isSignedIn();
//     //this.setState({ isLoginScreenPresented: !isSignedIn });
//     return isSignedIn
// };

/*
Don't use this function, rely on the onAuthChange function
*/
// export const getCurrentUser = async () => {
//     console.log('getCurrentUser being called')
//     const userInfo = await GoogleSignin.signInSilently();
//     if (userInfo) {
//         return userInfo
//     }
//     const currentUser = await GoogleSignin.getCurrentUser();
//     return currentUser;
// };
