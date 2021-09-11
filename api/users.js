import db from '@react-native-firebase/firestore';
import { update, get } from './utilities';

const User = db().collection('users');
//needs to be a async/await

//gets the user, if there is no document for the user, first time
//signers may not have a user in the users collection
//in this case, getUser will create a basic document for the user
//however that is below the abstraction
export const getUser = async (userAuth) => {
    const user = await get(User, userAuth.uid);
    if (!user._exists) {            
        await User.doc(userAuth.uid).set({
            userType: 'user',
            username: userAuth.displayName,
            profilePicture: userAuth.photoURL,
        })
        return await get(User, userAuth.uid);
    }
    // TODO update profile pic (right now only sets image once profile made, won't work when image updated after)
    console.log(userAuth.photoURL) // <- this is the photo URL
    return user
}

// update() will update current value (updating 1 or 2 properties)
// set() will overwrite whole document (updating whole properties, even ones not specified)
// if change is successful, returns true, else returns false
export const changeUsername = async (uid, username) => {
    return await update(User, uid, "username", username)
}

// Specifics for images in db?
export const changeProfilePicture = async (uid, profilePicture) => {
    await update(User, uid, "profilePicture", profilePicture)
}

export const changeMajor = async  (uid, major) => {
    await update(User, uid, "major", major)
}

export const changeYear = async (uid, year) => {
    await update(User, uid, "year", year)
}

export const changeIntro = async (uid, intro) => {
    return await update(User, uid, "intro", intro)
}

// Represented as a list or from multi-selection
export const changeLanguages = async (uid, languages) => {
    await update(User, uid, "languages", languages)
}

export const changeHometown = async (uid, hometown) => {
    await update(User, uid, "hometown", hometown)
}


// Will need to send the full list of tours back, and update all
export const changeTours = async (uid, tours) => {
    await update(User, uid, "tours", tours)
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
