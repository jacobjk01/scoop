import db from '@react-native-firebase/firestore';

//needs to be either a cb, a promise or a async/await
export const getUser = (uuid, cb) => {
    db().collection('users').doc(uuid)
        .get()
        .then(res => {
            // console.log(res)
            cb(res)
        }).catch(err => {
            console.error(err)
        })
}