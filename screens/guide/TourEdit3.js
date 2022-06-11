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
import {reg12, reg14, reg16, bold16, bold18, bold20, bold24, oblique16} from '../../config/typography.js'
import { primary, white, gray, black, red } from '../../config/colors';
import ImageHeader from '../../components/ImageHeader';
import BottomButton from '../../components/BottomButton';
import { editTour } from 'api/tours.js';

const TourEdit3 = ({navigation, route}) => {

  const tour = route.params
  console.log(tour)
  const [count, setCount] = useState(tour.maxPeople)



  const Counter = () => {
    return (
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={count > 1 ? styles.removeButton : styles.removeButtonGray} onPress={() => {if (count > 1) setCount(count - 1)}}>
              <Ionicons name={'remove'} size={16} style={count > 1 ? {color: white} : {color: gray}}/>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 8}}>{count}</Text>
          <TouchableOpacity style={count < 10 ? styles.addButton : styles.addButtonGray} onPress={() => {if (count < tour.maxPeople) setCount(count + 1)}}>
              <Ionicons name={'add'} size={16} style={count < 10 ? {color: white} : {color: gray}}/>
          </TouchableOpacity>
      </View>
    );
  }
  const renderContent = () => {
    return (
      <View style={{marginBottom: 50, paddingHorizontal: 40}}>
        {/* <Text style={{...bold16, marginVertical: 20}}>Tour Name</Text>
        <TextInput style={{...styles.input, width: '100%', height: 40, marginBottom: 20}} placeholder='Add Tour Name'>
        </TextInput> */}
        <Text style={{...bold16, marginTop: 20}}>Basic Info</Text>
        <View style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <Text style={{...reg14}}>
                  {'Duration :'}
              </Text>
              <TextInput style={{...styles.input, width: 50, height: 30}} textAlign='center'>
                  {tour.duration}
              </TextInput>
              <Text style={{...reg14}}>
                  {'min'}
              </Text>
          </View>
          <View style={[{flexDirection: 'row', alignItems: 'center', marginTop: 20}]}>
              <Text style={{...reg14}}>
                  {'Max Group :'}
              </Text>
              {Counter()}
          </View>
          <View style={{marginTop: 20}}>
              <Text style={{...reg14}}>
                  {'Transportation :'} {tour.transportation}
              </Text>
              <Text style={{...reg14}}>Add Dropdown Picker Here</Text>
          </View>
          <View style={{marginTop: 20}}>
              <Text style={{...reg14}}>
                  {'Recommended Meetup Point :'} {tour.meetPoint}
              </Text>
              <Text style={{...reg14}}>Add Dropdown Picker Here</Text>
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
                  {/* <Text style={{color: red, position: 'absolute', top: 10, left: 175, fontWeight: '500'}}>Bruin Bear</Text> */}
              </View>
          </View>

        </View>
        <View style={styles.divider} />
        <Text style={{...bold16, marginTop: 0}}>Introduction</Text>
        <TextInput
          style={{...styles.input, height: 150, width: '100%', marginBottom: 100, paddingVertical: 15}}
          multiline={true} placeholder="Write an into about the tour!" textAlignVertical='top'
        >
            {tour.introduction}
        </TextInput>
      </View>
    );
  }
  return (
    <View style={{backgroundColor: white, height: '100%'}}>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        <ImageHeader title={route.params.name} navigation={navigation} image={route.params.src}/>
        {renderContent()}
      </ScrollView>
      <BottomButton onPress={() => {
        async function edit () {
          return await editTour(
            tour.ref,
            tour.guideId,
            tour.categories,
            tour.cost,
            tour.duration,
            tour.introduction,
            tour.isPublished,
            tour.maxPeople,
            tour.meetingPt,
            tour.timeAvailable,
            tour.transportation,
          )
        }
      }} title="Confirm"/>
    </View>
  );
}


const styles = StyleSheet.create({
    divider: {
        position: 'relative',
        marginTop: 20,
        marginBottom: 20,
        borderBottomColor: gray,
        borderBottomWidth: 1,
        alignSelf: 'center',
        width: '80%',
    },
  sectionText: {
    ...reg16,
    marginTop: 20,
    paddingLeft: 40,
  },
  bodyText: {
    ...reg12,
    color: black,
    marginBottom: 15,
    paddingLeft: 45,
    paddingRight: 45,
  },
  imageHeader: {
    width: '100%',
    height: 200,
    zIndex: -10,
    paddingTop: 100,
  },
  input: {
      borderColor: gray,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      paddingVertical: 0,
      // lineHeight: 5,
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
    borderColor: gray,
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
    borderColor: gray,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
});

export default TourEdit3;
