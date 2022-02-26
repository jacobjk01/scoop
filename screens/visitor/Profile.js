import React, { useState, useEffect } from 'react';
//import SeeMore from 'react-native-see-more-inline';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Button,
  ReadMore,
  StatusBar,
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Reviews from '../../components/Reviews';
import { primary, grayDark, white, black, tappableBlue, grayLight, grayMed } from 'config/colors';
import reviewData from '../../data/reviews';
import { getUser, getUserById } from '../../api/users';
import { viewMyTours, getTour } from '../../api/tours';
import BackButton from '../../components/BackButton';

const Profile = ({ navigation, route }) => {
  const [tours, setTours] = useState([]);
  let guideModel = {
    name: '',
    hometown: '',
    major: '',
    profilePicture: '',
    intro: '',
    year: ''
  }
  const [guide, setGuide] = useState(guideModel)
  const [reviews, setReviews] = useState(reviewData);
  const [seeMore, setSeeMore] = useState(false);
  //route.params is guideId
  useEffect(() => {
    let isMounted = true
    if (isMounted && route.params.pageType=='guideFlow') {
      getUserById(route.params.id).then(guideInfo => {
        guideInfo._data.id = route.params.id
        setGuide(guideInfo._data)
      });
      //gets all tour settings that the guide runs
      viewMyTours(route.params.id).then(tourSettings => {
        let parentIds = []
        let promiseArray = []
        //checks for copies before putting id in parentId
        tourSettings.forEach((tourSetting) => {
          let push = true
          for(let i = 0; i < parentIds.length; i++) {
            if (tourSetting.parentId == parentIds[i]){
              push = false
            }
          }
          if(push) {
            parentIds.push(tourSetting.parentId)
          }
        })
        //makes promise array with parentIds
        parentIds.forEach((parentId) => {
          promiseArray.push(getTour(parentId))
        })
        //resolves promiseArray, sets State
        Promise.all(promiseArray).then(tempTours => {
          //adds the id of the tour to tourInfo
          for (let i = 0; i < tempTours.length; i++) {
            tempTours[i] = tempTours[i]._data
            tempTours[i].id = parentIds[i]
          }
          setTours(tempTours)
        })
      })
    }
    else if (route.params.pageType=='tourFlow') {
      setGuide(route.params.guide)
    }
    return () => {
      isMounted = false
    }
  }, [])

  const navigateCheckout = ({item}) => {
    const tour = {
      title: item.title,
      picture: item.picture,
      description: item.description,
      id: item.id
    };

    if (item === null) {
      throw Error('checkout item cannot be null');
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TourInfo', { tour, guide, pageType: 'guideFlow' });
        }}>
        <ImageBackground
          style={styles.listTourImage}
          imageStyle={{ borderRadius: 10 }}
          source={{uri: tour.picture}}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
          />
        </ImageBackground>
        <Text style={styles.tourText}>{tour.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderGuideImage = () => {
    return (
      <View
        style={{
          paddingTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.listGuideImage} source={{uri: guide.profilePicture}} />
        <Text style={styles.sectionText}>{guide.name}</Text>
        <Text style={styles.baseText}>
          {guide.major + ','} {guide.year}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {route.params.pageType=='tourFlow' &&
            <TouchableOpacity
            onPress={() => {
              const tour = route.params.tour
              const selectedDay = route.params.selectedDay
              navigation.navigate('TourBooking2', {tour, selectedDay, guide})}
            }
            style={styles.roundButton2}>
            <Text style={styles.messageFont}>Book Tour</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      style={{
        height: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 10,
      }}
      source={require('../../images/Westwood_village.jpg')}
    >
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          width: '100%',
        }}
      >
        <BackButton navigation={navigation}/>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: 200,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: -80,
              justifyContent: 'center',
            }}>
            {renderGuideImage()}

          </View>

          {route.params.pageType=='guideFlow' &&
            <>
              <View style={styles.divider} />
              <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Popular Tours</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TourList')}
                  style={{ position: 'absolute', right: 10, top: 3 }}>
                  <View>
                    <Text style={{ color: '#3D68CC' }}>View All &gt;</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <FlatList
                style={{ marginTop: 10, paddingLeft: 20 }}
                horizontal={true}
                data={tours}
                renderItem={item => navigateCheckout(item)}
              />
              {tours[0] == null &&
                <Text
                  style={{
                    fontSize: 18,
                    color: grayLight,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                >
                  No Available Tours
                </Text>
              }
            </>
          }
          <View style={styles.divider} />
          <View style={{marginLeft: 'auto', marginRight: 'auto', width: '90%'}}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: '700',
              }}>
              {"Hi, I'm " + guide.name + '!'}
            </Text>

            <Text
              style={{
                marginTop: 3,
                color: '#9B9BA7',
                fontSize: 14,
                fontStyle: 'italic',
              }}>
              Hometown: {guide.hometown}
            </Text>
            <View
              style={{marginTop: 3, backgroundColor: 'white', width: '100%'}}>
              {!seeMore && (
                <LinearGradient
                  colors={['#ffffff00', 'white']}
                  style={styles.linearGradText}
                />
              )}
              {/* <View style={styles.opacityBlock} /> */}
              <Text style={seeMore ? styles.regularText : styles.limitedText}>
                {guide.intro}
              </Text>
              <Text
                onPress={() => setSeeMore(!seeMore)}
                style={styles.seeMoreButton}>
                {seeMore ? 'Read Less' : 'Read More'}
              </Text>

            </View>
          </View>
          <View style={styles.divider} />
          <Text
            style={{
              marginLeft: 20,
              marginTop: 20,
              fontSize: 20,
              fontWeight: '700',
            }}>
            {'Languages'}
          </Text>
          <View style={styles.divider} />
          <Text
            style={{
              marginLeft: 20,
              marginTop: 20,
              fontSize: 20,
              fontWeight: '700',
            }}>
            {'Reviews:'}
          </Text>
        </View>
        <View style={{backgroundColor: 'white', paddingBottom: 20}}>
          <Reviews reviews={reviews} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageHeader: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
    zIndex: -10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  divider: {
    marginTop: 30,

    borderBottomColor: grayDark,
    borderBottomWidth: 1,
  },
  backgroundRectangle: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '10.8%',
    backgroundColor: white,
    // box-shadow: 0px -2px 10px rgba(151, 151, 151, 0.3);
    // borderRadius: '20px',
  },
  messageFont: {
    position: 'relative',

    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: white,
  },
  roundButton1: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

    width: 77,
    height: 28,
    backgroundColor: primary,
    borderRadius: 10,
    marginRight: 10,
  },
  roundButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

    width: 77,
    height: 28,
    backgroundColor: primary,
    borderRadius: 10,
  },
  listGuideImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  baseText: {
    fontFamily: 'Helvetica',
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  input: {
    alignSelf: 'center',
    backgroundColor: white,
    height: 50,
    width: '100%',
    borderRadius: 7,
    paddingLeft: 20,
  },
  searchicon: {
    position: 'absolute',
    right: 10,
    top: 11,
  },
  recommendationbuttonleft: {
    flex: 1,
    backgroundColor: primary,
    borderRadius: 7,
    height: 100,
    marginRight: 15,
  },
  recommendationbuttonright: {
    flex: 1,
    backgroundColor: primary,
    borderRadius: 7,
    height: 100,
  },
  recommendationTitle: {
    marginTop: 15,
    marginLeft: 15,
    color: white,
    fontWeight: '600',
    fontSize: 16,
  },
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
  },
  backIcon: {
    backgroundColor: '#3154A5',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tourText: {
    width: 200,
    fontWeight: '600',
    fontSize: 18,
    color: white,
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  guideText: {
    width: 120,
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: white,
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
  linearGradGuide: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  linearGradText: {
    position: 'absolute',
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    opacity: 1,
    zIndex: 10,
  },
  regularText: {},
  limitedText: {
    maxHeight: 80,
  },
  seeMoreButton: {
    marginTop: 10,
    color: '#007BBA',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});

export default Profile;
