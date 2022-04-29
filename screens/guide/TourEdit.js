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
import { primary, white, gray, black } from 'config/colors';
import ImageHeader from '../../components/ImageHeader';
import BottomButton from '../../components/BottomButton'
import DatesDisplay from 'components/DatesDisplay';

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
      <View style={{marginBottom: 100}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('TourEdit3', tour)}
            style={{position: 'absolute', right: 30, top: 30}}>
            <View>
              <Text style={{color: gray}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
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
        <DatesDisplay dates={tour.timeAvailable}/>
        {/* Don't delete line below, use after mvp */}
        {false && <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30}}>
          <Text style={[styles.sectionText, {marginTop: 0}]}>My Availability</Text>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate('Availability', tour)}}
              style={{}}>
              <View>
                <Text style={{color: gray}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
              </View>
          </TouchableOpacity>
        </View>}
        {/* Don't delete line below, use after mvp */}
        {false && renderAvailabilities() }
      </View>
    );
  }

  return (
    <View style={{backgroundColor: white, height: '100%'}}>
      <ScrollView>
        {/* Todo: Make performant. Image is refetched here and in ManageTours. */}
        <ImageHeader navigation={navigation} title={tour.name} image={tour.src} />
        {renderContent()}
      </ScrollView>
      <BottomButton onPress={() => navigation.navigate('TourEdit2')} title='View Suggested Itinierary'/>
    </View>
  );

}

const styles = StyleSheet.create({
  divider: {
      position: 'relative',
      marginTop: 5,
      marginBottom: 20,
      borderBottomColor: gray,
      borderBottomWidth: 1,
      alignSelf: 'center',
      width: '80%',
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
  continue: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: primary,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default TourEdit;
