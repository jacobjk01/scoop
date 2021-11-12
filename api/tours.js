import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const tours = firestore().collection('tours');

//user functions
//TODO
export const bookTour = async(settingsId, partySize, visitorId) => {
    throw new Error("Feature not implemented")
    await tours.where('settingsId', '==', settingsId).get().then(querySnapshot =>
        {
            console.log(querySnapshot.docs())
        });
}
//TODO
export const cancelTour = async (guideId, tourId, userId) => {
    throw new Error("Feature not implemented")
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
        let tourData = docTourSnapshots[i].data();
        tourData.id = docTourSnapshots[i].id;
        availableTours.push(tourData)
    }
    return availableTours;
}

//TODO
export const getVisitorBookings = async (visitorId) => {
    throw new Error("Feature not implemented")
}

//guide Functions
//TODO
export const viewAllTours = async () => {
    throw new Error("Feature not implemented")
}

//TODO
export const getAttractions = async (tourId) => {
    throw new Error("Feature not implemented")
}

//TODO
export const getMeetingPts = async (tourId) => {
    throw new Error("Feature not implemented")
}

//TODO
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
    throw new Error("Feature not implemented")
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

//TODO
export const editTour = async (
    settingsId,
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
    settingsId,
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
