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

const {event, ValueXY} = Animated;
class TourEdit3 extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.tour = this.props.route.params
    this.scrollY = new ValueXY();
  }

  componentDidMount() {
    this.scrollY.addListener(({value}) => (this._value = value));
  }

  renderForeground() {
    return (
      <View style={{flex: 1, borderRadius: 15}}>
        <ImageBackground
          style={styles.imageHeader}
          imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
          source={require('images/Westwood_village.png')}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.titleText}>{this.tour.name}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: white,
          alignItems: 'center',
        }}></View>
    );
  }

  renderContent() {
    return (
      <View style={{marginBottom: 70}}>
        {/* <TouchableOpacity
            onPress={() => this.navigation.navigate()}
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
                {this.tour.duration}
            </TextInput>
            <Text>
                {'min'}
            </Text>
        </View>
        <View style={[styles.bodyText, {flexDirection: 'row'}]}>
            <Text>
                {'Max Group :'}
            </Text>
            <Counter maxPeople={this.tour.maxPeople}/>
        </View>
        <View style={styles.bodyText}>
            <Text >
                {'Transportation :'} {this.tour.transportation}
            </Text>
            <Text>Add Dropdown Picker Here</Text>
        </View>
        <View style={styles.bodyText}>
            <Text>
                {'Recommended Meetup Point :'} {this.tour.meetPoint}
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
        <TextInput style={styles.inputIntro} multiline='true'>
            {this.tour.introduction}
        </TextInput>
      </View>
    );
  }

  render() {
    return (
      <View style={{backgroundColor: white}}>
        <StatusBar barStyle='dark-content' />
        <ScrollView>
          {this.renderForeground()}
          {this.renderContent()}
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => this.navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={20} color={white} />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => this.navigation.navigate('TourGuideList')}>
          <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
            {'View Suggested Itinerary'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
