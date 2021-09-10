import db from '@react-native-firebase/firestore';
import { update } from './utilities';

const User = db().collection('users');
//needs to be a async/await

//gets the user, if there is no document for the user, first time
//signers may not have a user in the users collection
//in this case, getUser will create a basic document for the user
//however that is below the abstraction
export const getUser = async (userAuth) => {
    let user = await User.doc(userAuth.uid).get();
    if (!user._exists) {            
        await User.doc(userAuth.uid).set({
            userType: 'user',
            username: userAuth.displayName
        })
        return await User.doc(userAuth.uid).get();
    }
    // TODO update profile pic
    return user
}

// update() will update current value (updating 1 or 2 properties)
// set() will overwrite whole document (updating whole properties, even ones not specified)
// if change is successful, returns true, else returns false
export const changeUsername = async (uid, username) => {
    return await update(User, uid, "username", username)
}

// Specifics for images in db?
export const changeProfilePicture = (uuid, profilePicture) => {
    await update(User, uid, "profilePicture", profilePicture)
}

export const changeMajor = (uuid, major) => {
    await update(User, uid, "major", major)
}

export const changeYear = (uuid, year) => {
    db()
        .collection('users')
        .doc(uuid)
        .update({
            year: year
        })
        .then(() => {
            console.log('Year updated!')
        })
        .catch(err => {
            console.error(err)
        })
}

export const changeIntro = (uuid, intro) => {
    db()
        .collection('users')
        .doc(uuid)
        .update({
            intro: intro,
        })
        .then(() => {
            console.log('Intro updated!')
        })
        .catch(err => {
            console.error(err)
        })
}

// Represented as a list or from multi-selection
export const changeLanguages = (uuid, languages) => {
    db()
        .collection('users')
        .doc(uuid)
        .update({
            languages: languages,
        })
        .then(() => {
            console.log('Languages updated!')
        })
        .catch(err => {
            console.error(err)
        })
}

export const changeHometown = (uuid, hometown) => {
    db()
        .collection('users')
        .doc(uuid)
        .update({
            hometown: hometown,
        })
        .then(() => {
            console.log('Hometown updated!')
        })
        .catch(err => {
            console.error(err)
        })
}

// Will need to send the full list of tours back, and update all
export const changeTours = (uuid, tours) => {
    db()
        .collection('users')
        .doc(uuid)
        .update({
            tours: tours,
        })
        .then(() => {
            console.log('Tours updated!')
        })
        .catch(err => {
            console.error(err)
        })
}

// Specifics for searching may be different
export const searchTourGuides = (searchQuery) => {
    db()
        .collection('users')
        .where('type', '==', 'guide') // should this be 'array-contains'?
        .get()
        .then(querySnapshot => {
            /*      */
        })
        .then(() => {
            console.log('Searched!')
        })
        .catch(err => {
            console.error(err)
        })
}


/* TESTING

// changeUsername(userId, "username")

export function addUser(userId, username) {
    db.firestore()
    .collection('users')
    .add({
        name: user.name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getUsername(userRetrieved) {
    var snapshot = await firebase.firestore()
    .collection('users')
    .orderBy('createdAt')
    .get()
    snapshot.forEach((doc) => {

    })
}



// changePassword()
onChangePasswordPress = () => {
    var user = firebase.auth().currentUser;
    user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
    }).catch((error) => {
        Alert.alert(error.message);
    });
}

render()

*/
