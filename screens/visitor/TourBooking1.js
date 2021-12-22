import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black, grayDark, grayLight, grayMed, white, primary} from '../../config/colors';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { viewTourSettings, convertToGuides } from '../../api/tours';

const TourBooking1 = ({navigation, route}) => {

  const generalTours = route.params
  let globalFilteredDates = []
  const [guides, setGuides] = useState([])
  //Array of objects with properties: ID and Dates. Dates is an array of dates, ID is the guideID
  const [info, setInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimes, setSelectedTimes] = useState([false, false, false, false])
  const [disabledTimes, setDisabledTimes] = useState([false, false, false, false])

  //We need these 3 state because there is no other way to set time value unless it is changed, and we need to revert it if user cancels
  const [officialTimes, setOfficialTimes] = useState(['- - - -','- - - -'])
  const [customStartTime, setCustomStartTime] = useState('- - - -');
  const [customEndTime, setCustomEndTime] = useState('- - - -');

  const [isModalVisible, setModalVisible] = useState(false);
  //is user inputting a start custom time or an end custom time in the modal
  const [startOrEnd, setStartOrEnd] = useState(false);

  // console.log(moment(dates[0]).format('LT' + ' ' + 'DD MM'))
  // console.log(moment(dates[1]).format('LT' + ' ' + 'DD MM'))
  // console.log(moment(dates[2]).format('LT' + ' ' + 'DD MM'))
  // console.log(moment(dates[3]).format('LT' + ' ' + 'DD MM'))

  useEffect(() => {
    let isMounted = true
    viewTourSettings(route.params.id).then(tours => {
      //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      //You are not suppose to use async/await functions in useEffect
      //jon has no idea how these 3 isMounted are connected...
      if (isMounted) {
        let temp = []
        for(let i = 0; i < tours.length; i++) {
          let tempObject = {}
          tempObject.id = tours[i].guide._documentPath._parts[1]
          tempObject.dates = tours[i].timeAvailable
          temp[i] = tempObject
        }
        console.log(temp)

        setInfo(temp)
        convertToGuides(tours).then(guide => {
          setGuides(guide)
        })
      }
    });
    
    return () => {
      isMounted = false
    }
  }, [])

  const isStartOrEnd = selectedTime => {
    if (startOrEnd) {
      setCustomEndTime(selectedTime);
    } else {
      setCustomStartTime(selectedTime);
    }
  };
  //set timeRange to selected if not or not selected if it is
  const updateSelectedTime = index => {
    let temp = [...selectedTimes];
    temp[index] = !selectedTimes[index];
    setSelectedTimes(temp)
  };
  const viewModal = index => {
    if (index == 3 && selectedTimes[3] == false) {
      setModalVisible(true);
    }
  };
  const filterGuides = () => {
    //array of guide IDS
    let filteredGuides = []
    //guideIds converted into guideInfo
    let guideInfo = []
    //dates filtered by timerange and day
    let fullyFilteredDates = []
    // console.log(moment(globalFilteredDates[0]).format('LT') + ' ' + selectedDate)

    fullyFilteredDates = globalFilteredDates.filter((item) => {
      if (moment(item).format("YYYY" + "-" + "MM" + "-" + "DD") == selectedDate) {
        return item
      }
    })

    // for(let i = 0; i < info.length; i++) {
    //   if (info[i].dates.some((item) => {fullyFilteredDates.some((item2) => {item == item2})})) {
    //     filteredGuides[i] = info[i].id
    //   }
    // }
    // console.log(filteredGuides)
    return guides
  }
  const checkDate = () => {
    let text;
    if (
      (selectedTimes[0] == true ||
        selectedTimes[1] == true ||
        selectedTimes[2] == true ||
        selectedTimes[3] == true) &&
      selectedDate == ''
    ) {
      text = 'Please select a date';
    } else if (
      selectedTimes[0] == false &&
      selectedTimes[1] == false &&
      selectedTimes[2] == false &&
      selectedTimes[3] == false &&
      selectedDate != ''
    ) {
      text = 'Please select a time';
    } else {
      text = 'Please Select a Time and Date';
    }
    if (
      (selectedTimes[0] == true ||
        selectedTimes[1] == true ||
        selectedTimes[2] == true ||
        selectedTimes[3] == true) &&
      selectedDate != ''
    ) {
      return (
        <FlatList
          style={{}}
          vertical={true}
          data={filterGuides()}
          renderItem={renderGuide}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.greyText}>{text}</Text>
        </View>
      );
    }
  };
  const renderGuide = ({item, index}) => {
    const handleOnPress = () => {
      navigation.navigate('TourBooking2', {generalTours, item})
    };

    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View>
          <ImageBackground
            style={styles.listGuideImage}
            imageStyle={{borderRadius: 60}}
            source={{uri: item.profilePicture}}></ImageBackground>
          <Text style={styles.guideName}>{item.name}</Text>
          <Text style={styles.guideTitle}>
            {item.major}, {item.year}
          </Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>
    );
  };
  //checks if time of date1 is in between time of date2 and date3
  const checkIfInRange = (date1, date2, date3) => {
    let date1M = moment(date1).format('A')
    let date2M = moment(date2).format('A')
    let date3M = moment(date3).format('A')
    date1 = parseInt(moment(date1).format('hh'+'mm'))
    date2 = parseInt(moment(date2).format('hh'+'mm'))
    date3 = parseInt(moment(date3).format('hh'+'mm'))
    //converts times 12:00PM-12:59 to 0:00PM-0:59, nessecary for easy time logic since AM switches to PM at 12:00, and 12:00 to 12:59 is larger than everything
    if (Math.trunc(date1/100) == 12) {
      date1 = date1 % 100
    }
    if (Math.trunc(date2/100) == 12) {
      date2 = date2 % 100
    }
    if (Math.trunc(date3/100) == 12) {
      date3 = date3 % 100
    }
    //If you are confused about the time Logic, just ask ryan he made a whole diagram for himself so that his brain wouldnt fry
    if (date2M == date3M) {
      if(date2 <= date3) {
        if(date2 <= date1 && date1 <= date3 && date1M == date2M) return true
        else return false
      }
      else if(date2 >= date3) {
        if(date3 < date1 && date1 < date2 && date1M == date2M) return false
        else return true
      }
    }
    else if(date2M != date3M) {
      if(date2M == 'AM') {
        if(date1M == date3M) {
          if (date1 <= date3) return true
          else return false
        }
        else if(date1M == date2M) {
          if(date1 >= date2) return true
          else return false
        }
      }
      else if(date3M == 'AM') {
        if(date1M == date3M) {
          if (date1 > date3) return false
          else return true
        }
        else if(date1M == date2M) {
          if(date1 < date2) return false
          else return true
        }
      }
    }
  }
  const convertInfoToDates = () => {
    let dates = []
    for(let i = 0; i < info.length; i++) {
      for(let j = 0; j < info[i].dates.length; j++) {
        dates[dates.length] = info[i].dates[j]
      }
    }
    return dates
  }
  const createMarkings = () => {
    let dates = convertInfoToDates()
    let filteredDates = []
    let calenderMarkings = {}

    let time1 = '2021-12-13T16:00:40.142Z' //8:00 AM
    let time2 = '2021-12-13T20:00:40.142Z' //12:00 PM
    let time3 = '2021-12-13T01:00:40.142Z' //5:00 PM
    let time4 = '2021-12-13T06:00:40.142Z' //10:00 PM
    
    
    //filter dates and then turn into calender format
    if (selectedTimes.some(value => value == true)) {
      for (let i = 0; i < dates.length; i++) {
        if (selectedTimes[0] == true) {
          if(checkIfInRange(dates[i], time1, time2)) {
            filteredDates[filteredDates.length] = dates[i]
          }
        }
        if (selectedTimes[1] == true) {
          if(checkIfInRange(dates[i], time2, time3)) {
            filteredDates[filteredDates.length] = dates[i]
          }
        }
        if (selectedTimes[2] == true) {
          if(checkIfInRange(dates[i], time3, time4)) {
            filteredDates[filteredDates.length] = dates[i]
          }
        }
        if (selectedTimes[3] == true && officialTimes[0] != '- - - -' && officialTimes[1] != '- - - -') {
          if(checkIfInRange(dates[i], officialTimes[0], officialTimes[1])) {
            filteredDates[filteredDates.length] = dates[i]
          }
        }
      }
    } else {
      for(let i = 0; i < dates.length; i++) {
        filteredDates[i] = dates[i]
      }
    }
    globalFilteredDates = filteredDates
    filteredDates = filteredDates.map((item) => {return moment(item).format("YYYY" + "-" + "MM" + "-" + "DD")})
    //this is the formatt needed by the calender, selected will have circle, marked will have dot
    for (let i = 0; i < dates.length; i++) {
      calenderMarkings[filteredDates[i]] = {};
      calenderMarkings[filteredDates[i]].marked = true;
      if (filteredDates[i] == selectedDate) {
        calenderMarkings[filteredDates[i]].selected = true;
      }
    }
    return calenderMarkings;
  };

  const displayTimePicker = () => {
    let date;
    // If start time has not been chosen yet, default time is set to 12:00PM, else it is the Start time
    if (customStartTime == '- - - -') {
      date = new Date('2000-01-01T20:00:00Z');
    } else {
      date = customStartTime;
    }
    return (
      <DatePicker
        date={date}
        mode={'time'}
        style={{
          height: 160,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 180,
        }}
        onDateChange={selectedTime => isStartOrEnd(selectedTime)}
        minuteInterval={5}
        androidVariant={'nativeAndroid'}
      />
    );
  };
  const onDayPress = day => {
    let dates = convertInfoToDates()
    let time1 = '2021-12-13T16:00:40.142Z' //8:00 AM
    let time2 = '2021-12-13T20:00:40.142Z' //12:00 PM
    let time3 = '2021-12-13T01:00:40.142Z' //5:00 PM
    let time4 = '2021-12-13T06:00:40.142Z' //10:00 PM
    let temp = [true,true,true,false]
    for (let i = 0; i < dates.length; i++) {
      if (day == moment(dates[i]).format("YYYY" + "-" + "MM" + "-" + "DD")){
        setSelectedDate(day)
        if (checkIfInRange(dates[i], time1, time2)) temp[0] = false
        if (checkIfInRange(dates[i], time2, time3)) temp[1] = false
        if (checkIfInRange(dates[i], time3, time4)) temp[2] = false
      };
    }
    setDisabledTimes(temp)
  };
  const confirm = () => {
    if (
      customStartTime != '- - - -' &&
      customEndTime != '- - - -'
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            let times = [customStartTime, customEndTime]
            setOfficialTimes(times)
          }}>
          <Text
            style={{
              fontSize: 14,
              color: white,
              backgroundColor: primary,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 6,
              marginVertical: 3,
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: grayDark,
              borderWidth: 1,
              borderColor: grayDark,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 5,
              marginVertical: 4,
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      );
    }
  };
  const checkStart = () => {
    if (customStartTime == '- - - -') {
      return customStartTime;
    } else return moment(customStartTime).format('LT');
  };
  const checkEnd = () => {
    if (customEndTime == '- - - -') {
      return customEndTime;
    } else return moment(customEndTime).format('LT');
  };

  const displayTimeRanges = index => {
    let timeRanges
    if (officialTimes[0] == '- - - -' || officialTimes[1] == '- - - -') {
      timeRanges = [
        '8:00 AM - 12:00 PM',
        '12:00 PM - 5:00 PM',
        '5:00 PM - 10:00 PM',
        '- - - -'
      ]
    } else {
      timeRanges = [
        '8:00 AM - 12:00 PM',
        '12:00 PM - 5:00 PM',
        '5:00 PM - 10:00 PM',
        moment(officialTimes[0]).format('LT') + ' - ' + moment(officialTimes[1]).format('LT')
      ]
    }
    return timeRanges[index]
  };

  const slideAnim = useRef(new Animated.Value(3)).current;
  const animation = () => {
    if (!startOrEnd) {
      Animated.timing(slideAnim, {
        toValue: 86,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <FlatList
        style={{height: '100%'}}
        ListHeaderComponent={
          <View style={{marginTop: 85, marginRight: 12, marginLeft: 12}}>
            {/*Calender__________________________________________________________________________ */}
            <View style={[styles.backCard, {paddingBottom: 15}]}>
              <View style={styles.calenderLine}></View>
              <Calendar
                // minDate={'2012-05-10'}
                // maxDate={'2012-05-30'}
                onDayPress={day => {
                  onDayPress(day.dateString);
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
                      marginTop: 10,
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
                markedDates={createMarkings()}>
              </Calendar>
            </View>

            {/*Modal____________________________________________________________________*/}
            <Modal visible={isModalVisible} transparent={true}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  width: '100%',
                  height: '100%',
                }}>
                <View
                  style={{
                    backgroundColor: white,
                    height: '42.5%',
                    width: '53%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    borderRadius: 10,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setStartOrEnd(!startOrEnd);
                      animation();
                    }}>
                    <View
                      style={{
                        backgroundColor: '#F2f2f2',
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 15,
                        borderRadius: 15,
                      }}>
                      <View
                        style={{
                          paddingLeft: 15,
                          paddingRight: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: black,
                          }}>
                          Start
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: black,
                            width: 61,
                          }}>
                          {checkStart()}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: black,
                          }}>
                          End
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: black,
                            width: 61,
                          }}>
                          {checkEnd()}
                        </Text>
                      </View>
                      <Animated.View
                        style={{
                          backgroundColor: white,
                          position: 'absolute',
                          top: '6%',
                          left: slideAnim,
                          height: '88%',
                          width: 88,
                          zIndex: -1,
                          borderRadius: 13,
                        }}></Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                  {displayTimePicker()}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '86%',
                      marginRight: '7%',
                      marginLeft: '7%',
                      borderRadius: 10,
                      justifyContent: 'space-evenly',
                    }}>
                    {/*Cancel Button */}
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        let temp = [...selectedTimes];
                        temp[3] = false;
                        setSelectedTimes(temp)
                        setCustomStartTime(officialTimes[0]);
                        setCustomEndTime(officialTimes[1]);

                      }}
                      style={{
                        fontSize: 14,
                        color: white,
                        backgroundColor: primary,
                        borderRadius: 8,
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        marginVertical: 3,
                      }}>
                      <Text style={{color: white}}>Cancel</Text>
                    </TouchableOpacity>
                    {/* Confirm button________________________________________ */}
                    {confirm()}
                  </View>
                </View>
              </View>
            </Modal>

            {/*Select times____________________________________________________________*/}
            <View style={styles.timeView}>
              {selectedTimes.map((date, index) => {
                let range = ['Morning', 'Afternoon', 'Night', 'Custom'];
                let backColor, textColor, subTextColor;
                if (disabledTimes[index]) {
                  backColor = white
                  textColor = grayLight
                  subTextColor = grayLight
                } else if (selectedTimes[index] == true) {
                  backColor = primary;
                  textColor = white;
                  subTextColor = white;
                } else{
                  backColor = white;
                  textColor = black;
                  subTextColor = grayDark;
                }
                return (
                  <TouchableOpacity
                    disabled={disabledTimes[index]}
                    key={index}
                    style={{
                      backgroundColor: backColor,
                      padding: 8,
                      marginRight: 9,
                      marginLeft: 9,
                      marginBottom: 4,
                      marginTop: 5,
                      width: 170,
                      elevation: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      updateSelectedTime(index);
                      viewModal(index);
                    }}>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 16.5,
                        fontFamily: 'Helvetica',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontWeight: '700',
                      }}>
                      {range[index]}
                    </Text>
                    <Text
                      style={{
                        color: subTextColor,
                        alignSelf: 'center',
                        fontSize: 12,
                        fontWeight: '400',
                      }}>
                      {displayTimeRanges(index)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/*Tour Guides Available________________________________________________________*/}
            <View style={styles.guideBox}>
              <View style={{marginTop: 25}}>
                <Text style={[styles.sectionText, {paddingBottom: 15}]}>
                  Tour Guides Available
                </Text>
                <View style={styles.line}></View>
              </View>
              {checkDate()}

              <View style={{width: '100%', height: 45}}></View>
            </View>
          </View>
        }
      />
      {/*Header______________________________________________________________________________ */}
      <View
        style={{
          backgroundColor: primary,
          height: 80,
          width: '100%',
          position: 'absolute',
        }}>
        <Text style={[styles.titleText, {marginTop: 20}]}>Select Date</Text>
      </View>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greyText: {
    color: grayLight,
    borderWidth: 2,
    borderColor: grayLight,
    marginTop: 20,
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 15,
  },
  timeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  line: {
    borderBottomColor: grayLight,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backCard: {
    flex: 1,
    backgroundColor: white,
    marginTop: 10,
    borderRadius: 25,
    //ios only
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    //android only
    elevation: 10,
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 27,
    color: white,
    fontFamily: 'Helvetica-Bold',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  listGuideImage: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,

    width: 70,
    height: 70,
  },
  guideBox: {
    backgroundColor: white,
    borderRadius: 25,
    marginBottom: 10,
    minHeight: 160,
    //ios only
    shadowOffset: {width: 10, height: 20},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    //android only
    elevation: 10,
  },
  guideName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    position: 'absolute',
    top: 20,
    left: 100,
    color: black,
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Oblique',
    position: 'absolute',
    bottom: 20,
    left: 100,
    color: black,
  },
  backIcon: {
    backgroundColor: white,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 22,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calenderLine: {
    width: '90%',
    height: 0.75,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 95,
    alignSelf: 'center',
    zIndex: 10,
  },
});

export default TourBooking1;
