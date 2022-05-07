import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { primary, black, white, gray, red, lightGray } from 'config/colors';
import {bold24, bold18, bold20} from '../../config/typography.js'
import Reviews from '../../components/Reviews';
import BottomButton from '../../components/BottomButton';
import BackButton from '../../components/BackButton';
import { FAKE_REVIEWS } from '../../config/initialState';
import Error from '../Error';

const TourInfo = ({ navigation, route }) => {
  const tour = route.params.tour;
  const guide = route.params.guide
  const pageType = route.params.pageType
  const [reviews, setReviews] = useState(FAKE_REVIEWS);
  if (!route.params.tour) {
    return <Error errorMsg="TourInfo.js, route.params.tour is not defined"/>
  }
  const { title, picture, id, description } = route.params.tour;

  const renderForeground = () => {
    return (
      <ImageBackground
        style={styles.imageHeader}
        source={{uri: tour && tour.picture}}
        imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      >
        <View style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={{backgroundColor: 'transparent',borderRadius: 10, height: '100%', width: '100%'}}
          />
        </View>
        <View style={{width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 40}}>
          <Text style={{...bold24, color: white}}>{title || "Placeholder title"}</Text>
          <Text
            style={{fontSize: 18, color: lightGray, marginTop: 30}}>
            {description}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ marginBottom: 70 }}>
        {/* 
          Attempts at manually implementing the animated sticky header. 
        */}
        {/* <Animated.View style={{flexDirection: 'row', position: 'absolute', 
                top: -90, left: 25, opacity: buttonOpacity, alignItems: 'center', zIndex: 10}}>
                    <TouchableOpacity style={{backgroundColor: white, marginRight: 10, borderRadius: 40}}>
                        <ImageBackground style={{width: 50, height: 50}} imageStyle={{borderRadius: 40}} source={require('images/brittany.png')}
                        ></ImageBackground> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton} title='Message'>
                        <Text style={{color: primary}}>Message</Text>
                    </TouchableOpacity>
                </Animated.View> */}
      </View>
    );
  };
  //console.log(tour)
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={
          <View style={{ marginBottom: 80 }}>
            {renderForeground()}
            <Reviews reviews={reviews} />
            <BackButton navigation={navigation}/>
          </View>
        }
      />
      <BottomButton 
        title={pageType=='guideFlow'?'Book Tour':'Find a Tour Guide'}
        onPress={() => {
          navigation.navigate(pageType=='guideFlow'?'TourBooking2':'TourBooking1', pageType=='guideFlow'?{tour, guide}:tour);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  summaryText: {
    fontSize: 14,
    fontWeight: '200',
    color: white,
    marginBottom: 30,
  },
  imageHeader: {
    width: '100%',
    height: 600,
  },
  backCard: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 10,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 40,
    shadowColor: black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  whiteButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  floatCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    height: 80,
  }
});

export default TourInfo;
