import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const tours = firestore().collection('tours');

//tourguide Functions
export const addTour = async (guideId, picture, attractions, meetingPt, date, time, cost, duration, transportation, maxPeople, description, category) => {
    if (!(guideId && picture && meetingPt && attractions && date && time && cost && duration && transportation && maxPeople && description && category)) {
        console.log("required parameter not here")
        return;
    } else {
        await tours.doc().set({
            guideId,
            picture,
            meetingPt,
            attractions,
            date,
            time,
            cost,
            duration,
            transportation,
            maxPeople,
            description,
            category,
            archive: false,
        });
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
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot =>
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

export const cancelTour = async (guideId, tourId, userId) => {

}

export const viewAvailableTours = async () => {
    const queryTourSnapshots = await tours.where("title", "!=", "").get();
    if (queryTourSnapshots.empty) {
        console.warn("No tours found!")
    }
    const docTourSnapshots = queryTourSnapshots.docs;
    //AFTER-MVP: limit documents seen for performance
    const availableTours = [];
    for (let i = 0; i < docTourSnapshots.length; i++) {
        availableTours.push(docTourSnapshots[i].data())
    }
    return availableTours;
}

//utility functions
export const getTour = async(guideId, tourId) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot =>
    {
        querySnapshot.forEach((documentSnapshot) => {
            return documentSnapshot;
        });
    });
}
export const getBooking = async(guideId, tourId, userId) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot =>
        {
            querySnapshot.forEach(documentSnapshot =>
            {
                    tours.doc(documentSnapshot.id).collection("bookings").where("userId", '==', userId).get().then(querySnapshot2 =>
                    {
                            querySnapshot2.forEach(documentSnapshot2 =>
                            {
                                return documentSnapshot2;
                            });
                    });
            });
        }
    );
}
