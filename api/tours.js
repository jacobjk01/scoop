import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const db = firestore();
const tours = db.collection('tours');

//user functions

export const viewTourSettings = async (tourId) => {
    const tourSettingsSnapshot = await tours.doc(tourId).collection('tourSettings').where('isPublished', '==', true).where('isArchived', '==', false).get()
    const processedTourSettings = []
    tourSettingsSnapshot.forEach(queryDocSnapshot => {
        processedTourSettings.push({
            tourSettingRef: queryDocSnapshot.ref,
            id: queryDocSnapshot.id,
            queryDocSnapshot, //extra
            ...queryDocSnapshot.data(),
        })
    })
    //const guideDoc = processedTourSettings[0].guide;
    //console.log(await guideDoc.get())
    return processedTourSettings
}

//TODO
//pass in output of viewTourSettings fn to get basic info of tour
export const convertToTourSummary = (processedTourSettings) => {
    throw 'Not Implemented'
}


export const bookTour = async(tourSettingRef, partySize, visitorId) => {
    if (!visitorId) {
        throw new Error("visitor is not defined")
    }
    const visitor = user(visitorId);

    const booking = tourSettingRef.collection("bookings").doc(); 
    //console.log(booking.id)
    booking.set({
        visitor,
        partySize,
        isCancelled: false
    })
}

//TODO? cancel a tour setting? cancel a tour? or cancel a booking?
export const cancelTour = async (tourSettingRef) => {
    throw new Error("Feature not implemented")
}

//TODO - need to show only available tours
export const viewAvailableTours = async () => {
    return await viewAllTours();
}

export const getVisitorBookings = async (visitorId) => {
    const queryTourSettingSnapshots = await db.collectionGroup("bookings").where("visitor", "==", user(visitorId)).get();
    let visitorBookings = [];
    queryTourSettingSnapshots.forEach(tourSetting => {
        visitorBookings.push(tourSetting.data());
    })
    return visitorBookings
}

//guide Functions

export const viewAllTours = async () => {
    const queryTourSnapshots = await tours.where("title", "!=", "").get();
    if (queryTourSnapshots.empty) {
        console.warn("No tours found!")
    }
    const docTourSnapshots = queryTourSnapshots.docs;
    //AFTER-MVP: limit documents seen for performance
    const availableTours = [];
    for (let i = 0; i < docTourSnapshots.length; i++) {
        let tourData = docTourSnapshots[i].data();
        tourData.id = docTourSnapshots[i].id;
        availableTours.push(tourData)
    }
    return availableTours;
}


export const viewMyTours = async (guideId) => {
    const queryTourSettingSnapshots = await db.collectionGroup("tourSettings")
        .where("guide", "==", user(guideId))
        // .where("isArchived", "==", false)
        // .where("isPublished", "==", true)
        .where("flags", "!=", ["published", "archived"])
        //gets all tours for guide that only have published flag
        .get()
    let myTours = [];
    console.log(queryTourSettingSnapshots.docs.length)
    queryTourSettingSnapshots.forEach(tourSetting => {
        myTours.push(tourSetting.data());
    })
    return myTours
}

//TODO
export const getAttractions = async (tourId) => {
    throw new Error("Feature not implemented")
}

//TODO
export const getMeetingPts = async (tourId) => {
    throw new Error("Feature not implemented")
}

//adds a tour setting and returns a tourSetting ref
export const addTour = async (
    guideId,
    tourId,
    categories,
    cost,
    duration,
    introduction,
    isArchived,
    isPublished,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation
) => {
    const tour = tours.doc(tourId).collection("tourSettings").doc()
    await tour.set({
        guide: guideId,
        meetingPt,
        categories,
        cost,
        duration,
        introduction,
        isArchived: false,
        isPublished: true,
        maxPeople,
        meetingPt,
        timeAvailable,
        transportation,
        flags: ["published"]
    });
    return tour;
}

//TODO
export const editTour = async (
    tourSettingRef,
    categories,
    cost,
    duration,
    introduction,
    isArchived,
    isPublished,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation
) => {
    throw new Error("Feature not implemented")
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).get().then(querySnapshot =>
    {
        querySnapshot.forEach((documentSnapshot) => {
               tours.doc(documentSnapshot.id).update(field, fieldValue);
        });
    });
}

//TODO
export const duplicateTour = async (
    tourSettingRef,
    categories,
    cost,
    duration,
    introduction,
    isArchived,
    isPublished,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation
) => {
    throw new Error("Feature not implemented")
}

//TODO
export const getGuideBookings = async (guideId) => {
    throw new Error("Feature not implemented")
}




//AFTER-MVP
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
//AFTER-MVP
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

//AFTER-MVP
export const switchTour = async(guideId, tourId, tourId2) => {
    await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot =>
    {
            querySnapshot.forEach((documentSnapshot) => {
                tours.doc(documentSnapshot.id).update("tourId", tourId2);
            });
    });
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

/**
 * 
 * @param {*} id any valid id in user db
 * @returns a user documentReference
 */
const user = (id) => {
    return firestore().collection('users').doc(id)
}