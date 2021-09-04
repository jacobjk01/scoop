import db from '@react-native-firebase/firestore';
const User = db().collection('users');
//needs to be either a cb, a promise or a async/await
export const getUser = (uuid, cb) => {
    User.doc(uuid)
        .get()
        .then(res => {
            // console.log(res)
            cb(res)
        }).catch(err => {
            console.error(err)
        })
}