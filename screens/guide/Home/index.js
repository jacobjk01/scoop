import { getGuideBookings, getMeetingPt } from 'api/tours';
import { getParentData } from 'api/utilities';
import { black, grayDark, grayVeryLight, primary, white } from 'config/colors';
import { UserContext } from 'contexts';
import toursData from 'data/toursData';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActiveTourCard from './ActiveTourCard';

const Home = ({navigation}) => {
  const curTime = '12:00 PM';
  const [activeBooking, setActiveBooking] = useState(null)
  const [bookings, setBookings] = useState([])
  const {userAuth, setUserAuth, user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    if (!userAuth) return;
    getGuideBookings(userAuth.uid).then(async bookings => {
      let tourSettings
      let meetingPts
      let tours
      try {
        tourSettings = await Promise.all(bookings.map(booking => getParentData(booking.ref)))
        meetingPts = await Promise.all(tourSettings.map(tourSetting => getMeetingPt(tourSetting.meetingPt)))
        console.log(meetingPts)
        tours = await Promise.all(tourSettings.map(tourSetting => getParentData(tourSetting.ref)))
      } catch (e) {
        console.error(e)
      }
      let _bookings = bookings.map((booking, i) => {
        let tourMonth = moment(booking.time.toDate()).format('MMM') || "Loading..."
        let tourDay = moment(booking.time.toDate()).format('DD') || "Loading..."
        let startTime = moment(booking.time.toDate()).format('LT') || "Loading..."
        let name = tours[i] && tours[i].title || "Loading..."
        let meetPoint = meetingPts[i].title || "Loading..."
        return ({
        id: booking.id, //not sure if this needs to be tour or booking
        tourMonth,
        tourDay,
        name,
        startTime,
        meetPoint
      })})
      for (let i = 0; i < bookings.length; i++) {
        let currentDate = bookings[i].time.seconds*1000
        //if date is between now and hour later, then there is an active tour
        console.log("current date" + i + ": " + currentDate)
        console.log("now     date_" + ": " + Date.now() )
        console.log(currentDate+60*60*1000)
        if (Date.now() < currentDate) {
          setBookings(_bookings.slice(i))
          break;
        } else if (currentDate < Date.now() && Date.now() < currentDate+60*60*1000) { //within 1 hour of start date
          setActiveBooking(_bookings[i])
          setBookings(_bookings.slice(i+1))
          break;
        } else if (currentDate > Date.now()) {
          console.log("now")
          setBookings(_bookings.slice(i))
          break;
        }
      }
    })
  }, [])

  return (
    <SafeAreaView >
      <ScrollView style={{height: '100%'}}>
        {activeBooking && <ActiveTourCard currentTour={activeBooking} navigation={navigation} />}
        <>
          <View style={activeBooking ? {marginTop: 20} : {marginTop: 50}}>
            <Text style={[{marginLeft: 30, fontSize: 24, fontWeight: '700'}]}>
              Upcoming Tours
            </Text>
            <View style={[styles.divider, {paddingTop: 20}]} />
          </View>
          <View style={{flexWrap: 'wrap', alignContent: 'center'}}>
            {bookings.map((tour) => {
              if (!(tour.id && tour.tourMonth && tour.tourDay && tour.name && tour.startTime && tour.meetPoint)) {
                console.log ({
                  id: tour.id,
                  month: tour.tourMonth,
                  day: tour.tourDay,
                  name: tour.name,
                  startTime: tour.startTime,
                  meetPoint: tour.meetPoint
                })
                throw new Error('Missing a parameter')
              }
              return(
                <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => navigation.navigate('ViewTour', {tour})}>
                  {/* <Image style={styles.tourImage} source={tour.src}></Image> */}
                  <View style={styles.tourTextSection}>
                      <View style={styles.tourDateSection}>
                          <Text style={styles.tourDateText}>{tour.tourMonth}</Text>
                          <Text style={styles.tourDateText}>{tour.tourDay}</Text>
                      </View>
                      <View style={styles.tourInfoSection}>
                          <Text style={styles.tourNameText}>{tour.name}</Text>
                          <Text style={{marginTop: 5}}>{tour.startTime}</Text>
                          <Text style={{marginTop: 5}}>{tour.meetPoint}</Text>
                      </View>
                      <View style={styles.forwardIcon}>
                          <Ionicons name='chevron-forward-outline' size={20} color={grayDark} />
                      </View>
                  </View>
                  <View style={styles.divider}></View>
                </TouchableOpacity>
              )
            })}
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tourDateSection: {
    marginTop: 8,
    width: '20%',
  },
  tourInfoSection: {
    fontSize: 14,
    marginLeft: '3%',
    flex: 1,
    paddingRight: '15%',
  },
  tourDateText: {
    fontWeight: '700',
    fontSize: 18,
    color: primary,
    alignSelf: 'center',
  },
  tourNameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  currentTourCard: {
    width: '85%',
    borderRadius: 10,
    backgroundColor: white,
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 10,
  },
  tourCard: {
    width: '100%',
    // height: 100,
    backgroundColor: white,
    justifyContent: 'flex-end',
  },
  currentTourImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',
    borderRadius: 10,
  },
//   tourImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//     left: '23%',
//     bottom: '15%',
//   },
  tourTextSection: {
    // position: 'absolute',
    // top: '15%',
    left: 10,
    right: 5,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical:10
  },
  forwardIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 30,
  },
  divider: {
    borderBottomColor: grayVeryLight,
    borderBottomWidth: 1,
    width: '100%',
    },
  sectionTitleText: {
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 5,
    color: primary,
  },
  sectionInfoSubtitleText: {
    fontWeight: '400',
    fontSize: 14,
    color: grayDark,
    paddingVertical: 5,
  },
  sectionInfoText: {
      fontWeight: '700',
      fontSize: 16,
      paddingBottom: 15,
  },
  textQuadrant: {
      position: 'relative',
      width: '50%',
  },
});

export default Home;
