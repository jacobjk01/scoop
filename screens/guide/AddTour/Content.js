import React, {Component, useContext, useEffect, useState} from 'react';
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
import SubmitButton from 'components/SubmitButton';
import { addTour } from 'api/tours';
import { UserContext } from 'contexts';
import Counter from './Counter';
import DatePicker from 'components/DatePicker';
import DatesDisplay from 'components/DatesDisplay';
/**
 * 
 * @param {{name, setName, duration, setDuration, maxPeople, setMaxPeople, transportation, meetPoint, setIntroduction, introduction, id, navigation,setDates,dates}} props 
 * @returns 
 */
const Content = ({name, setName, duration, setDuration, maxPeople, setMaxPeople, transportation, meetPoint, setIntroduction, introduction, id, navigation, setDates, dates}) => {
  const {userAuth} = useContext(UserContext);
  return (
    <View style={{marginBottom: 10, paddingTop: 25}}>
            <Text style={styles.sectionText}>Tour Name</Text>
            <TextInput
                style={styles.tourNameBox}
                placeholder='Add Tour Name'
                onChangeText={name => setName(name)}
                value={name}
              >
            </TextInput>
            <Text style={[styles.sectionText, {marginTop: 0}]}>Basic Info</Text>
            <View style={[styles.bodyText, {flexDirection: 'row', marginTop: 20}]}>
                <Text>
                    {'Duration :'}
                </Text>
                <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={duration => setDuration(duration)}>
                </TextInput>
                <Text>
                    {'min'}
                </Text>
            </View>
            <View style={[styles.bodyText, {flexDirection: 'row'}]}>
                <Text>
                    {'Max Group :'}
                </Text>
                <Counter maxPeople={maxPeople} onChange={setMaxPeople}/>
            </View>
            <View style={styles.bodyText}>
                <Text >
                    {'Transportation :'} {transportation}
                </Text>
                <Text>Add Dropdown Picker Here</Text>
            </View>
            <View style={styles.bodyText}>
                <Text>
                    {'Recommended Meetup Point :'} {meetPoint}
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
                            title={meetPoint}
                            description='Recommended Meeting Point'
                        />
                    </MapView>
                    <Text style={{color: red, position: 'absolute', top: 10, left: 175, fontWeight: '500'}}>Bruin Bear</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <Text style={[styles.sectionText, {marginTop: 0}]}>Introduction</Text>
            <TextInput
                style={styles.inputIntro}
                multiline={true}
                placeholder='Write an intro about the tour!'
                value={introduction}
                onChangeText={introduction => setIntroduction(introduction)}>
            </TextInput>
            <DatesDisplay dates={dates}/>
            <DatePicker title="Add dates" setDates={setDates} dates={dates}/>
            <SubmitButton title={"Create Tour"} style={{margin: 10}} onPress={async () => {
              if (duration === "") duration = 0
              const meetingPtRef = "tours/4Wey5tUxBInxLq4tZRlS/availableMeetingPts/QqKsGXwTwacCCcgHOgqa"
              const tour = await addTour(userAuth.uid,id,["alpha"],0,duration,introduction,true,maxPeople,meetingPtRef,dates,"walking")
              console.log(tour)
              navigation.pop();
            }}/>
        </View>
  )
}

export default Content
