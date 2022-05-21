import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black, gray, lightGray, darkGray, white, primary} from '../config/colors';
import {reg10, reg12, reg14, reg16, reg18, bold16, bold18, bold20, bold24, oblique16} from '../config/typography.js'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton';
import moment from 'moment';
import { capitalizeFirstLetter } from 'utils';
import { getUserByRef } from 'api/users';

const ViewTour = ({ navigation, route }) => {
    const [people, setPeople] = useState(flow == 'guide'?null:route.params.people)
    const flow = route.params.flow
    //route.params.people = [{major: vetinernerian, profilePicture:asdrgds, name: Angelica, year: Sophmore }, ...]

    useEffect(() => {
        if(flow == 'guide'){
            async function getUser(){
                let user = await getUserByRef(route.params.tour.visitorId)
                setPeople([user._data])
                return user
            }
            getUser()
        }
    },[])

    const {meetPoint, tourName, date, visitors} = route.params.tour
    const curTime = '12:00 PM';
    const activeTour = route.params.tour.startTime == curTime ? true : false;
    const itinerary = [
        {'name': 'Diddy Riese', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Regency Theater', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Copymat', 'description': 'Integer lorem volutpat rhoncus, tellus neque, blandit et ut.'},
        {'name': 'CVS', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Target', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Elyse Bakery', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    ]

    return (
      <>
        <SafeAreaView style={{flex:1, backgroundColor: white}}>
            <ScrollView style={{height: '100%'}}>
            <Header title='Westwood Tour' navigation={navigation} backgroundColor={white} color={primary}/>
                {activeTour ? null : renderTourInfo(date, visitors, meetPoint)}
                <View style={styles.divider}/>
                {renderInfo(people?people:[{major: null, profilePicture: null, year: null,name: null}], flow)}
                {flow == 'guide' ? renderItinerary(itinerary) : null}
            </ScrollView>
            {flow == 'visitor'?
                <>
                    <ContactButtton/>
                    <CancelButtton/>
                </>:
                (activeTour ? <CompleteButton /> : null)
            }
        
        </SafeAreaView>
      </>
    )
}

const renderTourInfo = (date, visitors, meetPoint) => {
    return (
        <View style={styles.tourInfoCard}>
            <View style={{padding: 30}}>
                <Text style={styles.sectionTitleText}>Tour Info</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5}}>
                    {renderTextQuadrant('Date', capitalizeFirstLetter(moment(date).format('MMM')) + ' ' + moment(date).format('DD'))}
                    {renderTextQuadrant('Time', moment(date).format('LT'))}
                    {renderTextQuadrant('Visitors', visitors)}
                    {renderTextQuadrant('Meetup Point', meetPoint)}
                </View>
            </View>
        </View>
    );
};

const renderInfo = (people, flow) => {

    return (
        <View style={styles.visitorInfoCard}>
            <View style={{padding: 30}}>
                <Text style={styles.sectionTitleText}>{flow == 'visitor'?'Guide Info':'Visitor Info'}</Text>
                <View style={{flexDirection: 'column', flexWrap: 'wrap', paddingLeft: 5}}>
                    {people.map((person) => {
                        return  (
                            <>
                                {renderPerson(person.major, person.name, person.profilePicture, person.year)}
                                {/* <View style={styles.divider}/> */}
                            </>
                        )
                    })}
                </View>
            </View>
        </View>
    );
};
const renderPerson = (major, name, profilePicture, year) => {
    return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5, paddingBottom: 30}}>
            <Image style={styles.profilePicture} source={profilePicture?{uri: profilePicture}:require('../images/defaultpfp.png')}></Image>
            <View style={{flex: 1, width: 225}}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.subtext}>Transfer Student</Text>
                <Text style={styles.subtext}>Year: {year}</Text>
                <Text style={styles.subtext}>Major: {major}</Text>
            </View>
        </View>
    )
}

const renderTextQuadrant = (name, info) => {
    return (
        <View style={styles.textQuadrant}>
            <Text style={styles.sectionInfoSubtitleText}>{name}</Text>
            <Text style={styles.sectionInfoText}>{info}</Text>
        </View>
    );
};

const renderItinerary = (itinerary) => {
    return (
        <View style={styles.suggestedItineraryCard}>
            <View style={styles.content}>
            <Text style={[styles.sectionTitleText, {marginLeft: -20, marginBottom: 10}]}>Suggested Itinerary</Text>
            {itinerary.map(function(item, index) {
                return (
                    <View style={{ marginBottom: 30 }}>
                        <View style={styles.circle}/>
                        {index != itinerary.length - 1 ?
                            <View style={styles.verticalLine}/> : null
                        }
                        <View style={styles.textSection}>
                            <Text style={styles.bold24}>
                                {item.name}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                );
            })
        }
        </View>
        </View>
        
    );
};

const CompleteButton = () => {
    return (
        <BottomButton title='Complete This Tour' onPress={() => {
            completeTour(tourId, settingId, id).then(() => {
              navigation.pop();
            })
        }}/>
    );
};
const ContactButtton = () => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: primary,
                width: '90%',
                height: 60,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 10,
                marginBottom: 15,
                elevation: 5,
            }}
        >
            <Text 
                style={{
                    color: white,
                    ...bold18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>Contact Guide
            </Text>
        </TouchableOpacity>
    )
}
const CancelButtton = () => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: white,
                width: '90%',
                height: 60,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: lightGray,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 15,
                elevation: 5,
            }}
        >
            <Text 
                style={{
                    color: '#DD3E4E', 
                    ...reg18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}
            >
                Cancel Booking</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        color: primary,
        backgroundColor: primary,
        height: 100,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        color: white,
        top: 50,
        fontWeight: '700',
    },
    tourInfoCard: {
        width: '95%',
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    visitorInfoCard: {
        width: '95%',
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    suggestedItineraryCard: {
        width: '95%',
        marginHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 190,
    },
    sectionTitleText: {
        ...bold18,
        paddingBottom: 15,
    },
    nameText: {
        ...bold16,
        paddingBottom: 5,
    },
    subtext: {
        ...reg10,
        paddingBottom: 5,
    },
    sectionInfoSubtitleText: {
        ...reg14,
        color: gray,
        paddingVertical: 5,
    },
    sectionInfoText: {
        ...bold16,
        paddingBottom: 15,
    },
    textQuadrant: {
        position: 'relative',
        width: '50%',
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginRight: 20,
        marginTop: 10,
    },
    divider: {
        backgroundColor: lightGray,
        height: 2,
        alignSelf: 'center',
        width: '85%',
    },
    content: {
        marginLeft: 50,
        marginRight: 30,
        marginVertical: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    circle: {
        position: 'absolute',
        backgroundColor: primary,
        width: 15,
        height: 15,
        borderRadius: 15,
    },
    textSection: {
        marginLeft: 35,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 16,
    },
    descriptionText: {
        ...reg14,
        color: darkGray,
        marginTop: 10,
    },
    verticalLine: {
        position: 'absolute',
        backgroundColor: primary,
        width: 2,
        height: 90,
        marginLeft: 6,
        marginTop: 10,
    },
    continue: {
        position: 'absolute',
        bottom: 150,
        left: 20,
        right: 20,
        backgroundColor: primary,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: black,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
});

export default ViewTour;