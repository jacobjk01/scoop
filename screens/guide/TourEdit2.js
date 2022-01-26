import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary, white, grayVeryLight, grayVeryDark } from 'config/colors'


const TourEdit2 = ({ navigation }) => {
    const itinerary = [
        {'name': 'Diddy Riese', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Regency Theater', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Copymat', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'CVS', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Target', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {'name': 'Elyse Bakery', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    ]
    return (
        <SafeAreaView>
            {renderHeader(navigation, 'Suggested Itinerary')}
            <ScrollView style={{height: '100%'}}>
                {renderItinerary(itinerary)}
            </ScrollView>
        </SafeAreaView>
    );
};

const renderHeader = (navigation, title) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back-outline' size={20} color={primary} />
            </TouchableOpacity>
        </View>
    );
};

const renderItinerary = (itinerary) => {
    return (
        <View style={styles.content}>
            {itinerary.map(function(item, index) {
                return (
                    <View style={{ marginBottom: 30 }} key={index}>
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
    content: {
        marginHorizontal: 30,
        marginVertical: 70,
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
})
export default TourEdit2;