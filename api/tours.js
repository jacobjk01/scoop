import db from '@react-native-firebase/firestore';
import { update, get } from './utilities';
import uuid from 'react-native-uuid';

const tours = db().collection('tours');

export const addTour = async (tourguideId, meetLocation, date, time, cost, duration, transportation, maxPeople, description) => {
        if(!tourguideId || !meetLocation || !date || !time || !cost || !duration || !transportation)
        {
            return;
        }
        else
            await tours.doc(userAuth.uid).set({
                tourguideId,
                userId: uuid.v4(),
                meetLocation,
                date,
                time,
                cost,
                duration,
                transportation,
                maxPeople,
                description,
            })
    }