import db from '@react-native-firebase/firestore';
<<<<<<< HEAD
const User = db().collection('users');
import {get} from './auth'
//needs to be a async/await


//gets the user, if there is no document for the user, first time
//signers may not have a user in the users collection
//in this case, getUser will create a basic document for the user
//however that is below the abstraction
export const getUser = async (userAuth) => {
    let user = await get(User, userAuth.uid);
    if (!user._exists) {            
        await User.doc(userAuth.uid).set({
            userType: 'user',
            username: userAuth.displayName
        })
        return await get(User, userAuth.uid);
    }
    // TODO update profile pic
    return user
}
=======
import { update, get } from './utilities';

const Users = db().collection('users');

/**
 * Gets the user. If no document exists for the user, it is the user's first time and creates a new document
 * Signers may not have a user in the users collection
 * In this case, getUser will create a basic document for the user
 * However, that is below the abstraction
 * @param {*} userAuth 
 * @returns the document of the user
 */
export const getUser = async (userAuth) => {
    const user = await get(Users, userAuth.uid);
    if (!user._exists) {
        await Users.doc(userAuth.uid).set({
            userType: "guide",
            name: userAuth.displayName,
            profilePicture: userAuth.photoURL,
        });
        return await get(Users, userAuth.uid);
    }
    // TODO update profile pic (right now only sets image once profile made, won't work when image updated after)
    // console.log(userAuth.photoURL) // <- this is the photo URL
    return user;
}

export const createPrivateData = async (uid) => {
    await Users.doc(uid).collection("private-data").add({
        payment: 100
    });
}

/**
 * Updates the name of the user
 * @param {string} uid 
 * @param {string} name 
 * @returns true if successful, false if not
 */
export const changeName = async (uid, name) => {
    return await update(Users, uid, "name", name);
}

// Specifics for images in db?
export const changeProfilePicture = async (uid, profilePicture) => {
    await update(Users, uid, "profilePicture", profilePicture);
}

export const changeMajor = async  (uid, major) => {
    await update(Users, uid, "major", major);
}

export const changeYear = async (uid, year) => {
    await update(Users, uid, "year", year);
}

export const changeIntro = async (uid, intro) => {
    return await update(Users, uid, "intro", intro);
}

// Represented as a list or from multi-selection
export const changeLanguages = async (uid, languages) => {
    await update(Users, uid, "languages", languages);
}

export const changeHometown = async (uid, hometown) => {
    await update(Users, uid, "hometown", hometown);
}


// Will need to send the full list of tours back, and update all
export const changeTours = async (uid, tours) => {
    await update(Users, uid, "tours", tours);
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
>>>>>>> origin/usercontroller
