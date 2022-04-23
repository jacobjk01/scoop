import db from '@react-native-firebase/firestore';
import { update, get } from './utilities';

const Reviews = db().collection('reviews');

export const addReview = async (guideId, visitorId, tourId, rating, description) => {
    if (!(guideId && visitorId && tourId && rating)) {
        //console.log('required parameter not here')
        return;
    } else {
        await Reviews.doc().set({
            guideId, // is this the same as guideId: guideId?
            visitorId: uuid.v4(),
            tourId,
            rating,
            description,
            archive: false
        }).then(Reviews.doc().collection().doc().set({hello: 'hello'})); // what is this part?
    }
}

export const archiveReview = async(Id) => {
    for (var i = 0; i < Id.length; i++) {
        await Reviews.where('visitorId', '==', Id[i][0]).where('EDIT THIS HERE', '==', Id[i][1]).get().then(querySnapshot => { // EDIT THIS HERE
            querySnapshot.forEach((documentSnapshot) => {
                Reviews.doc(documentSnapshot.id).update('archive', true);
            });
        });
    }
}

export const unarchiveReview = async(Id) => {
    for (var i = 0; i < Id.length; i++) {
        await Reviews.where('visitorId', '==', Id[i][0]).where('EDIT THIS HERE', '==', Id[i][1]).get().then(querySnapshot => { // EDIT THIS HERE
            querySnapshot.forEach((documentSnapshot) => {
                Reviews.doc(documentSnapshot.id).update('archive', false);
            });
        });
    }
}
