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
import { styles } from './styles';
/**
 * 
 * @param {{setName, setDuration, maxPeople, transportation, meetPoint, setIntroduction}} props 
 * @returns 
 */
const Content = ({setName, setDuration, maxPeople, transportation, meetPoint, setIntroduction}) => {
  return (
    <View style={{marginBottom: 70, paddingTop: 25}}>
            <Text style={styles.sectionText}>Tour Name</Text>
            <TextInput
                style={styles.tourNameBox}
                placeholder='Add Tour Name'
                onChangeText={name => setName(name)}>
            </TextInput>
            <Text style={[styles.sectionText, {marginTop: 0}]}>Basic Info</Text>
            <View style={[styles.bodyText, {flexDirection: 'row', marginTop: 20}]}>
                <Text>
                    {'Duration :'}
                </Text>
                <TextInput
                    style={styles.input}
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
                <Counter maxPeople={maxPeople}/>
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
                            title='Bruin Statue'
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
                onChangeText={introduction => setIntroduction(introduction)}>
            </TextInput>
        </View>
  )
}

export default Content

class Counter extends React.Component {
  state = this.props.maxPeople ? {count: this.props.maxPeople} : {count: 0};

  subtractCount = () => this.setState(
      prevState => ({ ...prevState, count: this.state.count > 1 ? this.state.count - 1 : this.state.count })
  )
  
  addCount = () => this.setState(
      prevState => ({ ...prevState, count: this.state.count < 10 ? this.state.count + 1 : this.state.count})
  )

  render() {
    const { count } = this.state;
    return (
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={count > 1 ? styles.removeButton : styles.removeButtonGray} onPress={this.subtractCount}>
              <Ionicons name={'remove'} size={16} style={count > 1 ? {color: white} : {color: grayDark}}/>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 8}}>{count}</Text>
          <TouchableOpacity style={count < 10 ? styles.addButton : styles.addButtonGray} onPress={this.addCount}>
              <Ionicons name={'add'} size={16} style={count < 10 ? {color: white} : {color: grayDark}}/>
          </TouchableOpacity>
      </View>
    );
  }
}