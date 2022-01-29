import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
  PanResponder,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { primary, white, grayDark, black, grayShadow } from 'config/colors';

//note: grid is kind of laggy when upsized, will work on fixing
const TourEdit = ({navigation, route}) => {
  const tour = route.params.tour;
  const [slots, setSlots] = useState(new Array(7).fill().map(_ => new Array(24).fill(true)))

  useEffect(() => {
    let temp = slots
    temp[0][0] = true
    setSlots(temp)
    return () => {console.log(slots)}
  }, [])

  const renderForeground = () => {
    return (
      <View style={{flex: 1, borderRadius: 15}}>
        <ImageBackground
          style={styles.imageHeader}
          imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
          source={require('images/Westwood_village.jpg')}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
            />
          <View style={styles.imageOverlay}>
            <Text style={styles.titleText}>
              {tour.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
  const whatDay = (i) => {
    switch (i) {
      case 0:
        return 'S'
      case 1:
        return 'M'
      case 2:
        return 'T'
      case 3:
        return 'W'
      case 4:
        return 'T'
      case 5:
        return 'F'
      case 6:
        return 'S'
    }
  }
  const renderAvailabilities = () => {
    let days = []
    for (let i = 0; i < 7; i++) {
      let hours = []
      for (let j = 0; j < 24; j++) {
        hours.push(
          <View 
            style={{
              backgroundColor: slots[i][j]?primary:white,
              width: 12,
              height: 10,
              borderTopLeftRadius: j==0?10:0,
              borderTopRightRadius: j==0?10:0,
              borderBottomLeftRadius: j==23?10:0,
              borderBottomRightRadius: j==23?10:0,
            }}
            key={j}
          />
        )
      }
      days.push(
        <View 
          style={{marginLeft: 10, display: 'flex', alignItems: 'center'}}
          key={i}
        >
          <Text style={{fontSize: 13, fontFamily: 'Helvetica-Bold'}}>
            {whatDay(i)}
          </Text>
          <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {hours}
          </View>
        </View>
      )
    }
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {days}
      </View>
    )
  }
  const renderContent = () => {
    return (
      <View style={{marginBottom: 300}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('TourEdit3', tour)}
            style={{position: 'absolute', right: 30, top: 30}}>
            <View>
              <Text style={{color: grayDark}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
            </View>
        </TouchableOpacity>
        <Text style={[styles.sectionText, {marginTop: 40}]}>Basic Info</Text>
        <Text style={[styles.bodyText, {marginTop: 20}]}>
            {'Duration :'} {tour.duration} {'min'}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Max Group :'} {tour.maxPeople}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Transportation :'} {tour.transportation}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Recommended Meetup Point :'} {tour.meetPoint}
        </Text>
        <View style={styles.divider} />
        <Text style={[styles.sectionText, {marginTop: 0}]}>Introduction</Text>
        <Text style={[styles.bodyText, {marginTop: 20}]}>
            {tour.introduction}
        </Text>
        <View style={styles.divider} />
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30}}>
          <Text style={[styles.sectionText, {marginTop: 0}]}>Time Slot</Text>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate('Availability', tour)}}
              style={{}}>
              <View>
                <Text style={{color: grayDark}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
              </View>
          </TouchableOpacity>
        </View>
        {renderAvailabilities()}
      </View>
    );
  }
 
  return (
    <View style={{backgroundColor: white}}>
      <ScrollView>

        {renderForeground()}
        {renderContent()}
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back-outline' size={20} color={white} />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.continue}
        onPress={() => navigation.navigate('TourEdit2')}>
        <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
          {'View Suggested Itinerary'}
        </Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  divider: {
      position: 'relative',
      marginTop: 5,
      marginBottom: 20,
      borderBottomColor: grayDark,
      borderBottomWidth: 1,
      alignSelf: 'center',
      width: '80%',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: white,
    top: 80,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    paddingLeft: 40,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: '200',
    color: black,
    marginBottom: 15,
    fontFamily: 'Helvetica',
    paddingLeft: 45,
    paddingRight: 45,
  },
  imageHeader: {
    width: '100%',
    height: 200,
    zIndex: -10,
    paddingTop: 100,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 110,
    paddingLeft: 40,
  },
  linearGradTour: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  backIcon: {
    backgroundColor: primary,
    borderRadius: 10,
    borderColor: white,
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continue: {
    position: 'absolute',
    bottom: 50,
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

export default TourEdit;
