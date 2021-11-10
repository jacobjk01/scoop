import React, {useState, useEffect} from 'react'
import { SafeAreaView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addTour } from 'api/tours';
import { getUser } from 'api/users';
import { tours } from 'data/toursData';
import { onAuthStateChanged } from 'api/auth';
export default function AddTour({navigation}) {
     const [userAuth, setUserAuth] = useState(null);
     const [user, setUser] = useState(null);
     useEffect(() => {
        console.log('onAuthStateChanged called')
        var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
          //if userAuth exists, 
          if (newUserAuth && userAuth == null) { // userAuth is null, so definitely unique
            setUserAuth(newUserAuth);
          // userAuth exists and doesn't match with with newUserAuth.uid
          } else if (userAuth.uid && newUserAuth && (userAuth.uid != newUserAuth.uid)) {
            setUserAuth(newUserAuth);
          }
        })
      return () => {
        unsubscribeAuth();
      }
      }, [])
      useEffect(async () => {
        if (userAuth) {
          console.log('user logged in');
          const currentUser = await getUser(userAuth);
          setUser({...currentUser.data()})
        }
      }, [userAuth])

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
                        await addTour(userAuth.uid, tour.image, tour.attractions, tour.meetPoint, tour.tourDay, tour.startTime, tour.cost, tour.duration, tour.transportation, tour.maxPeople, tour.description, tour.category);
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
