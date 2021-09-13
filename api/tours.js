import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const tours = firestore().collection('tours');
const users = firestore().collection('users');
//tourguide Functions
export const addTour = async (guideId, tourId, meetLocation, date, time, cost, duration, transportation, maxPeople, description) => {
        if(!guideId || !tourId || !meetLocation || !date || !time || !cost || !duration || !transportation || !maxPeople || !description)
        {
            console.log("required parameter not here")
            return;
        }
        else
        {
            await tours.doc().set({
                visitorIds: uuid.v4(),
                guideId,
                tourId,
                meetLocation,
                date,
                time,
                cost,
                duration,
                transportation,
                maxPeople,
                description,
                archive: false,
            }).then(tours.doc().collection().doc().set({hello: "hello"}));

        }
}
export const editTour = async(guideId, tourId, field, fieldValue) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).get().then(querySnapshot =>
    {
        querySnapshot.forEach((documentSnapshot) => {
               tours.doc(documentSnapshot.id).update(field, fieldValue);
        });
    });
}
export const archiveTour = async(Id) => {
    for(var i = 0; i < Id.length; i++)
    {
        await tours.where('guideId', '==', Id[i][0]).where('tourId', '==', Id[i][1]).get().then(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                       tours.doc(documentSnapshot.id).update("archive", true);
                });
        });
    }
}
export const unarchiveTour = async(Id) => {
    for(var i = 0; i < Id.length; i++)
    {
        await tours.where('guideId', '==', Id[i][0]).where('tourId', '==', Id[i][1]).get().then(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                       tours.doc(documentSnapshot.id).update("archive", false);
                });
        });
    }
}

export const switchTour = async(guideId, tourId, tourId2) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', 'false').get().then(querySnapshot =>
    {
            querySnapshot.forEach((documentSnapshot) => {
                tours.doc(documentSnapshot.id).update("tourId", tourId2);
            });
    });
}
//user functions
export const bookTour = async(guideId, tourId, userId, numPeople) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot =>
         {
            querySnapshot.forEach((documentSnapshot) => {
                tours.doc(documentSnapshot.id).collection('bookings').doc().set({
                    userId,
                    numPeople,
                });
            });
         });
}