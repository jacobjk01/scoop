import React, {useState, useEffect} from 'react'
import { Text, SafeAreaView, View, Button, Image, ScrollView } from 'react-native'
import { signIn, signOut, onAuthStateChanged } from '../../api/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { changeIntro, changeName, getUser, createPrivateData } from '../../api/users';
import { sendMessage, onConversationChange, getConversation } from '../../api/messaging';
import { HeaderTitle } from '@react-navigation/stack';
import {
    /* Visitor Functions */
    bookTour,
    cancelTour,
    viewAvailableTours,
    getVisitorBookings,
    /* Guide Functions */
    viewAllTours,
    getAttractions,
    getMeetingPts,
    addTour,
    editTour,
    duplicateTour,
    getGuideBookings
} from '../../api/tours';

export default function Test() {
    const [signInStatus, setSignInStatus] = useState(false);
    const [signInProgress, setSignInProgress] = useState(false);
    const [user, setUser] = useState(null);
    const [userAuth, setUserAuth] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [userType, setUserType] = useState('currently userType is not set');
    const [userName, setUserName] = useState('currently userName is not set')
    const [userIntro, setUserIntro] = useState('currently userIntro is not set');
    
    useEffect(() => {
        var unsubscribe1 = onAuthStateChanged(async user => {
            if (user) {
                setUserAuth(user);
                const currentUser = await getUser(user);
                setUserType(currentUser.data().userType)
                setUserName(currentUser.data().name)
                setUserIntro(currentUser.data().intro)
            } else {
                setUserAuth(null);
            }
        })
        var unsubscribe2 = onConversationChange("VzHN35zMK9qXAk1vT82j", snapshot => {
            snapshot.docChanges().forEach(change => {
                // console.log(change)
            })
        })

        return () => {
            unsubscribe1();
            unsubscribe2();
        }
    })

    return (
        <SafeAreaView>
            <ScrollView>

                <Text>Tour Api</Text>
                <Button
                    title="book tour"
                    onPress={async () => {
                        try {
                            bookTour(settingsId, partySize, visitorId);
                        } catch (err) {
                            console.error(err)
                        }
                    }}
                />
                <Button
                    title="cancel tour"
                    onPress={async () => {
                        try {
                            cancelTour(settingsId, userId)

                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="view available tours"
                    onPress={async () => {
                        try {
                            const available = await viewAvailableTours();
                            console.log(available)

                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="get visitor bookings"
                    onPress={async () => {
                        try {
                            const visitorBookings = await getVisitorBookings(visitorId)
                            console.log(visitorBookings)

                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="view all tours"
                    onPress={async () => {
                        try {
                            const allTours = await viewAllTours()
                            console.log(allTours)

                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="get attractions"
                    onPress={async () => {
                        try {
                            const attractions = await getAttractions(tourId)
                            console.log(attractions)

                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="get meeting points"
                    onPress={async () => {
                        try {
                            const attractions = await getMeetingPts(tourId)
                            console.log(attractions)

                        } catch (err ) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="add tour"
                    onPress={async () => {
                        try {
                            const tour = await addTour(
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
                            )
                            console.log(tour)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="edit tour"
                    onPress={async () => {
                        try {
                            const tour = await editTour(
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
                            )
                            console.log(tour)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="duplicate tour"
                    onPress={async () => {
                        try {
                            const tour = await duplicateTour(
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
                            )
                            console.log(tour)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />
                <Button
                    title="get guide bookings"
                    onPress={async () => {
                        try {
                            const guideBookings = await getGuideBookings(
                                guideId
                            )
                            console.log(guideBookings)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    }
                />





                <Text>{signInStatus ? 'Signed In' : 'No Account detected'}</Text>
                <Text>{userAuth ? userAuth.email : 'No User'}</Text>
                {<Text>{userAuth ? 'Signed In' : 'No Account detected'}</Text>}
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={async () => {
                        await signIn().catch(err => {
                            console.log(err)
                        })
                    }}
                    disabled={userAuth ? true : false}
                    />
                    <Button
                        title="Sign Out"
                        onPress={async ()=> {
                            await signOut();
                    }}
                        disabled={!userAuth}
                    />
                    <HeaderTitle>Welcome back, {userName}</HeaderTitle>
                    <Button
                        title="Change Name"
                        onPress={async () => {
                            if (await changeName(userAuth.uid, "Josh")) {
                                const user = await getUser(userAuth);
                                setUserName(user.data().name)
                                console.log("Name successfully changed")
                            } else {
                                console.log("There was an error in changing the name")
                            }
                    }}
                    />
                    <Button
                        title="Create Private Data"
                        onPress={async () => {
                            if (await createPrivateData(userAuth.uid)) {
                                console.log("Private data subcollection creation success")
                            } else {
                                console.log("There was an error creating private data")
                            }
                    }}
                    />
                    <View>
                        {userAuth ? <Image
                            style={{width: 100, height: 100}}
                            source={{uri: userAuth.photoURL}}/> : <></>}
                    </View>
                    <Text>{userIntro}</Text>
                    <Button 
                        title="Change Intro"
                        onPress={async () => {
                            if (await changeIntro(userAuth.uid, "test")) {
                                const user = await getUser(userAuth);
                                setUserIntro(user.data().intro)
                            }
                        }}
                    />
                    <Button title="get public value firestore"
                    onPress={async () => {
                        if (!userAuth) {
                            setUserType('currentUser is not detected')
                        } else {
                            try {
                                const user = await getUser(userAuth);
                                console.log(user)
                                if (user.data()) {
                                    setUserType(user.data().type);
                                } else {
                                    console.error('something is wrong')
                                }
                            } catch(err) {
                                console.error(err)
                            }
                        }
                    }}/>
                    <Text>From firestore database: {userType}</Text>
                    <Button title="send Message"
                    onPress={async () => {
                        await sendMessage("testing append", "123", "senderId123")
                    }}/>
                    <Button title="get Messages"
                    onPress={async () => {
                        await getConversation("VzHN35zMK9qXAk1vT82j")
                    }}/>
            </ScrollView>
        </SafeAreaView>
    )
}
