import React, { useState }from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, 
    TouchableOpacity, Image, ImageBackground, Modal} from 'react-native';
import { black, white } from '../config/colors';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Booking = ({navigation}) => {
    const [ visitorCount, setVisitorCount ] = useState(0);
    const [ selected, setSelected ] = useState('2021-08-09');
    const [ times, setTimes ] = useState([Date(), Date(), Date()]);
    const [ selectedTime, setSelectedTime ] = useState(0);
    const [ selectedMeet, setSelectedMeet ] = useState(0);
    const [ modalVisible, setModalVisible ] = useState(false);
    const onDayPress = (day) => {
        setSelected(day.dateString)
    }

    const timeSelect = (index) => {
        if (selectedTime == index) {
            return(
                <TouchableOpacity style={{backgroundColor: "#3154A5", borderColor: "#3154A5", 
                borderWidth: 2, borderRadius: 10, padding: 10, marginRight: 10, marginLeft: 10}}>
                    <Text style={{color: "white"}}>{moment(times[index]).format("LT")}</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity style={{backgroundColor: white, borderColor: "#3154A5", 
                borderWidth: 2, borderRadius: 10, padding: 10, marginRight: 10, marginLeft: 10}}
                onPress={() => setSelectedTime(index)}>
                    <Text style={{color: "#3154A5"}}>{moment(times[index]).format("LT")}</Text>
                </TouchableOpacity>
            )
        }
    }

    return(
        <SafeAreaView>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <MapView
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    initialRegion = {{
                        latitude: 34.07106828093279, 
                        longitude: -118.444993904947,
                        latitudeDelta: 0.0050,
                        longitudeDelta: 0.0011,
                    }}
                >
                    <TouchableOpacity style={styles.backIcon} onPress={() => setModalVisible(false)}>
                        <Ionicons name='chevron-back-outline' size={20} color={white} />
                    </TouchableOpacity>
                    <Marker
                        key={0}
                        coordinate={{latitude: 34.07106828093279, longitude: -118.444993904947}}
                        title="Bruin Bear"
                        description="hello"
                    />
                </MapView>
            </Modal>
            <ScrollView overScrollMode="never" style={{height: "100%"}}>
                <View style={{height: 100, flex: 1, position: 'relative'}}>
                    <ImageBackground style={styles.imageHeader} source={require('../images/Westwood_village.png')}>
                        <View style={styles.shader}></View>
                        <Text style={styles.titleText}>Westwood Tour</Text>
                        <Text style={styles.tourGuideText}>Tour Guide: Brittany</Text>
                        <ImageBackground style={styles.tourGuideProfile} imageStyle={{borderRadius: 40}} source={require('../images/brittany.png')}
                        ></ImageBackground> 
                    </ImageBackground> 
                </View>
                <View style={{flex: 1, height: 50, backgroundColor: white, position: 'relative'}}>
                    <Text style={{marginLeft: 20, marginTop: 15, fontWeight: '600'}}>Visitors</Text>
                    <TouchableOpacity style={styles.minus} onPress={() => setVisitorCount(visitorCount-1)}>
                        <Text style={{color: white, alignSelf: 'center'}}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.number}>{visitorCount}</Text>
                    <TouchableOpacity style={styles.plus} onPress={() => setVisitorCount(visitorCount+1)}>
                        <Text style={{color: white, alignSelf: 'center'}}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.backCard, {height: 400}]}>
                    <Text style={styles.sectionText}>Select Date</Text>
                    <Calendar
                        // minDate={'2012-05-10'}
                        // maxDate={'2012-05-30'}
                        onDayPress={onDayPress}
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
                            arrowColor: "#3154A5",
                            todayTextColor: "#3D68CC",
                            monthTextColor: "#3154A5",
                            textMonthFontWeight: "600",
                        }}

                        markedDates={{
                            [selected]: {
                              selected: true,
                              disableTouchEvent: true,
                              selectedColor: '#3154A5',
                              selectedTextColor: 'white'
                            }
                          }}
                    >
                    </Calendar>
                </View>
                <View style={[styles.backCard, {height: 180}]}>
                    <Text style={styles.sectionText}>Select Time</Text>
                    <View style={styles.timeView}>
                        {[...Array(times.length).keys()].map((index) =>  
                            timeSelect(index)
                        )}
                    </View>
                </View>
                <View style={[styles.backCard, {height: 330, paddingLeft: 30, paddingRight: 30}]}>
                    <Text style={styles.sectionText}>Meeting Point</Text>
                    <View style={{flexDirection: "row", marginTop: 20}}>
                        <TouchableOpacity style={styles.circle} onPress={() => setSelectedMeet(0)}>
                            <View style={[styles.innerCircle, {backgroundColor: selectedMeet==0?"#3154A5":"white"}]}></View>
                        </TouchableOpacity>
                        <Text style={{marginLeft: 10, marginTop: 2}}>Recommended:</Text>
                        <Text style={{marginLeft: 10, marginTop: 2}}>Bruin Bear Statue</Text>
                    </View>
                    <View style={{height: 90, backgroundColor: "grey", marginTop: 5}}></View>
                    <View style={{flexDirection: "row", marginTop: 10}}>
                        <TouchableOpacity style={styles.circle} onPress={() => setSelectedMeet(1)}>
                            <View style={[styles.innerCircle, {backgroundColor: selectedMeet==1?"#3154A5":"white"}]}></View>
                        </TouchableOpacity>
                        <Text style={{marginLeft: 10, marginTop: 2}}>Select:</Text>
                    </View>
                    <TouchableOpacity style={{height: 90, backgroundColor: "grey", marginTop: 5}}
                    onPress={() => setModalVisible(true)}></TouchableOpacity>
                </View>
                <View style={[styles.backCard, {height: 250, paddingLeft: 30, paddingRight: 30, paddingBottom: 30}]}>
                    <Text style={styles.sectionText}>Additional Requirements</Text>
                    <View style={{flex: 1, borderColor: "#9B9BA7", borderRadius: 10, borderWidth: 2, marginTop: 20}}>

                    </View>
                </View>
                <View style={{flex: 1, height: 100, backgroundColor: white, marginTop: 10, justifyContent: 'center', padding: 20}}>
                    <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate("Checkout")}>
                        <Text style={{alignSelf: "center", color: white, fontWeight: '600'}}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Helvetica"
    },
    titleText: {
        fontSize: 28,
        fontWeight: '600',
        color: white,
        position: 'absolute',
        bottom: 30,
        left: 20
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: 20
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
        opacity: 0.3,
        backgroundColor: black,
        position: 'absolute',
        bottom: 0
    },
    tourGuideText: {
        fontSize: 14,
        fontWeight: '400',
        width: 100,
        color: white,
        position: 'absolute',
        bottom: 30,
        right: 45
    },
    tourGuideProfile: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 20,
        bottom: 25
    },
    minus: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 15,
        right: 80,
        backgroundColor: '#3154A5',
        color: white,
        borderRadius: 4
    },
    minusDisabled: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 15,
        right: 80,
        backgroundColor: 'white',
        color: 'grey',
        borderRadius: 4
    },
    number: {
        position: 'absolute',
        right: 60,
        top: 17,
    },
    plus: {
        position: 'absolute',
        width: 20,
        height: 20,
        right: 30,
        top: 15,
        backgroundColor: '#3154A5',
        borderRadius: 4
    },
    backCard: {
        flex: 1,
        backgroundColor: white, 
        marginTop: 10, 
        borderRadius: 10, 
        marginLeft: 5, 
        marginRight: 5,
        shadowColor: "#c3c3c3",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    timeView: {
        flex: 3,
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 10,
        justifyContent: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#9B9BA7",
        borderRadius: 50,
        justifyContent: 'center',
        alignContent: 'center'
    },
    innerCircle: {
        width: 13,
        height: 13,
        borderRadius: 50,
        alignSelf: 'center'
    },
    continue: {
        backgroundColor: "#3154A5",
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#adadad",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    backIcon: {
        backgroundColor: '#3154A5',
        borderRadius: 10,
        borderColor: white,
        borderWidth: 1,
        position: 'absolute',
        left: 20,
        top: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Booking;