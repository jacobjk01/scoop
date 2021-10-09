import React, {useState, Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors, {black} from '../../config/colors';
import {color} from 'react-native-reanimated';
import GuideProfile from './GuideProfile';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const TourBooking1 = ({navigation}) => {
  const [tourimages, setImages] = useState([
    {name: 'Santa Monica', src: require('../../images/Santa_Monica.png')},
    {name: 'Westwood Tour', src: require('../../images/Westwood_village.png')},
  ]);
  const [calender, setCalender] = useState({
    selected: '',
  });
  const [time, setTime] = useState({
    range: ['Morning', 'Afternoon', 'Night', 'All'],
    selectedTime: [false, false, false, false],
  });
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
  const updateSelectedTime = (index, value) => {
    let marker = [...time.selectedTime];
    marker[index] = value;
    setTime({
      range: [...time.range],
      selectedTime: marker,
    });
  };
  const checkDate = () => {
    if (
      (time.selectedTime[0] == true ||
        time.selectedTime[1] == true ||
        time.selectedTime[2] == true ||
        time.selectedTime[3] == true) &&
      calender.selected != ''
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
      if (
        (time.selectedTime[0] == true ||
          time.selectedTime[1] == true ||
          time.selectedTime[2] == true ||
          time.selectedTime[3] == true) &&
        calender.selected == ''
      ) {
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.greyText, {width: '50%'}]}>
              Please Select a Date
            </Text>
          </View>
        );
      } else if (
        time.selectedTime[0] == false &&
        time.selectedTime[1] == false &&
        time.selectedTime[2] == false &&
        time.selectedTime[3] == false &&
        calender.selected != ''
      ) {
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.greyText, {width: '50%'}]}>
              Please Select a Time
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.greyText, {width: '70%'}]}>
              Please Select a Time and Date
            </Text>
          </View>
        );
      }
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
  const onDayPress = day => {
    setCalender({selected: day.dateString});
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.grayLight}}>
      <FlatList
        style={{height: '100%'}}
        ListHeaderComponent={
          <View style={{marginTop: 90, marginRight: 10, marginLeft: 10}}>
            <View style={[styles.backCard, {paddingBottom: 10, height: 390}]}>
              <Text style={[styles.sectionText, {marginTop: 20}]}>
                Select Date
              </Text>
              <View style={styles.calenderLine}></View>
              <Calendar
                // minDate={'2012-05-10'}
                // maxDate={'2012-05-30'}
                onDayPress={day => {
                  onDayPress(day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMM yyyy'}
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
                theme={{
                  arrowColor: '#3154A5',
                  todayTextColor: '#3D68CC',
                  monthTextColor: '#3154A5',
                  textMonthFontWeight: '600',
                }}
                markedDates={{
                  [calender.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: '#3154A5',
                    selectedTextColor: 'white',
                  },
                }}></Calendar>
            </View>
            {/*Select Time*/}
            <View style={styles.timeView}>
              {time.range.map((date, index) => {
                let times = [
                  '8:00 - 12:00',
                  '12:00 - 5:00',
                  '5:00 - 10:00',
                  '- - - -',
                ];
                if (time.selectedTime[index] == true) {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        marginRight: 10,
                        marginLeft: 10,
                        marginBottom: 5,
                        marginTop: 5,
                        width: 150,
                        elevation: 10,
                      }}
                      onPress={() => {
                        updateSelectedTime(index, false);
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 18,
                          fontFamily: 'Helvetica-Bold',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}>
                        {time.range[index]}
                      </Text>
                      <Text style={{color: colors.white, alignSelf: 'center'}}>
                        {times[index]}
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.white,
                        padding: 10,
                        marginRight: 10,
                        marginLeft: 10,
                        marginBottom: 5,
                        marginTop: 5,
                        width: 150,
                        elevation: 10,
                      }}
                      onPress={() => {
                        updateSelectedTime(index, true);
                      }}>
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: 18,
                          fontFamily: 'Helvetica-Bold',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}>
                        {time.range[index]}
                      </Text>
                      <Text style={{color: colors.black, alignSelf: 'center'}}>
                        {times[index]}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
            <View style={styles.guideBox}>
              <View style={{marginTop: 25}}>
                <Text style={[styles.sectionText, {paddingBottom: 15}]}>
                  Tour Guides Available
                </Text>
                <View style={styles.line}></View>
              </View>
              {checkDate()}
            </View>
            {/* <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate("GuideProfile2")}>
            <Text style={{alignSelf: "center", color: 'white', fontWeight: '600'}}>Book Now</Text>
        </TouchableOpacity> */}
          </View>
        }
      />
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
  greyText: {
    color: colors.grayLight,
    borderWidth: 2,
    borderColor: colors.grayLight,
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 'auto',
    paddingBottom: 10,
    fontSize: 18,
    borderRadius: 15,
  },
  timeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    fontSize: 24,
    color: colors.white,
    fontFamily: 'Helvetica-Bold',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '600',
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
    top: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calenderLine: {
    width: '95%',
    height: 1,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    zIndex: 10,
  },
});

export default TourBooking1;
