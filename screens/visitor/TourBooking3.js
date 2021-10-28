import React, {Component} from 'react';
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
import {black, white, primary, grayLight, grayDark} from '../../config/colors';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

class TourBooking3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visitorCount: 1,
      selectedDate: '',
      times: [Date(), Date(), Date(), Date(), Date()],
      selectedTime: -1,
      selectedMeet: 0,
      modalVisible: false,
      region: {
        latitude: 34.06938658533915,
        longitude: -118.44459559768438,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0011,
      },
      marks: [
        '2012-05-16',
        '2021-10-18',
        '2021-10-19',
        '2021-10-21',
        '2021-10-22',
        '2021-10-23',
        '2021-10-26',
        '2021-10-27',
      ],
    };
  }

  setVisitorCount(count) {
    this.setState({
      visitorCount: count,
    });
  }

  setSelectedTime(time) {
    this.setState({
      selectedTime: time,
    });
  }

  setSelectedMeet(meet) {
    this.setState({
      selectedMeet: meet,
    });
  }

  openModal() {
    this.setState({
      modalVisible: true,
      selectedMeet: 1,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
    this.takeSnapshot();
  }

  timeSelect(index) {
    if (this.state.selectedTime == index) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: primary,
            borderRadius: 10,
            paddingHorizontal: 11,
            paddingVertical: 7,
            marginRight: 7,
            marginLeft: 7,
            marginBottom: 10,
          }}>
          <Text style={{color: white, fontSize: 15}}>
            {moment(this.state.times[index]).format('LT')}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: white,
            borderColor: '#3154A5',
            borderWidth: 1.2,
            borderRadius: 10,
            paddingHorizontal: 11,
            paddingVertical: 7,
            marginRight: 7,
            marginLeft: 7,
            marginBottom: 10,
          }}
          onPress={() => this.setSelectedTime(index)}>
          <Text style={{color: primary, fontSize: 15}}>
            {moment(this.state.times[index]).format('LT')}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  onRegionChange = region => {
    this.setState({
      region,
      // region: {
      //     latitude: region.latitude - 0.00059, //error correction
      //     longitude: region.longitude + 0.00099,
      //     latitudeDelta: 0.0050,
      //     longitudeDelta: 0.0011,
      // }
    });
    // console.log(this.state.region)
  };

  takeDefaultSnapshot() {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = this.map.takeSnapshot({
      width: 320, // optional, when omitted the view-width is used
      height: 90, // optional, when omitted the view-height is used
      region: {
        latitude: 34.07106828093279,
        longitude: -118.444993904947,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0011,
      }, // iOS only, optional region to render
      format: 'jpg', // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file', // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      return uri;
    });
  }

  takeSnapshot() {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = this.map.takeSnapshot({
      width: 320, // optional, when omitted the view-width is used
      height: 90, // optional, when omitted the view-height is used
      region: this.state.region, // iOS only, optional region to render
      format: 'jpg', // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file', // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      this.setState({customSnapshot: uri});
    });
    // console.log(this.state.customSnapshot)
  }
  createMarkings = () => {
    let calenderMarkings = {};
    for (let i = 0; i < this.state.marks.length; i++) {
      calenderMarkings[this.state.marks[i]] = {};
      calenderMarkings[this.state.marks[i]].marked = true;
      if (this.state.marks[i] == this.state.selectedDate) {
        calenderMarkings[this.state.marks[i]].selected = true;
      }
    }
    return calenderMarkings;
  };
  onDayPress = day => {
    for (let i = 0; i < this.state.marks.length; i++) {
      if (day == this.state.marks[i]) this.setState({selectedDate: day});
    }
  };
  showMeetingPoint = () => {
    if (this.state.selectedTime != -1) {
      return (
        <View>
          <Text style={styles.sectionText}>Meeting Point</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => this.setSelectedMeet(0)}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      this.state.selectedMeet == 0 ? '#3154A5' : 'white',
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
              onPress={() => this.setSelectedMeet(1)}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      this.state.selectedMeet == 1 ? '#3154A5' : 'white',
                  },
                ]}></View>
            </TouchableOpacity>
            <Text style={{marginLeft: 10, marginTop: 2}}>Select:</Text>
          </View>
          <TouchableOpacity
            style={{height: 90, backgroundColor: 'grey', marginTop: 10}}
            onPress={() => this.openModal()}>
            <MapView
              pointerEvents="none"
              style={{flex: 1}}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.002,
              }}>
              <Marker
                key={2}
                coordinate={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
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
  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal.bind(this);
          }}>
          <MapView
            ref={map => {
              this.map = map;
            }}
            style={{flex: 1, justifyContent: 'center'}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={this.state.region}
            onRegionChangeComplete={this.onRegionChange}></MapView>
          <TouchableOpacity
            style={[styles.backIcon, {backgroundColor: primary}]}
            onPress={() => this.closeModal()}>
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
            <View style={{marginTop: 80}}>
              <View style={{height: 100, flex: 1, position: 'relative'}}>
                <ImageBackground
                  style={styles.imageHeader}
                  source={require('../../images/Westwood_village.png')}>
                  <View style={styles.shader}></View>
                  <Text
                    style={{
                      color: white,
                      position: 'absolute',
                      bottom: 25,
                      left: 20,
                      fontSize: 30,
                      fontFamily: 'Helvetica-Bold',
                    }}>
                    Westwood Tour
                  </Text>
                  <Text style={styles.tourGuideText}>Tour Guide: Brittany</Text>
                  <ImageBackground
                    style={styles.tourGuideProfile}
                    imageStyle={{borderRadius: 40}}
                    source={require('../../images/brittany.png')}></ImageBackground>
                </ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 60,
                  backgroundColor: white,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 20, fontWeight: '700', fontSize: 19}}>
                  Visitors
                </Text>
                <TouchableOpacity
                  style={
                    this.state.visitorCount == 1
                      ? styles.minusDisabled
                      : styles.minus
                  }
                  onPress={() =>
                    this.setVisitorCount(this.state.visitorCount - 1)
                  }
                  disabled={this.state.visitorCount == 1 ? true : false}>
                  <Ionicons
                    name="remove-outline"
                    color={this.state.visitorCount == 1 ? '#9B9BA7' : 'white'}
                    style={{
                      alignSelf: 'center',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}
                    size={15}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.number}>{this.state.visitorCount}</Text>
                <TouchableOpacity
                  style={styles.plus}
                  onPress={() =>
                    this.setVisitorCount(this.state.visitorCount + 1)
                  }>
                  <Text style={{color: white, alignSelf: 'center'}}>+</Text>
                </TouchableOpacity>
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
                    this.onDayPress(day.dateString);
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
                  markedDates={this.createMarkings()}></Calendar>
              </View>

              {/*Select Time________________________________________________________ */}
              <View style={[styles.backCard, {paddingBottom: 5}]}>
                <Text style={styles.sectionText}>Select Time</Text>
                <View style={styles.timeView}>
                  {[...Array(this.state.times.length).keys()].map(index =>
                    this.timeSelect(index),
                  )}
                </View>
              </View>

              {/* Meeting Point_______________________________________________________________ */}
              <View
                style={[
                  styles.backCard,
                  {paddingLeft: 40, paddingRight: 40, paddingBottom: 30},
                ]}>
                {this.showMeetingPoint()}
              </View>

              {/* Aditional Requests_______________________________ */}
              <View
                style={[
                  styles.backCard,
                  {paddingLeft: 30, paddingRight: 30, paddingBottom: 30},
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
                  }}
                  multiline={true}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: 100,
                  backgroundColor: white,
                  marginTop: 10,
                  justifyContent: 'center',
                  padding: 20,
                }}>
                <TouchableOpacity
                  style={styles.continue}
                  onPress={item => {
                    //TODO: fix this
                    console.log(
                      'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
                    );
                    console.log(item);
                    this.props.navigation.navigate('BookingCheckout', {item});
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: white,
                      fontWeight: '600',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />

        {/*Header_________________________________________________________________ */}
        <View
          style={{
            backgroundColor: primary,
            height: 80,
            width: '100%',
            position: 'absolute',
          }}>
          <Text style={[styles.titleText, {marginTop: 20}]}>Booking</Text>
        </View>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={20} color={primary} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
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
    top: 22,
    width: 40,
    height: 40,
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

export default TourBooking3;