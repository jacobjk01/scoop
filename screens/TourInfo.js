import React, {Component, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Button, StyleSheet, 
    TextInput, TouchableOpacity, FlatList, Image, ImageBackground,
    Dimensions, Animated} 
    from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//import Animated, { Value } from 'react-native-reanimated';

import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { black, white } from '../config/colors';

const { event, ValueXY } = Animated;
class TourInfo extends Component {
    constructor(props) {
        super(props)

        this.state={
            
            reviews: [
                {stars: 5, tourName: "Westwood Tour", year: "Incoming Freshman", comment: "Brittany was a bitch and I'm a karen"},
                {stars: 5, tourName: "Westwood Tour", year: "Incoming Junior", comment: "Brittany is my mommy"}
            ]
        }
        this.scrollY = new ValueXY();
    }

    componentDidMount() {
        this.scrollY.addListener(({ value }) => (this._value = value))
      }

      
    
    renderForeground() {
        const scrollPosition = (x) => x;
        const [startTextFade, finishTextFade] = [
            scrollPosition(30),
            scrollPosition(200),
          ];
        const textOpacity = this.scrollY.y.interpolate({
            inputRange: [startTextFade, finishTextFade],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const openSpace = this.scrollY.y.interpolate({
            inputRange: [startTextFade, finishTextFade],
            outputRange: [120, 70],
            extrapolate: 'clamp',
        });
        return(
            <View style={{backgroundColor: "#d92726", flex: 1}}>
                <ImageBackground style={styles.imageHeader} source={require('../images/Westwood_village.png')}>
                    <LinearGradient colors={['transparent', 'black']} style={styles.linearGradTour}/>
                        <Animated.View style={[styles.imageOverlay, {paddingBottom: openSpace}]}>
                            <Text style={styles.titleText}>Westwood Tour</Text>
                            <Text style={styles.detailText}>60 min | Max 6 people | person</Text>
                            <Text style={styles.subText}> $8 per person</Text>
                        </Animated.View>
                        <Animated.Text style={[styles.summaryText, {opacity: textOpacity, position: "absolute", bottom: 0, left: 25, flex: 1, paddingRight: 20}]}>
                            Get to know the neighborhood: where to grocery shop, where the best hangout places are, 
                            and where to grab a bite with your fellow hungry bruins.
                            </Animated.Text>
                </ImageBackground>
            </View>
        )
    }

    renderHeader() {
        return(
            <View style={{flex: 1, backgroundColor: "white", alignItems: "center"}}></View>
        )
    }

    renderContent() {
        const navigation = this.props.navigation;
        const scrollPosition = (x) => x;
        const [startTextFade, finishTextFade] = [
            scrollPosition(30),
            scrollPosition(200),
          ];
        const buttonOpacity = this.scrollY.y.interpolate({
            inputRange: [startTextFade, finishTextFade],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return(
            <View style={{marginTop: 400}}>
                <Animated.View style={{flexDirection: "row", position: "absolute", 
                top: -90, left: 25, opacity: buttonOpacity, alignItems: "center", zIndex: 10}}>
                    <TouchableOpacity style={{backgroundColor: "white", marginRight: 10, borderRadius: 40}}>
                        <ImageBackground style={{width: 50, height: 50}} imageStyle={{borderRadius: 40}} source={require('../images/brittany.png')}
                        ></ImageBackground> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton} title="Message">
                        <Text style={{color: "#41479B"}}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('Booking')}>
                        <Text style={{color: "#41479B"}}>Book Now</Text>
                    </TouchableOpacity>
                </Animated.View>
                {this.state.reviews.map((item) => 
                    <View style={styles.reviewCard}>
                        <Text>{item.stars} stars</Text>
                        <Text style={{marginTop: 5, fontSize: 14, color: "#9B9BA7", fontStyle: 'italic'}}>{item.tourName} - {item.year}</Text>
                        <Text style={{marginTop: 5}}>{item.comment}</Text>
                    </View>
                )}
            </View>
            
        )
    }

    render() {
        const navigation = this.props.navigation;
        return(
            <React.Fragment>
               <StickyParallaxHeader
                    foreground={this.renderForeground()}
                    header={this.renderHeader()}
                    parallaxHeight={200}
                    headerHeight={0}
                    deviceWidth={Dimensions.get('window').width}
                    headerSize={() => {}}
                    onEndReached={() => {}}
                    scrollEvent={event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }],
                        { useNativeDriver: false }
                    )}
                    tabs={[
                        {
                            title: ' ',
                            content: this.renderContent()
                        }
                    ]}
                >
                    
                </StickyParallaxHeader> 
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name='chevron-back-outline' size={20} color={white} />
                </TouchableOpacity>
            </React.Fragment>
            
        )
    }
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    smallHeaderView: {
        width: '100%',
        height: 200
    },
    imageHeader: {
        width: '100%',
        height: 600,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: -10
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
    },
    reviewCard: {
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
        shadowColor: "#656565",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    whiteButton: {
        backgroundColor: white,
        borderRadius: 10,
        color: '#41479B',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10
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
});

export default TourInfo;