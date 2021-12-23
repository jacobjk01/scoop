import React, {Component, useState, useEffect} from 'react';
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
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { Calendar } from 'react-native-calendars';
import { primary, black, white, grayDark, blueDark, grayShadow, red } from 'config/colors';
import renderReviews from '../../components/Reviews';

const {event, ValueXY} = Animated;

class TourInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
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
      <View style={{backgroundColor: red, flex: 1, borderRadius: 10}}>
        <ImageBackground
          style={styles.imageHeader}
          source={{uri: this.state.tour.picture}}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.titleText}>{this.state.tour.title}</Text>
            <Text style={styles.detailText}>
              60 min | Max 6 people | person
            </Text>
            <Text style={styles.subText}> $8 per person</Text>
          </View>

          <Text
            style={[
              styles.summaryText,
              {
                position: 'absolute',
                bottom: 0,
                left: 25,
                flex: 1,
                paddingRight: 20,
              },
            ]}>
            {this.state.tour.description}
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
          backgroundColor: white,
          alignItems: 'center',
        }}></View>
    );
  }

  renderStars(count) {
    let fullstars = Math.floor(count);
    var decimal = Math.ceil(10 * (count - Math.floor(count)));
    let emptystars = Math.floor(5 - count - 0.1);
    return (
      <View style={{flexDirection: 'row'}}>
        {Array.from(Array(fullstars).keys()).map(() => {
          return (
            <Image
              style={{width: 16, height: 16, marginRight: 4}}
              source={require('images/stars/filledstar.png')}
            />
          );
        })}

        {this.renderPartialStar(decimal)}
        {Array.from(Array(emptystars).keys()).map(() => {
          return (
            <Image
              style={{width: 16, height: 16, marginRight: 4}}
              source={require('images/stars/star0.png')}
            />
          );
        })}
      </View>
    );
  }

  renderPartialStar(decimal) {
    switch (decimal) {
      case 0:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star0.png')}
          />
        );
      case 1:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star1.png')}
          />
        );
      case 2:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star2.png')}
          />
        );
      case 3:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star3.png')}
          />
        );
      case 4:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star4.png')}
          />
        );
      case 5:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star5.png')}
          />
        );
      case 6:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star6.png')}
          />
        );
      case 7:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star7.png')}
          />
        );
      case 8:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star8.png')}
          />
        );
      case 9:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('images/stars/star9.png')}
          />
        );
    }
  }

  renderContent() {
    const navigation = this.props.navigation;
    return (
      <View style={{marginBottom: 70}}>
        {/* <Animated.View style={{flexDirection: 'row', position: 'absolute', 
                top: -90, left: 25, opacity: buttonOpacity, alignItems: 'center', zIndex: 10}}>
                    <TouchableOpacity style={{backgroundColor: white, marginRight: 10, borderRadius: 40}}>
                        <ImageBackground style={{width: 50, height: 50}} imageStyle={{borderRadius: 40}} source={require('images/brittany.png')}
                        ></ImageBackground> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton} title='Message'>
                        <Text style={{color: blueDark}}>Message</Text>
                    </TouchableOpacity>
                </Animated.View> */}
        <Text style={[styles.sectionText, {marginTop: 40}]}>Reviews</Text>
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
            color: grayDark,
            fontStyle: 'italic',
          }}>
          {item.name} - {item.item.year}
        </Text>
        <Text style={{marginTop: 5}}>{item.item.comment}</Text>
      </View>
    );
  };

  render() {
    
    return (
      <View>
        <StatusBar barStyle='dark-content' />
        <ScrollView>
          {this.renderForeground()}
          {this.renderContent()}
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={20} color={white} />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.state.navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={22} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => {

            this.props.navigation.navigate('TourBooking1', this.state.tour)
            }}
          >
          <Text
            style={{alignSelf: 'center', color: 'white', fontWeight: '600'}}>
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
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: white,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '200',
    color: white,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
  subText: {
    fontSize: 20,
    fontWeight: '400',
    color: white,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '200',
    color: white,
    marginBottom: 30,
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
  backCard: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
  reviewCard: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: white,
    alignSelf: 'center',
    padding: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  whiteButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: blueDark,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  backIcon: {
    backgroundColor: primary,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 40,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continue: {
    position: 'absolute',
    bottom: 20,
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
  floatCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: white,
    height: 80,
  },
});

export default TourInfo;
