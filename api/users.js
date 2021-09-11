import db from '@react-native-firebase/firestore';
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