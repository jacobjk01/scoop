import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary, white, grayDark, black, grayVeryLight, grayVeryDark, grayShadow } from '../config/colors';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton';

const ViewTour = ({ navigation, route }) => {
    console.log(route.params.tour, 'view otur')
    const flow = route.params.flow
    const tour = route.params.tour;
    const curTime = '12:00 PM';
    const activeTour = tour.startTime == curTime ? true : false;
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
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{height: '100%', paddingTop: 0}}>
            <Header title='Westwood Tour' navigation={navigation}/>
                {activeTour ? null : renderTourInfo(tour)}
                {renderVisitorInfo(tour)}
                {activeTour ? renderItinerary(itinerary) : null}
            </ScrollView>
            {activeTour ? renderCompleteButton() : null}
            
            <BottomButton title='Complete This Tour' onPress={() => {}}/>
        </SafeAreaView>
      </>
    )
}

const renderTourInfo = (tour) => {
    return (
        <View style={styles.tourInfoCard}>
            <View style={{padding: 30}}>
                <Text style={styles.sectionTitleText}>Tour Info</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5}}>
                    {renderTextQuadrant('Date', capitalizeFirstLetter(tour.tourMonth) + ' ' + tour.tourDay)}
                    {renderTextQuadrant('Time', tour.startTime)}
                    {renderTextQuadrant('Visitors', tour.visitors)}
                    {renderTextQuadrant('Meetup Point', tour.meetPoint)}
                </View>
            </View>
        </View>
    );
};

const renderVisitorInfo = (tour, img) => {
    return (
        <View style={styles.visitorInfoCard}>
            <View style={{padding: 30}}>
                <Text style={styles.sectionTitleText}>Visitor Info</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5}}>
                    {renderPerson()}
                </View>
            </View>
        </View>
    );
};
const renderPerson = () => {
    return(
        <>
            <Image style={styles.profilePicture} source={require('images/trevor.png')}></Image>
            <View style={{flex: 1, width: 225}}>
                <Text style={styles.nameText}>Trevor</Text>
                <Text style={styles.subtext}>Transfer Student</Text>
                <Text style={styles.subtext}>Year: Junior</Text>
                <Text style={styles.subtext}>Major: Aerospace Engineering</Text>
            </View>
        </>
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

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
                            <Text style={styles.titleText}>
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

const renderCompleteButton = () => {
    return (
        <TouchableOpacity
          style={styles.continue}
          onPress={() => this.navigation.navigate('TourEdit2')}>
          <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
            {'Complete This Tour'}
          </Text>
        </TouchableOpacity>
    );
};

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
    backIcon: {
        backgroundColor: white,
        borderRadius: 10,
        borderColor: grayVeryLight,
        borderWidth: 1,
        position: 'absolute',
        left: 20,
        top: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tourInfoCard: {
        width: '95%',
        borderRadius: 20,
        backgroundColor: white,
        shadowColor: black,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginHorizontal: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
    visitorInfoCard: {
        width: '95%',
        borderRadius: 20,
        backgroundColor: white,
        shadowColor: black,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 5,
        elevation: 15,
    },
    suggestedItineraryCard: {
        width: '95%',
        borderRadius: 20,
        backgroundColor: white,
        shadowColor: black,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginHorizontal: 20,
        alignSelf: 'center',
        marginVertical: 10,
        marginBottom: 190,
        elevation: 15,
    },
    sectionTitleText: {
        fontWeight: '700',
        fontSize: 18,
        paddingBottom: 15,
    },
    nameText: {
        fontWeight: '700',
        fontSize: 18,
        paddingBottom: 5,
    },
    subtext: {
        fontWeight: '300',
        fontSize: 12,
        paddingBottom: 5,
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
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 20,
        marginTop: 10,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20,
        borderBottomColor: grayDark,
        borderBottomWidth: 1,
        width: '100%',
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
        fontWeight: '400',
        fontSize: 14,
        color: grayVeryDark,
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
        shadowColor: grayShadow,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
});

export default ViewTour;