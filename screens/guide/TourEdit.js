import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {white} from 'config/colors';

const {event, ValueXY} = Animated;
class TourEdit extends Component {
  constructor(props) {
    super(props);
    this.scrollY = new ValueXY();
    this.navigation = this.props.navigation;
    this.tour = this.props.route.params.tour;
  }

  componentDidMount() {
    this.scrollY.addListener(({value}) => (this._value = value));
  }

  renderForeground() {
    // const tour = this.props.route.params.tour;
    return (
      <View style={{flex: 1, borderRadius: 15}}>
        <ImageBackground
          style={styles.imageHeader}
          imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
          source={require('images/Westwood_village.png')}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradTour}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.titleText}>
              {this.tour.name}
            </Text>
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
          backgroundColor: 'white',
          alignItems: 'center',
        }}></View>
    );
  }

  renderContent() {
    return (
      <View style={{marginBottom: 70}}>
        <TouchableOpacity
            onPress={() => this.navigation.navigate('TourEdit3', this.tour)}
            style={{position: 'absolute', right: 30, top: 30}}>
            <View>
              <Text style={{color: '#9B9BA7'}}>Edit <Ionicons name={'pencil'} size={16}/></Text>
            </View>
        </TouchableOpacity>
        <Text style={[styles.sectionText, {marginTop: 40}]}>Basic Info</Text>
        <Text style={[styles.bodyText, {marginTop: 20}]}>
            {'Duration :'} {this.tour.duration} {'min'}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Max Group :'} {this.tour.maxPeople}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Transportation :'} {this.tour.transportation}
        </Text>
        <Text style={[styles.bodyText]}>
            {'Recommended Meetup Point :'} {this.tour.meetPoint}
        </Text>
        <View style={styles.divider} />
        <Text style={[styles.sectionText, {marginTop: 0}]}>Introduction</Text>
        <Text style={[styles.bodyText, {marginTop: 20}]}>
            {this.tour.introduction}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View>
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
          onPress={() => this.navigation.navigate('TourEdit2')}>
          <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
            {'View Suggested Itinerary'}
          </Text>
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
});

export default TourEdit;
