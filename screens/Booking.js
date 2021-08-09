import React, { useState }from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ImageBackground, Touchable} from 'react-native';
import { black, white } from '../config/colors';

import { Calendar } from 'react-native-calendars';


const Booking = ({navigation}) => {
    const [ visitorCount, setVisitorCount ] = useState(0);
    const [ selected, setSelected ] = useState('2021-08-09');

    const onDayPress = (day) => {
        setSelected(day.dateString)
    }

    return(
        <SafeAreaView>
            <ScrollView style={{height: "100%"}}>
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
                <View style={{flex: 1, height: 400, backgroundColor: white, marginTop: 10}}>
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
                <View style={{flex: 1, height: 100, backgroundColor: white, marginTop: 10}}>
                    <Text style={styles.sectionText}>Select Time</Text>
                </View>
                <View style={{flex: 1, height: 100, backgroundColor: white, marginTop: 10}}>
                    <Text style={styles.sectionText}>Meeting Point</Text>
                </View>
                <View style={{flex: 1, height: 200, backgroundColor: white, marginTop: 10}}>
                    <Text style={styles.sectionText}>Additional Requirements</Text>    
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Checkout')}
                style={{flex: 1, alignSelf: "center", height: 20, backgroundColor: '#3D68CC'}}>
                    <Text>Checkout</Text>
                </TouchableOpacity>
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
    }
})

export default Booking;