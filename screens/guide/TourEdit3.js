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
import { primary, white, gray, black, red } from 'config/colors';
import ImageHeader from '../../components/ImageHeader';
import BottomButton from '../../components/BottomButton';

const TourEdit3 = ({navigation, route}) => {

  const tour = route.params
  const [count, setCount] = useState(1)


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
      <View style={{marginBottom: 50}}>
        {/* <TouchableOpacity
            onPress={() => navigation.navigate()}
            style={{position: 'absolute', right: 30, top: 30}}>
            <View>
              <Text style={{color: gray}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
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
  inputIntro: {
    alignSelf: 'center',
    height: 140,
    width: '75%',
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 50,
    paddingTop: 10,
  },
});

export default TourEdit3;
