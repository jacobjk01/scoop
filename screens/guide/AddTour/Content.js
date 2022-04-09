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
import { addTour, getMeetingPts } from 'api/tours';
import { UserContext } from 'contexts';
import Counter from './Counter';
import DatePicker from 'components/DatePicker';
import DatesDisplay from 'components/DatesDisplay';
import Loading from 'components/Loading';
import MeetingPicker from './MeetingPicker';
/**
 * 
 * @param {{name, setName, duration, setDuration, maxPeople, setMaxPeople, transportation, setIntroduction, introduction, id, navigation,setDates,dates, meetingPts, setMeetingPts}} props 
 * @returns 
 */
const Content = ({name, setName, duration, setDuration, maxPeople, setMaxPeople, transportation, setIntroduction, introduction, id, navigation, setDates, dates,meetingPts, setMeetingPts}) => {
  const [selectedMeetingPt, setSelectedMeetingPt] = useState(0)
  const {userAuth} = useContext(UserContext);
  if (meetingPts[selectedMeetingPt] ==undefined) return <Loading />
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
                    {'Recommended Meetup Point :'} {meetingPts[selectedMeetingPt].title}
                </Text>
                <Text>Add Dropdown Picker Here</Text>
                <MeetingPicker meetingPts={meetingPts} setValue={setSelectedMeetingPt} value={selectedMeetingPt}/>
                <View pointerEvents='none' style={{height: 90, backgroundColor: 'grey', marginTop: 10}}>
                    <MapView
                        style={{flex: 1}}
                        provider={PROVIDER_GOOGLE}
                        initialRegion = {{
                            latitude: meetingPts[selectedMeetingPt].location.latitude, 
                            longitude: meetingPts[selectedMeetingPt].location.longitude,
                            latitudeDelta: 0.0015,
                            longitudeDelta: 0.0020,
                        }}>
                        <Marker
                            key={1}
                            coordinate={meetingPts[selectedMeetingPt].location}
                            title={meetingPts[selectedMeetingPt].title}
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
              const tour = await addTour(userAuth.uid,id,["alpha"],0,duration,introduction,true,maxPeople,meetingPts[selectedMeetingPt].ref,dates,"walking")
              console.log(tour)
              navigation.pop();
            }}/>
        </View>
  )
}

export default Content
