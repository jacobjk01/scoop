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
import { white } from 'config/colors';

const {event, ValueXY} = Animated;
class AddTour extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.scrollY = new ValueXY();
        this.state = {
            name: '',
            duration: '',
            maxPeople: 1,
            transportation: 'walking',
            meetPoint: 'Bruin Bear',
            introduction: '',
            backgroundImage: '',
        }
    }

    setName(name) {
        this.setState({
            name: name
        })
    }
    setDuration(duration) {
        this.setState({
            duration: duration
        })
    }
    setMaxPeople(maxPeople) {
        this.setState({
            maxPeople: maxPeople
        })
    }
    setTransportation(transportation) {
        this.setState({
            transportation: transportation
        })
    }
    setMeetPoint(meetPoint) {
        this.setState({
            meetPoint: meetPoint
        })
    }
    setIntroduction(introduction) {
        this.setState({
            introduction: introduction
        })
    }

    componentDidMount() {
        this.scrollY.addListener(({value}) => (this._value = value));
    }

  renderForeground() {
    return (
        <View style={{flex: 1, borderRadius: 15}}>
            <ImageBackground
                style={styles.imageHeader}
                source={require('images/Westwood_village.png')}>
                <LinearGradient
                colors={['transparent', 'black']}
                style={styles.linearGradTour}
                />
            </ImageBackground>
            <TouchableOpacity
                style={{position: 'absolute', right: 25, top: 120}}>
                <Ionicons name={'camera'} size={25} color={'#9B9BA7'}/>
            </TouchableOpacity>
        </View>
    );
  }

  renderHeader() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor:
                'white', alignItems:
                'center'
                }}
            >
        </View>
    );
  }

  renderContent() {
    return (
        <View style={{marginBottom: 70, paddingTop: 25}}>
            <Text style={styles.sectionText}>Tour Name</Text>
            <TextInput
                style={styles.tourNameBox}
                placeholder='Add Tour Name'
                onChangeText={name => this.setName(name)}>
            </TextInput>
            <Text style={[styles.sectionText, {marginTop: 0}]}>Basic Info</Text>
            <View style={[styles.bodyText, {flexDirection: 'row', marginTop: 20}]}>
                <Text>
                    {'Duration :'}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={duration => this.setDuration(duration)}>
                </TextInput>
                <Text>
                    {'min'}
                </Text>
            </View>
            <View style={[styles.bodyText, {flexDirection: 'row'}]}>
                <Text>
                    {'Max Group :'}
                </Text>
                <Counter maxPeople={this.state.maxPeople}/>
            </View>
            <View style={styles.bodyText}>
                <Text >
                    {'Transportation :'} {this.state.transportation}
                </Text>
                <Text>Add Dropdown Picker Here</Text>
            </View>
            <View style={styles.bodyText}>
                <Text>
                    {'Recommended Meetup Point :'} {this.state.meetPoint}
                </Text>
                <Text>Add Dropdown Picker Here</Text>
                <View pointerEvents="none" style={{height: 90, backgroundColor: "grey", marginTop: 10}}>
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
                            title="Bruin Statue"
                            description="Recommended Meeting Point"
                        />
                    </MapView>
                    <Text style={{color: "#EA4336", position: 'absolute', top: 10, left: 175, fontWeight: '500'}}>Bruin Bear</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <Text style={[styles.sectionText, {marginTop: 0}]}>Introduction</Text>
            <TextInput
                style={styles.inputIntro}
                multiline={true}
                placeholder="Write an intro about the tour!"
                onChangeText={introduction => this.setIntroduction(introduction)}>
            </TextInput>
        </View>
    );
}

render() {
    return (
        <View style={{backgroundColor: 'white'}}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                {this.renderForeground()}
                {this.renderContent()}
                <TouchableOpacity
                style={styles.backIcon}
                onPress={() => this.navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={20} color={white} />
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
                <Ionicons name={'remove'} size={16} style={count > 1 ? {color: 'white'} : {color: '#9B9BA7'}}/>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 8}}>{count}</Text>
            <TouchableOpacity style={count < 10 ? styles.addButton : styles.addButtonGray} onPress={this.addCount}>
                <Ionicons name={'add'} size={16} style={count < 10 ? {color: 'white'} : {color: '#9B9BA7'}}/>
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
        borderBottomColor: '#9B9BA7',
        borderBottomWidth: 1,
        alignSelf: 'center',
        width: '80%',
    },
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
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
    color: 'black',
    marginBottom: 15,
    fontFamily: 'Helvetica',
    paddingLeft: 45,
    paddingRight: 45,
  },
  imageHeader: {
    width: '100%',
    height: 160,
    zIndex: -10,
  },
  backIcon: {
    backgroundColor: '#3154A5',
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
    backgroundColor: '#3154A5',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#adadad',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  input: {
      borderColor: '#9B9BA7',
      borderWidth: 1,
      borderRadius: 5,
      width: 35,
      textAlign: 'center',
      paddingHorizontal: 5,
      marginHorizontal: 5,
  },
  removeButton: {
    borderColor: '#3154A5',
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 1,
    marginLeft: 5,
    backgroundColor: '#3154A5',
  },
  removeButtonGray: {
    borderColor: '#9B9BA7',
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 1,
    marginLeft: 5,
  },
  addButton: {
    borderColor: '#3154A5',
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    backgroundColor: '#3154A5',
  },
  addButtonGray: {
    borderColor: '#9B9BA7',
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
    width: "75%",
    borderWidth: 1,
    borderColor: '#9B9BA7',
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 50,
    paddingTop: 10,
  },
  tourNameBox: {
    alignSelf: 'center',
    height: 35,
    width: "80%",
    borderWidth: 1,
    borderColor: '#9B9BA7',
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 10,
  },
});

export default AddTour;
