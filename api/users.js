import db from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { update, get } from './utilities';


const Users = db().collection('users');

/**
 * This for new users
 * Gets the user. If no document exists for the user, it is the user's first time and creates a new document
 * Signers may not have a user in the users collection
 * In this case, getUser will create a basic document for the user
 * However, that is below the abstraction
 * @param {*} userAuth 
 * @returns the document of the user
 */
export const getUser = async (userAuth) => {
  try {
    const user = await get(Users, userAuth.uid);
    if (!user._exists) {
      await Users.doc(userAuth.uid).set({
        type: 'guide',
        name: userAuth.displayName,
        profilePicture: userAuth.photoURL,
      });
      return await get(Users, userAuth.uid);
    }
    return user;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Gets the user's data given userAuth
 * @param userAuth
 * @returns user data if successful, null if not
 */
export const getUserData = async (userAuth) => {
  try {
    const user = await get(Users, userAuth.uid);
    if (user._exists) {
      return user.data();
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}

export const getUserById = async (userId) => {
  return await Users.doc(userId).get()
}

/**
 * Gets the profile picture of the user in the db and storage
 * @param {string} uid
 * @param {string} type can be profilePicture or backgroundPicture
 * @returns true if successful, false if not
 */
export const getPicture = async (uid, type) => {
  try {
    return await storage().ref('/' + uid + '/' + type).getDownloadURL();
  } catch (e) {
    console.log(e);
  }
}

/**
 * Creates private data for the user
 * @param {string} uid 
 * @returns true if successful, false if not
 */
export const createPrivateData = async (uid) => {
  try {
    return await Users.doc(uid).collection('private-data').add({
      payment: 100
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the name of the user
 * @param {string} uid 
 * @param {string} name 
 * @returns true if successful, false if not
 */
export const changeName = async (uid, name) => {
  try {
    return await update(Users, uid, 'name', name);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the profile or background picture of the user in the db and storage
 * @param {string} uid 
 * @param {string} picture 
 * @param {string} type can be profilePicture or backgroundPicture
 * @returns true if successful, false if not
 */
export const changePicture = async (uid, picture, type) => {
  try {
    return await storage().ref(uid + '/' + type).putFile(picture);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the major of the user
 * @param {string} uid 
 * @param {string} major 
 * @returns true if successful, false if not
 */
export const changeMajor = async (uid, major) => {
  try {
    return await update(Users, uid, 'major', major);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the year of the user
 * @param {string} uid 
 * @param {string} year 
 * @returns true if successful, false if not
 */
export const changeYear = async (uid, year) => {
  try {
    return await update(Users, uid, 'year', year);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the intro of the user
 * @param {string} uid 
 * @param {string} intro 
 * @returns true if successful, false if not
 */
export const changeIntro = async (uid, intro) => {
  try {
    return await update(Users, uid, 'intro', intro);
  } catch (e) {
    console.log(e);
  }
}

// TODO
/**
 * Updates the languages of the user
 * @param {string} uid 
 * @param {string} languages 
 * @returns true if successful, false if not
 */
// Represented as a list or from multi-selection
export const changeLanguages = async (uid, languages) => {
  try {
    return await update(Users, uid, 'languages', languages);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates the hometown of the user
 * @param {string} uid 
 * @param {string} hometown 
 * @returns true if successful, false if not
 */
export const changeHometown = async (uid, hometown) => {
  try {
    return await update(Users, uid, 'hometown', hometown);
  } catch (e) {
    console.log(e);
  }
}

// TODO
// Will need to send the full list of tours back, and update all
/**
 * Updates the tours of the user
 * @param {string} uid 
 * @param {string} tours 
 * @returns true if successful, false if not
 */
export const changeTours = async (uid, tours) => {
  try {
    return await update(Users, uid, 'tours', tours);
  } catch (e) {
    console.log(e);
  }
}

// Specifics for searching may be different
/**
 * Updates the name of the user
 * @param {string} searchQuery 
 * @returns ?
 */
export const searchGuides = (searchQuery) => {
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


export const getUserByRef = async (guideId) => {
  return await Users.doc(guideId).get()
}

