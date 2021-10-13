import React, {useState, useEffect} from 'react'
import { SafeAreaView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addTour } from '../../api/tours';
import { getUser } from '../../api/users';
import { tours } from '../../data/toursData';
import { onAuthStateChanged } from '../../api/auth';
export default function AddTour({navigation}) {
    /**
     * You can Delete this, this is mainly to create dumby tours
     */
     


    if (!user) {
        return (
            <SafeAreaView>
                <Text>User not logged in</Text>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView>
                <TouchableOpacity onPress={async () => {
                    try {
                        const tour = tours[0];
                        await addTour(user.uid, tour.image, tour.attractions, tour.meetPoint, tour.tourDay, tour.startTime, tour.cost, tour.duration, tour.transportation, tour.maxPeople, tour.description, tour.category);
                        console.log('added')
                    } catch (error) {
                        console.error(error)
                    }
                }}>
                    <Text>
                        Click here to add a tour
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
