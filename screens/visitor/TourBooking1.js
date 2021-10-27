import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors, {black, grayDark} from '../../config/colors';
import {color} from 'react-native-reanimated';
import GuideProfile from './GuideProfile';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Calendar} from 'react-native-calendars';
import moment, {duration} from 'moment';
import DatePicker from 'react-native-date-picker';
import {nativeViewProps} from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';

const TourBooking1 = ({navigation}) => {
  const [tourimages, setImages] = useState([
    {name: 'Santa Monica', src: require('../../images/Santa_Monica.png')},
    {name: 'Westwood Tour', src: require('../../images/Westwood_village.png')},
  ]);
  const [marks, setMarks] = useState([
    '2012-05-16',
    '2021-10-18',
    '2021-10-19',
    '2021-10-21',
    '2021-10-22',
    '2021-10-23',
    '2021-10-26',
    '2021-10-27',
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [times, setTimes] = useState({
    timeRanges: [
      '8:00 AM - 12:00 PM',
      '12:00 PM - 5:00 PM',
      '5:00 PM - 10:00 PM',
      ['- - - -', ''],
    ],
    selectedTimes: [false, false, false, false],
  });
  const [customStartTime, setCustomStartTime] = useState('Please Select');
  const [customEndTime, setCustomEndTime] = useState('Please Select');
  const [isModalVisible, setModalVisible] = useState(false);
  const [startOrEnd, setStartOrEnd] = useState(false);
  const [guideimages, setGuideImages] = useState([
    {
      name: 'Natalie',
      year: 'Junior',
      major: 'Psychobiology',
      src: require('../../images/natalie.png'),
    },
    {
      name: 'Trevor',
      year: 'Senior',
      major: 'Marketing',
      src: require('../../images/trevor.png'),
    },
    {
      name: 'Brittany',
      year: 'Junior',
      major: 'Mechanical Eng.',
      src: require('../../images/brittany.png'),
    },
  ]);
  const formatTime = selectedTime => {
    if (startOrEnd) {
      setCustomEndTime(selectedTime);
    } else {
      setCustomStartTime(selectedTime);
    }
  };
  const updateSelectedTime = index => {
    let marker = [...times.selectedTimes];
    marker[index] = !times.selectedTimes[index];
    setTimes({
      timeRanges: [...times.timeRanges],
      selectedTimes: marker,
    });
  };
  const viewModal = index => {
    if (index == 3 && times.selectedTimes[3] == false) {
      setModalVisible(true);
    }
  };

  const checkDate = () => {
    let text;
    if (
      (times.selectedTimes[0] == true ||
        times.selectedTimes[1] == true ||
        times.selectedTimes[2] == true ||
        times.selectedTimes[3] == true) &&
      selectedDate == ''
    ) {
      text = 'Please select a date';
    } else if (
      times.selectedTimes[0] == false &&
      times.selectedTimes[1] == false &&
      times.selectedTimes[2] == false &&
      times.selectedTimes[3] == false &&
      selectedDate != ''
    ) {
      text = 'Please select a time';
    } else {
      text = 'Please Select a Time and Date';
    }
    if (
      (times.selectedTimes[0] == true ||
        times.selectedTimes[1] == true ||
        times.selectedTimes[2] == true ||
        times.selectedTimes[3] == true) &&
      selectedDate != ''
    ) {
      return (
        <FlatList
          style={{}}
          vertical={true}
          data={guideimages}
          renderItem={renderItem}
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
  const renderItem = ({item}) => {
    const handleOnPress = () => navigation.navigate('TourBooking2', {item});
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View>
          <ImageBackground
            style={styles.listGuideImage}
            imageStyle={{borderRadius: 60}}
            source={item.src}></ImageBackground>
          <Text style={styles.guideName}>{item.name}</Text>
          <Text style={styles.guideTitle}>
            {item.major}, {item.year}
          </Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>
    );
  };

  const createMarkings = () => {
    let calenderMarkings = {};
    for (let i = 0; i < marks.length; i++) {
      calenderMarkings[marks[i]] = {};
      calenderMarkings[marks[i]].marked = true;
      if (marks[i] == selectedDate) {
        calenderMarkings[marks[i]].selected = true;
      }
    }
    return calenderMarkings;
  };

  const displayTimePicker = () => {
    let date;
    // If start time has not been chosen yet, default time is set to 12:00PM, else it is the Start time
    if (customStartTime == 'Please Select') {
      date = new Date('2000-01-01T20:00:00Z');
    } else {
      date = customStartTime;
    }
    // If Start Time is chosen, End time cannot be lower then start time, and vice versa
    if (customStartTime != 'Please Select' && startOrEnd == true) {
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
          onDateChange={selectedTime => formatTime(selectedTime)}
          minuteInterval={5}
          androidVariant={'nativeAndroid'}
          minimumDate={customStartTime}
        />
      );
    } else if (customEndTime != 'Please Select' && startOrEnd == false) {
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
          onDateChange={selectedTime => formatTime(selectedTime)}
          minuteInterval={5}
          androidVariant={'nativeAndroid'}
          maximumDate={customEndTime}
        />
      );
    } else
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
          onDateChange={selectedTime => formatTime(selectedTime)}
          minuteInterval={5}
          androidVariant={'nativeAndroid'}
        />
      );
  };
  const onDayPress = day => {
    for (let i = 0; i < marks.length; i++) {
      if (day == marks[i]) setSelectedDate(day);
    }
  };
  const confirm = () => {
    if (
      customStartTime != 'Please Select' &&
      customEndTime != 'Please Select'
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            let timeRanges = [...times.timeRanges];
            let selectedTimes = [...times.selectedTimes];
            timeRanges[3][0] = customStartTime;
            timeRanges[3][1] = customEndTime;
            setTimes({
              timeRanges,
              selectedTimes,
            });
          }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.white,
              backgroundColor: colors.primary,
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
              color: colors.grayDark,
              borderWidth: 1,
              borderColor: colors.grayDark,
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
    if (customStartTime == 'Please Select') {
      return customStartTime;
    } else return moment(customStartTime).format('LT');
  };
  const checkEnd = () => {
    if (customEndTime == 'Please Select') {
      return customEndTime;
    } else return moment(customEndTime).format('LT');
  };

  const checkIfCustom = index => {
    if (index == 3 && times.timeRanges[3][0] != '- - - -')
      return (
        moment(times.timeRanges[3][0]).format('LT') +
        ' - ' +
        moment(times.timeRanges[3][1]).format('LT')
      );
    else return times.timeRanges[index];
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
                          borderColor: colors.grayLight,
                        }}>
                        <Ionicons
                          name="chevron-back-outline"
                          size={11}
                          color={colors.primary}
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
                          borderColor: colors.grayLight,
                        }}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={11}
                          color={colors.primary}
                          style={{padding: 4}}
                        />
                      </View>
                    );
                  }
                }}
                theme={{
                  arrowColor: colors.primary,
                  todayTextColor: colors.black,
                  textDayFontFamily: 'Roboto-Medium',
                  textDayFontSize: 16,
                  monthTextColor: colors.black,
                  textMonthFontSize: 17,
                  textMonthFontFamily: 'Raleway-SemiBold',
                  dotColor: colors.primary,
                  selectedDotColor: colors.primary,
                  dayTextColor: colors.black,
                  selectedDayTextColor: colors.white,
                  selectedDayBackgroundSize: 20,
                  selectedDotColor: colors.white,
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
                      backgroundColor: colors.primary,
                    },
                  },
                  'stylesheet.calendar.main': {
                    container: {
                      marginTop: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: colors.white,
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
                      color: colors.black,
                      margin: 10,
                      marginBottom: 17,
                    },
                  },
                }}
                markedDates={createMarkings()}></Calendar>
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
                    backgroundColor: colors.white,
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
                            color: colors.black,
                          }}>
                          Start
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: colors.black,
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
                            color: colors.black,
                          }}>
                          End
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: colors.black,
                            width: 61,
                          }}>
                          {checkEnd()}
                        </Text>
                      </View>
                      <Animated.View
                        style={{
                          backgroundColor: colors.white,
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
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        let timeRanges = [...times.timeRanges];
                        let selectedTimes = [...times.selectedTimes];
                        selectedTimes[3] = false;
                        setTimes({
                          timeRanges,
                          selectedTimes,
                        });
                        //if cancel, set custom time state to previous times
                        if (times.timeRanges[3][0] != '- - - -') {
                          setCustomStartTime(times.timeRanges[3][0]);
                          setCustomEndTime(times.timeRanges[3][1]);
                        }
                      }}
                      style={{
                        fontSize: 14,
                        color: colors.white,
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        marginVertical: 3,
                      }}>
                      <Text style={{color: colors.white}}>Cancel</Text>
                    </TouchableOpacity>
                    {/* Confirm button________________________________________ */}
                    {confirm()}
                  </View>
                </View>
              </View>
            </Modal>

            {/*Select times____________________________________________________________*/}
            <View style={styles.timeView}>
              {times.selectedTimes.map((date, index) => {
                let range = ['Morning', 'Afternoon', 'Night', 'Custom'];
                let backColor, textColor, subTextColor;
                if (times.selectedTimes[index] == true) {
                  backColor = colors.primary;
                  textColor = colors.white;
                  subTextColor = colors.white;
                } else {
                  backColor = colors.white;
                  textColor = colors.black;
                  subTextColor = colors.grayDark;
                }
                return (
                  <TouchableOpacity
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
                      {checkIfCustom(index)}
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
              {/* extra White space at bottom */}
              <View style={{width: '100%', height: 45}}></View>
            </View>
          </View>
        }
      />
      {/*Header______________________________________________________________________________ */}
      <View
        style={{
          backgroundColor: colors.primary,
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
          color={colors.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalButtons: {
    marginLeft: 'auto',
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 12,
  },
  greyText: {
    color: colors.grayLight,
    borderWidth: 2,
    borderColor: colors.grayLight,
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
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backCard: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 25,
    //ios only
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    //android only
    elevation: 10,
  },
  baseText: {
    fontFamily: 'Helvetica',
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 27,
    color: colors.white,
    fontFamily: 'Helvetica-Bold',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    height: 50,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#656565',
    borderRadius: 7,
    paddingLeft: 20,
  },
  searchicon: {
    position: 'absolute',
    right: 10,
    top: 11,
  },
  recommendationbuttonleft: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 7,
    height: 100,
    marginRight: 15,
  },
  recommendationbuttonright: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 7,
    height: 100,
  },
  recommendationTitle: {
    marginTop: 15,
    marginLeft: 15,
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
  },
  listGuideImage: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,

    width: 70,
    height: 70,
  },
  tourText: {
    width: 200,
    fontWeight: '600',
    fontSize: 18,
    color: colors.white,
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  guideBox: {
    backgroundColor: colors.white,
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
    color: colors.black,
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Oblique',
    position: 'absolute',
    bottom: 20,
    left: 100,
    color: colors.black,
  },
  linearGradTour: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  linearGradGuide: {
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  backIcon: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 22,
    width: 40,
    height: 40,
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
