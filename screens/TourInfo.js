import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ImageBackground} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const TourInfo = ({navigation}) => {

    const [ positiony, setpositiony ] = useState(0);

    const handleScroll = async(event) => {
        positiony = event.nativeEvent.contentOffset.y
    }
    
    return(
        <SafeAreaView>
            <ScrollView style={{height: "100%"}} onScroll={handleScroll}
            alwaysBounceHorizontal={false} bounces={false} stickyHeaderIndices={[0]}>
                <View style={styles.headerView}>
                    <ImageBackground style={styles.imageHeader} source={require('../images/Westwood_village.png')}>
                        <LinearGradient colors={['transparent', 'black']} style={styles.linearGradTour}/>
                        <View style={styles.imageOverlay}>
                            <Text style={styles.titleText}>Westwood Tour</Text>
                            <Text style={styles.detailText}>60 min | Max 6 people | person</Text>
                            <Text style={styles.subText}> $8 per person</Text>
                            <Text style={styles.summaryText}>Get to know the neighborhood: where to grocery shop, where the best hangout places are, 
                            and where to grab a bit with your fellow hungry bruins.</Text>
                        </View>
                    </ImageBackground> 
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('Booking')}
                style={{flex: 1, alignSelf: "center", height: 20, backgroundColor: '#3D68CC'}}>
                    <Text>Book Now</Text>
                </TouchableOpacity>
                <View style={{height: 1000}}></View>
            </ScrollView>
        </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Helvetica"
    },
    titleText: {
        fontSize: 32,
        fontWeight: '600',
        color: "white"
    },
    detailText: {
        fontSize: 14,
        fontWeight: '200',
        color: "white"
    },
    subText: {
        fontSize: 20,
        fontWeight: '400',
        color: "white",
        marginTop: 20,
        marginBottom: 20
    },
    summaryText: {
        fontSize: 18,
        fontWeight: '200',
        color: "white",
        marginBottom: 30
    },
    headerView: {
        width: '100%',
        minHeight: 300,
        maxHeight: 600,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    imageHeader: {
        width: '100%',
        height: 600,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        paddingLeft: 25
    },
    linearGradTour: {
        position: 'absolute',
        top: 150,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        borderRadius: 10
    }
});

export default TourInfo;