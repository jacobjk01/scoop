import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import {Calendar} from 'react-native-calendars';
import renderReviews from '../../components/Reviews';
import {primary, white} from '../../config/colors.js';
import {backIcon, primaryButton, mediumBold, mediumLight, titleText, medLargeText, lightSmallText, linearGrad} from '../../config/typography.js';


const {event, ValueXY} = Animated;

class TourInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {

      route: props.route,
      tour: props.route.params.itemInfo,

      reviews: [
        {
          stars: 4.8,
          year: 'Incoming Freshman',
          comment:
            'Brittany was really helpful!! She showed me where the students get groceries from and hangout in Westwood. She also shared a lot of interesting stories as we visit each places, highly recommend incoming freshman who want to familiarize themselves with the area sign up!! ',
        },
        {
          stars: 4.3,
          year: 'Incoming Junior',
          comment:
            'Being a sophomore, I kinda know what Westwood is like already; however, Brittany was able to show me interesting places I’ve never discovered!',
        },
      ],
    };
    this.scrollY = new ValueXY();
  }
  componentDidMount() {
    this.scrollY.addListener(({value}) => (this._value = value));
  }
  componentWillUnmount() {
    this.scrollY.removeAllListeners();
  }

  renderForeground() {
    return (
      <View style={{backgroundColor: '#d92726', flex: 1, borderRadius: 10}}>
        <ImageBackground
          style={styles.imageHeader}
          source={{uri: this.state.tour && this.state.tour.picture}}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={{...linearGrad, position: 'absolute', top: 150, bottom: 0, left: 0, right: 0}}
          />
          <View style={styles.imageOverlay}>
            <Text style={{...titleText, color: white}}>{"Placeholder title" || this.state.tour.title}</Text>
            <Text style={{...lightSmallText}}>
              60 min | Max 6 people | person
            </Text>
            <Text style={{...medLargeText, marginTop: 20, marginBottom: 20}}>$8 per person</Text>
          </View>

          <Text
            style={[
              {...mediumLight, color: white, marginBottom: 30},
              {
                position: 'absolute',
                bottom: 0,
                left: 25,
                flex: 1,
                paddingRight: 20,
              },
            ]}>
            {"placeholder description" || this.state.tour.description}
          </Text>
        </ImageBackground>
        <Text>TODO: Make Tour Info Page a functional component</Text>
        <Text>
          TODO: Make Tour Info Page accept data instead of it being hard coded
          so that multiple tours work
        </Text>
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
    const navigation = this.props.navigation;
    return (
      <View style={{marginBottom: 70}}>
        {/* <Animated.View style={{flexDirection: "row", position: "absolute", 
                top: -90, left: 25, opacity: buttonOpacity, alignItems: "center", zIndex: 10}}>
                    <TouchableOpacity style={{backgroundColor: "white", marginRight: 10, borderRadius: 40}}>
                        <ImageBackground style={{width: 50, height: 50}} imageStyle={{borderRadius: 40}} source={require('../images/brittany.png')}
                        ></ImageBackground> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton} title="Message">
                        <Text style={{color: "#41479B"}}>Message</Text>
                    </TouchableOpacity>
                </Animated.View> */}
        <Text style={{...mediumBold, marginTop: 60, alignSelf: 'center'}}>Reviews</Text>
        {/* {renderReviews(this.state.reviews)} */}
      </View>
    );
  }


  renderCards = item => {
    return (
      <View style={styles.reviewCard}>
        {this.renderStars(item.item.stars)}
        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            color: '#9B9BA7',
            fontStyle: 'italic',
          }}>
          {item.name} - {item.item.year}
        </Text>
        <Text style={{marginTop: 5}}>{item.item.comment}</Text>
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          {this.renderForeground()}
          {this.renderContent()}
        </ScrollView>
        <TouchableOpacity
          style={{...backIcon, left: 20, top: 40}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={22} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...primaryButton, bottom: 20, left: 20, right: 20}}
          onPress={() => {

            this.props.navigation.navigate('TourBooking1', this.state.tour)
            }}
          >
          <Text
            style={{...mediumBold, alignSelf: 'center', color: white}}>
            Find A Tour Guide
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica',
  },
  headerView: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  smallHeaderView: {
    width: '100%',
    height: 200,
  },
  imageHeader: {
    width: '100%',
    height: 600,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
    zIndex: -10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 120,
    paddingLeft: 25,
  },
  linearGradTour: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  whiteButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#41479B',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  floatCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    height: 80,
  },
});

export default TourInfo;
