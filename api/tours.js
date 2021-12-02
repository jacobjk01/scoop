import firestore from '@react-native-firebase/firestore';

const db = firestore();
const tours = db.collection('tours');

//user functions

export const viewTourSettings = async (tourId) => {
    const tourSettingsSnapshot = await tours.doc(tourId).collection('tourSettings').where('isPublished', '==', true).where('isArchived', '==', false).get()
    if (tourSettingsSnapshot.empty) {
        console.warn(`call to viewTourSettings with tourId ${tourId} has 0 or only archived tours` )
    }
    return querySnapshotFormatter(tourSettingsSnapshot)
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
        isCancelled: false,
        //TODO: do time
        time: new Date(),
        isCompleted: false
    })
}

//TODO? cancel a tour setting? cancel a tour? or cancel a booking?
// for visitor and guide 
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
    return querySnapshotFormatter(queryTourSettingSnapshots)
}

//guide Functions

export const viewAllTours = async () => {
    const queryTourSnapshots = await tours.get();
    if (queryTourSnapshots.empty) {
        console.warn("No tours found!")
    }
    const docTourSnapshots = queryTourSnapshots.docs;
    //AFTER-MVP: limit documents seen for performance
    return querySnapshotFormatter(queryTourSnapshots);
}


export const viewMyTours = async (guideId) => {
    console.log(guideId)

    const queryTourSettingSnapshots = await db.collectionGroup("tourSettings")
        .where("guide", "==", user(guideId))
        // .where("isArchived", "==", false)
        // .where("isPublished", "==", true)
        .where("flags", "==", ["published"])
        //gets all tours for guide that only have published flag
        .get()

    return querySnapshotFormatter(queryTourSettingSnapshots)
}

// get attractions of a tour
export const getAttractions = async (tourId) => {
    const attractions = await tours.doc(tourId).collection("attractions").get()
    return querySnapshotFormatter(attractions)
}

// get meetingPts of a tour
export const getMeetingPts = async (tourId) => {
    const meetingPts = await tours.doc(tourId).collection("availableMeetingPts").get()
    return querySnapshotFormatter(meetingPts)
}

//adds a tour setting and returns a tourSetting ref (untested)
export const addTour = async (
    guideId,
    tourId,
    categories,
    cost,
    duration,
    introduction,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation
) => {
    const tour = tours.doc(tourId).collection("tourSettings").doc()
    await tour.set({
        guide: user(guideId),
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

// in order to solve for the guide changing problem, we are actually archiving old tour and returning new tourSetting - TODO: not tested
export const editTour = async (
    tourSettingRef,
    guideId,
    tourId,
    categories,
    cost,
    duration,
    introduction,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation
) => {
    //archive old tour
    await tourSettingRef.update({
        guide: guideId,
        meetingPt,
        categories,
        cost,
        duration,
        introduction,
        isArchived: true,
        isPublished: true,
        maxPeople,
        meetingPt,
        timeAvailable,
        transportation,
        flags: ["published", "archived"]
    });
    //return new tourSettingRef
    return await addTour(
        guideId,
        tourId,
        categories,
        cost,
        duration,
        introduction,
        maxPeople,
        meetingPt,
        timeAvailable,
        transportation
    );
}

//TODO - select button on manage tours? need to talk to Emily about this
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


export const getGuideBookings = async (guideId) => {
    const tourSettingsSnapshot = await db.collectionGroup("tourSettings").where("guide", "==", user(guideId)).get()
    console.log(tourSettingsSnapshot.size)
    var guideBookings = []
    for (let i = 0; i < tourSettingsSnapshot.docs.length; i++) {
        let queryDocumentSnapshot = tourSettingsSnapshot.docs[i];
        let c = await queryDocumentSnapshot.ref.collection("bookings").where("isCompleted", "==", false).get()
        guideBookings = guideBookings.concat(querySnapshotFormatter(c));

    }
    
    return guideBookings
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

export const querySnapshotFormatter = (querySnapshotSnapshots) => {
    return querySnapshotSnapshots.docs.map((queryDocSnapshot) => {
        return {
            id: queryDocSnapshot.id,
            ...queryDocSnapshot.data(),
            ref: queryDocSnapshot.ref
        }
    })
}

/**
 * 
 * @param {*} id any valid id in user db
 * @returns a user documentReference
 */
const user = (id) => {
    return firestore().collection('users').doc(id)
}

