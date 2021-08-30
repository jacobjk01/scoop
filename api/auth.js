
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
//note for sign ins to work properly, you need to run: GoogleSignin.configure(); //first!

GoogleSignin.configure(); //needs to done before signin attempts

export const signIn = async () => {
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
export const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    //this.setState({ isLoginScreenPresented: !isSignedIn });
    return isSignedIn
};

export const getCurrentUser = async () => {
    console.log('getCurrentUser being called')
    const userInfo = await GoogleSignin.signInSilently();
    if (userInfo) {
        return userInfo
    }
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
};

export const signOut = async () => {
    try {
        const res = await GoogleSignin.signOut();
        //this.setState({ user: null }); // Remember to remove the user from your app's state as well
        await GoogleSignin.revokeAccess();
    } catch (error) {
    console.error(error);
    }
    
};

//sets of a subscriber and returns a unsubscriber
//useful for getting user uid
export const onAuthStateChanged = (cb) => {
    return auth().onAuthStateChanged(user => {
        if (user) {
            cb(user)
        }
    })
}