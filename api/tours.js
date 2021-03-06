import firestore from '@react-native-firebase/firestore';
import {
  querySnapshotFormatter,
  querySnapshotFormatterWithParent,
  docSnapshotFormatter
} from './utilities';
const db = firestore();
const tours = db.collection('tours');

//user functions
//returns processedTourSettings
export const viewTourSettings = async (tourId) => {
  const tourSettingsSnapshot = await tours.doc(tourId).collection('tourSettings').where('isPublished', '==', true).where('isArchived', '==', false).get()
  if (tourSettingsSnapshot.empty) {
    console.warn(`call to viewTourSettings with tourId ${tourId} has 0 or only archived tours`)
  }
  return querySnapshotFormatter(tourSettingsSnapshot)
}


//returns array of guides
export const convertToGuides = async (processedTourSettings) => {
  const guides = []
  for (let i = 0; i < processedTourSettings.length; i++) {
    let tourSetting = processedTourSettings[i]
    let guideSnapshot = await db.collection('users').doc(tourSetting.guide.id).get();
    guides.push(docSnapshotFormatter(guideSnapshot))
  }
  return guides
}


//return meeting pt info for a tourSetting
export const getMeetingPt = async (meetingPtRef) => {
  const meetingPt = await meetingPtRef.get();
  return docSnapshotFormatter(meetingPt)
}

//TODO
//pass in output of viewTourSettings fn to get basic info of tour
export const convertToTourSummary = (processedTourSettings) => {
  throw 'Not Implemented'
}

/**
 * 
 * @param {*} tourSettingRef 
 * @param {*} partySize 
 * @param {*} visitorId 
 * @param {*} comment additional request information
 */
export const bookTour = async (tourSettingRef, partySize, visitorId, comment) => {
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
    isCompleted: false,
    comment
  })
}

//TODO? cancel a tour setting? cancel a tour? or cancel a booking?
// for visitor and guide 
export const cancelTour = async (tourSettingRef, userId) => {
  throw new Error("Feature not implemented")
}

//TODO - need to show only available tours
export const viewAvailableTours = async () => {
  return await viewAllTours();
}

export const getVisitorBookings = async (visitorId) => {
  const queryTourSettingSnapshots = await db.collectionGroup("bookings").where("visitor", "==", user(visitorId)).get();
  return querySnapshotFormatter(queryTourSettingSnapshots)
}

//guide Functions
/**
 * gets the first tours sorted by title, starting at variable 'parameter' and ending  
 * @param {docId} start defaults to '', expects the documentReference id
 * @param {number} limit defaults to 99
 * @returns 
 */
export const viewAllTours = async (start = '', limit=99) => {
  if (start !== '') {
    start = await tours.doc(start).get()
  }
  const queryTourSnapshots = await tours.orderBy('title').startAt(start).limit(limit).get();
  if (queryTourSnapshots.empty) {
    console.warn("No tours found!")
  }
  const res = querySnapshotFormatter(queryTourSnapshots)

  return res;
}
/**
 * gets the toursettings using a tourRef
 * @param {DocumentRef} tourRef 
 * @returns {{empty:boolean, tourSetting:[]}}
 * 
 */
export const checkIfTourEmpty = async (tourRef) => {
  const tourSettingsQuerySnapshots = await tourRef.collection('tourSettings').get()
  console.warn(querySnapshotFormatter(tourSettingsQuerySnapshots))
  return {
    empty: tourSettingsQuerySnapshots.empty,
    tourSetting: querySnapshotFormatter(tourSettingsQuerySnapshots)
  }
}

export const viewMyTours = async (guideId) => {

  const queryTourSettingSnapshots = await db.collectionGroup("tourSettings")
    .where("guide", "==", user(guideId))
    .where("isArchived", "==", false)
    .where("isPublished", "==", true)
    //gets all tours for guide that only have published flag
    .get()

  return querySnapshotFormatterWithParent(queryTourSettingSnapshots)
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
  isPublished,
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
    isPublished,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation,
    flags: isPublished ? ["published"] : []
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
  isPublished,
  maxPeople,
  meetingPt,
  timeAvailable,
  transportation
) => {
  //archive old tour
  await tourSettingRef.update({
    guide: user(guideId),
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
    isPublished,
    maxPeople,
    meetingPt,
    timeAvailable,
    transportation,
  );
}
export const archiveTour = async (tourSettingRef) => {
  tourSettingRef.update({
    isArchived: true,
    isPublished: true,
    flags: ["published", "archived"]
  })
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
  console.log("Number of tourSettings with " + guideId + ": " + tourSettingsSnapshot.size)
  var guideBookings = []
  for (let i = 0; i < tourSettingsSnapshot.docs.length; i++) {
    let queryDocumentSnapshot = tourSettingsSnapshot.docs[i];
    //adds only bookings that are not completed
    let c = await queryDocumentSnapshot.ref.collection("bookings").where("isCompleted", "==", false).get()
    guideBookings = guideBookings.concat(querySnapshotFormatter(c));

  }

  return guideBookings
}

export const addTimeRanges = async (guideId) => {
  throw 'Not Implemented'
}

//AFTER-MVP
export const unarchiveTour = async (Id) => {
  for (var i = 0; i < Id.length; i++) {
    await tours.where('guideId', '==', Id[i][0]).where('tourId', '==', Id[i][1]).get().then(querySnapshot => {
      querySnapshot.forEach((documentSnapshot) => {
        tours.doc(documentSnapshot.id).update('archive', false);
      });
    });
  }
}

//AFTER-MVP
export const switchTour = async (guideId, tourId, tourId2) => {
  await tours.where('guideId', '==', guideId).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot => {
    querySnapshot.forEach((documentSnapshot) => {
      tours.doc(documentSnapshot.id).update('tourId', tourId2);
    });
  });
}








//utility functions
export const getTour = async (tourId) => await tours.doc(tourId).get()
export const getTourSetting = async (guideId, tourId) => {
  await tours.where("guide", "==", user(guideId)).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot => {
    querySnapshot.forEach((documentSnapshot) => {
      return documentSnapshot;
    });
  });
}
export const getBooking = async (guideId, tourId, userId) => {
  const querySnapshot = await tours.where("guide", "==", user(guideId)).where('tourId', '==', tourId).where('archive', '==', false).get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      tours.doc(documentSnapshot.id).collection('bookings').where('userId', '==', userId).get().then(querySnapshot2 => {
        querySnapshot2.forEach(documentSnapshot2 => {
          return docSnapshotFormatter(documentSnapshot2);
        });
      });
    });
  }
  );
}
/**
 * gets all tourSettings that guide has created
 * @param {*} guideId 
 * @returns 
 */
export const getAllTourSettings = async (guideId) => {
  const tourSettingsSnapshot = await db.collectionGroup("tourSettings").where("guide", "==", user(guideId)).get()
  return querySnapshotFormatter(tourSettingsSnapshot)
}


/**
 * 
 * @param {*} id any valid id in user db
 * @returns a user documentReference
 */
const user = (id) => {
  return firestore().collection('users').doc(id)
}

