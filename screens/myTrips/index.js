import React, { useContext, useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from 'react-native'
import {black, gray, white, primary} from '../../config/colors';
import {bold24, bold18, bold20} from '../../config/typography.js'
import BackButton from 'components/BackButton';
import { getVisitorBookings, getMeetingPt } from '../../api/tours'
import { UserContext } from '../../contexts'
import { getParentData } from '../../api/utilities'
import { getUserByRef } from '../../api/users'
import moment from 'moment'
import { styles } from './styles';

const MyTrips = ({navigation}) => {
    const [option, setOption] = useState('upcoming')
    const [upcoming, setUpcoming] = useState([])
    const [past, setPast] = useState([])
    const [cancelled, setCancelled] = useState([])

    const { user, setUser, userAuth } = useContext(UserContext);

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            getVisitorBookings(userAuth.uid).then(bookings => {
                let tourSettingArray = []

                bookings.forEach((book) => {
                    tourSettingArray.push(getParentData(book.ref))
                })
                Promise.all(tourSettingArray).then((tourSettings) => {
                    let guideArray = []
                    let tourArray = []
                    let meetingPtArray = []
                    let upcoming = []
                    let past = []
                    let cancelled = []

                    tourSettings.forEach((tourSetting) => {
                        guideArray.push(getUserByRef(tourSetting.guide))
                        tourArray.push(getParentData(tourSetting.ref))
                        meetingPtArray.push(getMeetingPt(tourSetting.meetingPt))
                    })
                    Promise.all(guideArray).then((guides) => {
                        Promise.all(tourArray).then((tours) => {
                            Promise.all(meetingPtArray).then((meetingPts) => {
                                bookings.forEach((booking, index) => {
                                    let temp = {}
                                    temp.time = booking.time.toDate()
                                    temp.guide = guides[index]._data
                                    temp.tour = tours[index]
                                    temp.picture = tours[index].picture
                                    temp.visitors = booking.partySize
                                    temp.meetPt = meetingPts[index].title
    
                                    if (booking.isCancelled){
                                        cancelled.push(temp)
                                    }
                                    else {
                                        if (moment(temp.time).isAfter(new Date())){
                                            upcoming.push(temp)
                                        }
                                        else{
                                            past.push(temp)
                                        }
                                    }
                                })
                                setUpcoming(upcoming)
                                setPast(past)
                                setCancelled(cancelled)
                            })
                        })
                    })
                })
            })
        }
        return () => isMounted = false
    }, [])

    const renderButtons = (type) => {
        return (
            <TouchableOpacity
                style={{backgroundColor: option === type?"#98AAD2":white, paddingHorizontal: 18, borderRadius: 30, paddingVertical: 10, marginHorizontal: 5}}
                onPress={() => setOption(type)}
            >
                <Text style={{fontSize: 16, color: option === type?primary:gray}}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
            </TouchableOpacity>
        )
    }
    return(
        <SafeAreaView style={{backgroundColor: white, height: '100%', width: '100%'}}>
            <BackButton navigation={navigation}/>
            <View style={{paddingHorizontal: 20, marginTop: 100}}>
                <Text style={{...bold24}}>
                    My Trips
                </Text>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                    {renderButtons('upcoming')}
                    {renderButtons('past')}
                    {renderButtons('cancelled')}
                </View>
            </View>
            <FlatList
                style={{paddingTop: 15, marginBottom: 220}}
                data={option == 'upcoming'? upcoming : option == 'past' ? past : cancelled}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => {
                    let tour = {}
                    tour.tourMonth = moment(item.time).format('MMM')
                    tour.tourDay = moment(item.time).format('DD')
                    tour.name = item.tour.title
                    tour.meetPoint = item.meetPt
                    tour.startTime = moment(item.time).format('LT')
                    
                    let flow = 'visitor'
                    return (
                        <TouchableOpacity
                            style={{borderRadius: 15, elevation: 10, backgroundColor: white, marginVertical: 10, marginHorizontal: 20}}
                            key={index}
                            onPress={() => navigation.navigate('ViewTour', {tour, flow})}
                        >
                            <Image
                                source={{uri: item.tour.picture}}
                                style={{height: 155, borderTopLeftRadius: 15, borderTopRightRadius: 15}}
                            />
                            <View style={{...styles.textWrapper}}>
                                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 18}}>{item.tour.title}</Text>
                                <Text style={{fontSize: 16, paddingVertical: 4}}>Tour Guide : {item.guide.name}</Text>
                                <Text style={{fontSize: 16}}>Date & Time : {moment(item.time).format('MMM DD LT')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}
export default MyTrips