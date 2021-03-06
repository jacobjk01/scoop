import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { primary, white, grayDark, black, red, grayShadow } from 'config/colors';
import ImageHeader from '../../components/ImageHeader';
import BottomButton from '../../components/BottomButton';

const TourEdit3 = ({navigation, route}) => {

  const tour = route.params
  const [count, setCount] = useState(1)


  const Counter = () => {
    return (
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={count > 1 ? styles.removeButton : styles.removeButtonGray} onPress={() => {if (count > 1) setCount(count - 1)}}>
              <Ionicons name={'remove'} size={16} style={count > 1 ? {color: white} : {color: grayDark}}/>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 8}}>{count}</Text>
          <TouchableOpacity style={count < 10 ? styles.addButton : styles.addButtonGray} onPress={() => {if (count < tour.maxPeople) setCount(count + 1)}}>
              <Ionicons name={'add'} size={16} style={count < 10 ? {color: white} : {color: grayDark}}/>
          </TouchableOpacity>
      </View>
    );
  }
  const renderContent = () => {
    return (
      <View style={{marginBottom: 50}}>
        {/* <TouchableOpacity
            onPress={() => navigation.navigate()}
            style={{position: 'absolute', right: 30, top: 30}}>
            <View>
              <Text style={{color: grayDark}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
            </View>
        </TouchableOpacity> */}
        <Text style={[styles.sectionText, {marginTop: 40}]}>Basic Info</Text>
        <View style={[styles.bodyText, {flexDirection: 'row', marginTop: 20}]}>
            <Text>
                {'Duration :'}
            </Text>
            <TextInput style={styles.input}>
                {tour.duration}
            </TextInput>
            <Text>
                {'min'}
            </Text>
        </View>
        <View style={[styles.bodyText, {flexDirection: 'row'}]}>
            <Text>
                {'Max Group :'}
            </Text>
            {Counter()}
        </View>
        <View style={styles.bodyText}>
            <Text >
                {'Transportation :'} {tour.transportation}
            </Text>
            <Text>Add Dropdown Picker Here</Text>
        </View>
        <View style={styles.bodyText}>
            <Text>
                {'Recommended Meetup Point :'} {tour.meetPoint}
            </Text>
            <Text>Add Dropdown Picker Here</Text>
            <View pointerEvents='none' style={{height: 90, backgroundColor: 'grey', marginTop: 10}}>
                <MapView
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion = {{
                        latitude: 34.07106828093279, 
                        longitude: -118.444993904947,
                        latitudeDelta: 0.0015,
                        longitudeDelta: 0.0020,
                    }}>
                    <Marker
                        key={1}
                        coordinate={{latitude: 34.07106828093279, longitude: -118.444993904947}}
                        title='Bruin Statue'
                        description='Recommended Meeting Point'
                    />
                </MapView>
                <Text style={{color: red, position: 'absolute', top: 10, left: 175, fontWeight: '500'}}>Bruin Bear</Text>
            </View>
        </View>
        <View style={styles.divider} />
        <Text style={[styles.sectionText, {marginTop: 0}]}>Introduction</Text>
        <TextInput style={styles.inputIntro} multiline={true}>
            {tour.introduction}
        </TextInput>
      </View>
    );
  }
  return (
    <View style={{backgroundColor: white, height: '100%'}}>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        <ImageHeader title={route.params.name} navigation={navigation}/>
        {renderContent()}
      </ScrollView>
      <BottomButton onPress={() => navigation.navigate('TourGuideList')} title="View Suggested Itinerary"/>
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
    bottom: -80,
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
  input: {
      borderColor: grayDark,
      borderWidth: 1,
      borderRadius: 5,
      width: 35,
      textAlign: 'center',
      paddingHorizontal: 5,
      marginHorizontal: 5,
  },
  removeButton: {
    borderColor: primary,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 1,
    marginLeft: 5,
    backgroundColor: primary,
  },
  removeButtonGray: {
    borderColor: grayDark,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 1,
    marginLeft: 5,
  },
  addButton: {
    borderColor: primary,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    backgroundColor: primary,
  },
  addButtonGray: {
    borderColor: grayDark,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  buttonText: {
      fontSize: 16,
  },
  inputIntro: {
    alignSelf: 'center',
    height: 140,
    width: '75%',
    borderWidth: 1,
    borderColor: grayDark,
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 50,
    paddingTop: 10,
  },
});

export default TourEdit3;
