import React, {Component, useEffect, useState} from 'react';
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
import { styles } from './styles';
import Foreground from './Foreground';
import Header from './Header';
import Content from './Content';
/**
 * 
 * @param {{navigation: {navigate : () => {}}}} props 
 */
const AddTour = (props) => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [maxPeople, setMaxPeople] = useState(1)
  const [transportation, setTransportation] = useState('walking')
  const [meetPoint, setMeetPoint] = useState('Bruin Bear')
  const [introduction, setIntroduction] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  useEffect(() => {
    console.log(props.navigation)
  }, [])
  return (
    <View style={{backgroundColor: white}}>
        <StatusBar barStyle='dark-content' />
        <ScrollView>
            <Foreground backgroundImage={backgroundImage}/>
            <Content 
              transportation={transportation}
              setName={setName}
              setDuration={setDuration}
              maxPeople={maxPeople}
              meetPoint={meetPoint}
              setIntroduction={setIntroduction}
            />
            <TouchableOpacity
            style={styles.backIcon}
            onPress={() => props.navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={20} color={white} />
            </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
            style={styles.continue}
            onPress={() => props.navigation.navigate('TourGuideList')}>
            <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
            {'View Suggested Itinerary'}
            </Text>
        </TouchableOpacity>
    </View>
  );
}

export default AddTour