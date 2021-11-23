import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary, white, grayDark, black, grayVeryLight } from 'config/colors';

const ViewTour = ({navigation, route}) => {
    const tour = route.params.tour;
    return (
        <SafeAreaView>
            {renderHeader(navigation, tour.name)}
            <ScrollView style={{height: '100%'}}>
                {renderTourInfo(tour)}
                {renderVisitorInfo(tour)}
            </ScrollView>
        </SafeAreaView>
    )
}

const renderHeader = (navigation, tourName) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack(), console.error("clicked")}>
                <Ionicons name="chevron-back-outline" size={20} color={primary} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{tourName}</Text>
        </View>
    );
};

const renderTourInfo = (tour) => {
    return (
        <View style={styles.tourInfoCard}>
            <View style={{padding: 30}}>
                <Text style={styles.sectionTitleText}>Tour Info</Text>
                <View style={{flexDirection: "row", flexWrap: 1, paddingLeft: 5}}>
                    {renderTextQuadrant("Date", capitalizeFirstLetter(tour.tourMonth) + " " + tour.tourDay)}
                    {renderTextQuadrant("Time", tour.startTime)}
                    {renderTextQuadrant("Visitors", tour.visitors)}
                    {renderTextQuadrant("Meetup Point", tour.meetPoint)}
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
                <View style={{flexDirection: "row", flexWrap: 1, paddingLeft: 5}}>
                    <Image style={styles.profilePicture} source={require('images/trevor.png')}></Image>
                    <View style={{flex: 1, width: 225}}>
                        <Text style={styles.nameText}>Trevor</Text>
                        <Text style={styles.subtext}>Transfer Student</Text>
                        <Text style={styles.subtext}>Year: Junior</Text>
                        <Text style={styles.subtext}>Major: Aerospace Engineering</Text>
                    </View>
                    <View style={styles.divider}/>
                    <Image style={styles.profilePicture} source={require('images/natalie.png')}></Image>
                    <View style={{flex: 1, width: 225}}>
                        <Text style={styles.nameText}>Natalie</Text>
                        <Text style={styles.subtext}>Transfer Student</Text>
                        <Text style={styles.subtext}>Year: Junior</Text>
                        <Text style={styles.subtext}>Major: Chemical Engineering</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

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
        fontWeight: "700",
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
        marginVertical: 10,
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
});

export default ViewTour;