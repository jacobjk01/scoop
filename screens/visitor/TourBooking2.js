import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { black, white, primary, grayLight, grayDark } from '../../config/colors';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { viewTourSettings} from '../../api/tours';
import Header from '../../components/Header'
import BottomButton from '../../components/BottomButton';
/*
Parameters:
tour: {"description": "Get to know the neighborhood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.", "id": "4Wey5tUxBInxLq4tZRlS", "picture": "https://pbs.twimg.com/media/EFG56vjU4AAJ_xL?format=jpg&name=4096x4096", "title": "Westwood Tour"}
guide: {"id": "bVkVyZQ5cXTrw83zpBfpNvpVThX2", "major": "cybernetics", "name": "josh test", "profilePicture": "https://lh3.googleusercontent.com/a-/AOh14GgTtZB1w7Jq_jiaCtfaOnE6z4xgCZCtelE6FQwD=s96-c", "type": undefined}
Selected Date: 2021-12-13 (OPTIONAL)
*/
const TourBooking2 = ({navigation, route}) => {

  const tour = route.params.tour
  const guide = route.params.guide
  // console.log(guide)
  //all of the tourSettings that are led by this specific guide and is this specific tour
  const [tourSettings, setTourSettings] = useState()
  //all of the toursettings that are led by a specific guide, a specific tour, and on a specific day
  const [dayTourSettings, setDayTourSettings] = useState()
  const [visitorCount, setVisitorCount] = useState(1)
  const [selectedDay, setSelectedDay] = useState(route.params.selectedDay)
  const [times, setTimes] = useState()
  //this is the INDEX of the selected Time, not the time itself
  const [selectedTime, setSelectedTime] = useState(-1)
  const [selectedMeet, setSelectedMeet] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [customSnapshot, setCustomSnapshot] = useState()
  const [map, setMap] = useState()
  const [region, setRegion] = useState({
    latitude: 34.06938658533915,
    longitude: -118.44459559768438,
    latitudeDelta: 0.005,
    longitudeDelta: 0.0011,
  })
  const [marks, setMarks] = useState([])
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      viewTourSettings(tour.id).then(allTourSettings => {
          let filteredTourSettings = []
          let marks = []
          let times = []
          let dayTourSettings = []
          for(let i = 0; i < allTourSettings.length; i++) {
            if(guide.id == allTourSettings[i].guide._documentPath._parts[1]) {
              filteredTourSettings.push(allTourSettings[i])
              for(let j = 0; j < allTourSettings[i].timeAvailable.length; j++) {
                marks.push(moment(allTourSettings[i].timeAvailable[j]).format("YYYY" + "-" + "MM" + "-" + "DD"))
                if (moment(allTourSettings[i].timeAvailable[j]).format("YYYY" + "-" + "MM" + "-" + "DD") == selectedDay) {
                  times.push(allTourSettings[i].timeAvailable[j])
                  dayTourSettings.push(allTourSettings[i])
                }
              }
            }
          }
          setTourSettings(filteredTourSettings)
          setMarks(marks)
          setTimes(times)
          setDayTourSettings(dayTourSettings)
      })
    }

    return () => {isMounted = false}
  }, [])
  const openModal = () => {
    setModalVisible(true)
    setSelectedMeet(1)
  }

  const closeModal = () => {
    setModalVisible(false)
    takeSnapshot()
  }

  const timeSelect = (index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedTime == index) {
            setSelectedTime(-1)
          }
          else {
            setSelectedTime(index)
          }
        }}
        key={index}
        style={{
          backgroundColor: selectedTime==index?primary:white,
          borderRadius: 10,
          paddingHorizontal: 11,
          paddingVertical: 7,
          marginRight: 7,
          marginLeft: 7,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: primary
        }}>
        <Text style={{color: selectedTime==index?white:primary, fontSize: 15}}>
          {moment(times[index]).format('LT')}
        </Text>
      </TouchableOpacity>
    );

  }
  const onRegionChange = region => {
    setRegion(region)
    // region: {
    //     latitude: region.latitude - 0.00059, //error correction
    //     longitude: region.longitude + 0.00099,
    //     latitudeDelta: 0.0050,
    //     longitudeDelta: 0.0011,
    // }
  };
  // const takeDefaultSnapshot = () => {
  //   // 'takeSnapshot' takes a config object with the
  //   // following options
  //   const snapshot = map.takeSnapshot({
  //     width: 320, // optional, when omitted the view-width is used
  //     height: 90, // optional, when omitted the view-height is used
  //     region: {
  //       latitude: 34.07106828093279,
  //       longitude: -118.444993904947,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: 0.0011,
  //     }, // iOS only, optional region to render
  //     format: 'jpg', // image formats: 'png', 'jpg' (default: 'png')
  //     quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
  //     result: 'file', // result types: 'file', 'base64' (default: 'file')
  //   });
  //   snapshot.then(uri => {
  //     return uri;
  //   });
  // }

  const takeSnapshot = () => {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = map.takeSnapshot({
      width: 320, // optional, when omitted the view-width is used
      height: 90, // optional, when omitted the view-height is used
      region: region, // iOS only, optional region to render
      format: 'jpg', // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file', // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      setCustomSnapshot(uri);
    });

  }
  const createMarkings = () => {
    let calenderMarkings = {};
    for (let i = 0; i < marks.length; i++) {
      calenderMarkings[marks[i]] = {};
      calenderMarkings[marks[i]].marked = true;
      if (marks[i] == selectedDay) {
        calenderMarkings[marks[i]].selected = true;
      }
    }
    return calenderMarkings;
  };
  const onDayPress = day => {
    let times = []
    let dayTourSettings = []
    //for loop checks if selected day has a dot underneath (dots indicate there is a tour on that day)
    for (let i = 0; i < marks.length; i++) {
      if (day == marks[i] && selectedDay == day){
        setSelectedDay('')
        setTimes()
      }
      else if (day == marks[i]) {
        setSelectedDay(day)
        for (let i = 0; i < tourSettings.length; i++) {
          for (let j = 0; j < tourSettings[i].timeAvailable.length; j++) {
            if (moment(tourSettings[i].timeAvailable[j]).format("YYYY" + "-" + "MM" + "-" + "DD") == day) {
              times.push(tourSettings[i].timeAvailable[j])
              dayTourSettings.push(tourSettings[i])
            }
          }
        }
  
        setTimes(times)
        setDayTourSettings(dayTourSettings)
      }
    }
  };

  const showMeetingPoint = () => {
    if (selectedTime != -1) {
      return (
        <View>
          <Text style={styles.sectionText}>Meeting Point</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSelectedMeet(0)}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      selectedMeet == 0 ? '#3154A5' : 'white',
                  },
                ]}></View>
            </TouchableOpacity>
            <Text style={{marginLeft: 10, marginTop: 2}}>Recommended:</Text>
            <Text style={{marginLeft: 10, marginTop: 2}}>
              Bruin Bear Statue
            </Text>
          </View>
          <View
            pointerEvents="none"
            style={{height: 90, backgroundColor: 'grey', marginTop: 10}}>
            <MapView
              style={{flex: 1}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 34.07106828093279,
                longitude: -118.444993904947,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.002,
              }}>
              <Marker
                key={1}
                coordinate={{
                  latitude: 34.07106828093279,
                  longitude: -118.444993904947,
                }}
                title="Bruin Statue"
                description="Recommended Meeting Point"
              />
            </MapView>
            <Text
              style={{
                color: '#EA4336',
                position: 'absolute',
                top: 10,
                left: 175,
                fontWeight: '500',
              }}>
              Bruin Bear
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSelectedMeet(1)}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      selectedMeet == 1 ? '#3154A5' : 'white',
                  },
                ]}></View>
            </TouchableOpacity>
            <Text style={{marginLeft: 10, marginTop: 2}}>Select:</Text>
          </View>
          <TouchableOpacity
            style={{height: 90, backgroundColor: 'grey', marginTop: 10}}
            onPress={() => openModal()}>
            <MapView
              pointerEvents="none"
              style={{flex: 1}}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.002,
              }}>
              <Marker
                key={2}
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title="Bruin Statue"
                description="Recommended Meeting Point"
              />
            </MapView>
            <View style={[styles.shader, {height: 90, opacity: 0.5}]}></View>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 18,
                position: 'absolute',
                top: 35,
                left: 100,
              }}>
              Tap to Choose
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.sectionText}>Meeting Point</Text>
          <Text
            style={{
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignSelf: 'center',
              marginTop: 10,
              borderColor: grayDark,
              borderRadius: 10,
              color: grayDark,
              fontSize: 16,
            }}>
            Please Select a Time
          </Text>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <MapView
          ref={map => {
            setMap(map)
          }}
          style={{flex: 1, justifyContent: 'center'}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={region}
          onRegionChangeComplete={onRegionChange}></MapView>
        <TouchableOpacity
          style={[styles.backIcon, {backgroundColor: primary}]}
          onPress={() => closeModal()}>
          <Ionicons name="chevron-back-outline" size={20} color={white} />
        </TouchableOpacity>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={{width: 25, height: 40}}
            source={require('../../images/marker.png')}></ImageBackground>
        </View>
      </Modal>
      <FlatList
        style={{height: '100%'}}
        ListHeaderComponent={
          <>
            <BottomButton
              title='Continue'
              onPress={() => {
                if (selectedTime != -1) {
                  let tourSetting
                  let timeIndex
                  for (let i = 0; i < dayTourSettings.length; i++) {
                    for (let j = 0; j < dayTourSettings[i].timeAvailable.length; j++) {
                      if (times[selectedTime] == dayTourSettings[i].timeAvailable[j]) {
                        tourSetting = dayTourSettings[i]
                        timeIndex = j
                      }
                    }
                  }
                  console.log(guide)
                  navigation.navigate('BookingCheckout', {tourSetting, tour, guide, visitorCount, timeIndex});
                }
              }}
            />

            {/*Header_________________________________________________________________ */}
            <Header title='Booking' navigation={navigation}/>
            <View>
              <View style={{height: 100, flex: 1, position: 'relative'}}>
                <ImageBackground
                  style={styles.imageHeader}
                  source={{uri: tour.picture}}>
                  <View style={styles.shader}></View>
                  <Text
                    style={{
                      color: white,
                      position: 'absolute',
                      bottom: 25,
                      left: 20,
                      fontSize: 28,
                      fontFamily: 'Helvetica-Bold',
                    }}>
                    {tour.title}
                  </Text>
                  <Text style={styles.tourGuideText}>Tour Guide: {guide.name}</Text>
                  <ImageBackground
                    style={styles.tourGuideProfile}
                    imageStyle={{borderRadius: 40}}
                    source={{uri: guide.profilePicture}}></ImageBackground>
                </ImageBackground>
              </View>
              
              {/*Calender__________________________________________________________________________ */}
              <View style={[styles.backCard, {paddingBottom: 30}]}>
                <Text style={[styles.sectionText, {marginTop: 20}]}>
                  Select Date
                </Text>
                <View style={styles.calenderLine}></View>
                <Calendar
                  // minDate={'2012-05-10'}
                  // maxDate={'2012-05-30'}
                  onDayPress={day => {
                    onDayPress(day.dateString)
                    setSelectedTime(-1)
                  }}
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={'MMMM yyyy'}
                  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                  firstDay={1}
                  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                  onPressArrowLeft={subtractMonth => subtractMonth()}
                  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                  onPressArrowRight={addMonth => addMonth()}
                  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                  disableAllTouchEventsForDisabledDays={true}
                  // Enable the option to swipe between months. Default = false
                  enableSwipeMonths={true}
                  renderArrow={direction => {
                    if (direction == 'left') {
                      return (
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: grayLight,
                          }}>
                          <Ionicons
                            name="chevron-back-outline"
                            size={11}
                            color={primary}
                            style={{padding: 4}}
                          />
                        </View>
                      );
                    } else {
                      return (
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: grayLight,
                          }}>
                          <Ionicons
                            name="chevron-forward-outline"
                            size={11}
                            color={primary}
                            style={{padding: 4}}
                          />
                        </View>
                      );
                    }
                  }}
                  theme={{
                    arrowColor: primary,
                    todayTextColor: black,
                    textDayFontFamily: 'Roboto-Medium',
                    textDayFontSize: 16,
                    monthTextColor: black,
                    textMonthFontSize: 17,
                    textMonthFontFamily: 'Raleway-SemiBold',
                    dotColor: primary,
                    selectedDotColor: primary,
                    dayTextColor: black,
                    selectedDayTextColor: white,
                    selectedDayBackgroundSize: 20,
                    selectedDotColor: white,
                    textDayHeaderFontFamily: 'Raleway-Medium',

                    'stylesheet.day.basic': {
                      base: {
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        padding: 5,
                        margin: 1,
                      },
                      selected: {
                        borderRadius: 25,
                        backgroundColor: primary,
                      },
                    },
                    'stylesheet.calendar.main': {
                      container: {
                        marginTop: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        backgroundColor: white,
                        borderRadius: 25,
                      },
                      week: {
                        marginTop: 0,
                        marginBottom: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      },
                    },
                    'stylesheet.calendar.header': {
                      header: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        alignItems: 'center',
                      },
                      monthText: {
                        fontSize: 17,
                        fontFamily: 'Raleway-SemiBold',
                        color: black,
                        margin: 10,
                        marginBottom: 17,
                      },
                    },
                  }}
                  markedDates={createMarkings()}></Calendar>
              </View>
              {/* select visitors */}
              <View
                style={{
                  flex: 1,
                  height: 60,
                  backgroundColor: white,
                  justifyContent: 'center',
                  borderRadius: 20,
                  marginHorizontal: 10,
                  marginTop: 10,
                  elevation: 10,
                }}>
                <Text style={{marginLeft: 20, fontWeight: '700', fontSize: 19}}>
                  Visitors
                </Text>
                <TouchableOpacity
                  style={
                    visitorCount == 1
                      ? styles.minusDisabled
                      : styles.minus
                  }
                  onPress={() =>
                    setVisitorCount(visitorCount - 1)
                  }
                  disabled={visitorCount == 1 ? true : false}>
                  <Ionicons
                    name="remove-outline"
                    color={visitorCount == 1 ? '#9B9BA7' : 'white'}
                    style={{
                      alignSelf: 'center',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}
                    size={15}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.number}>{visitorCount}</Text>
                <TouchableOpacity
                  style={styles.plus}
                  onPress={() =>
                    setVisitorCount(visitorCount + 1)
                  }>
                  <Text style={{color: white, alignSelf: 'center'}}>+</Text>
                </TouchableOpacity>
              </View>
              {/*Select Time________________________________________________________ */}
              {times != undefined &&
                <View style={[styles.backCard, {paddingBottom: 5}]}>
                <Text style={styles.sectionText}>Select Time</Text>
                <View style={styles.timeView}>
                  {[...Array(times.length).keys()].map(index =>
                    timeSelect(index),
                  )}
                </View>
              </View>
              }

              {/* Meeting Point_______________________________________________________________ */}
              {/* <View
                style={[
                  styles.backCard,
                  {paddingLeft: 40, paddingRight: 40, paddingBottom: 30},
                ]}>
                {showMeetingPoint()}
              </View> */}

              {/* Aditional Requests_______________________________ */}
              <View
                style={[
                  styles.backCard,
                  {paddingLeft: 30, paddingRight: 30, paddingBottom: 30, marginBottom: 100},
                ]}>
                <Text style={styles.sectionText}>Additional Requests</Text>

                <TextInput
                  style={{
                    flex: 1,
                    borderColor: '#9B9BA7',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginTop: 20,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                  }}
                  multiline={true}
                />
              </View>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica',
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 27,
    color: white,
    fontFamily: 'Helvetica-Bold',
  },
  sectionText: {
    fontSize: 19,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 20,
  },
  imageHeader: {
    width: '100%',
    height: 400,
    position: 'absolute',
    bottom: 0,
  },
  shader: {
    width: '100%',
    height: 400,
    opacity: 0.5,
    backgroundColor: black,
    position: 'absolute',
    bottom: 0,
  },
  tourGuideText: {
    fontSize: 14,
    fontWeight: '400',
    width: 100,
    color: white,
    position: 'absolute',
    bottom: 30,
    right: 45,
  },
  tourGuideProfile: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 20,
    bottom: 25,
  },
  minus: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 20,
    right: 80,
    backgroundColor: '#3154A5',
    color: white,
    borderWidth: 1,
    borderRadius: 4,
  },
  minusDisabled: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 20,
    right: 80,
    backgroundColor: 'white',
    borderColor: '#9B9BA7',
    borderWidth: 1,
    borderRadius: 4,
  },
  number: {
    position: 'absolute',
    right: 60,
    top: 21,
  },
  plus: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 30,
    top: 20,
    backgroundColor: '#3154A5',
    borderRadius: 4,
  },
  backCard: {
    flex: 1,
    backgroundColor: white,
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    //ios only
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    //android only
    elevation: 5,
  },
  timeView: {
    flex: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#9B9BA7',
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerCircle: {
    width: 13,
    height: 13,
    borderRadius: 50,
    alignSelf: 'center',
  },
  continue: {
    backgroundColor: '#3154A5',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#adadad',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  backIcon: {
    backgroundColor: white,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 20,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '95%',
    height: 1,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    zIndex: 10,
  },
  calenderLine: {
    width: '90%',
    height: 0.75,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 130,
    alignSelf: 'center',
    zIndex: 10,
  },
});

export default TourBooking2;
