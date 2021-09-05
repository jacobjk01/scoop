import db from '@react-native-firebase/firestore';
const User = db().collection('users');
//needs to be a async/await
export const getUser = async (uid) => {
    return await User.doc(uid).get();
}