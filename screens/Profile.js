import React, { useState, useEffect, useContext } from 'react';
//import SeeMore from 'react-native-see-more-inline';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Button,
  ReadMore,
  StatusBar,
} from 'react-native';
import { UserContext } from '../contexts';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Reviews from '../components/Reviews';
import { primary, gray, white, black, lightGray, tappableBlue } from '../config/colors';
import {bold24, bold18, bold20} from '../config/typography.js'
import reviewData from '../data/reviews';
import { getUser, getUserById } from '../api/users';
import { viewMyTours, getTour } from '../api/tours';
import BackButton from '../components/BackButton';
import ViewAll from 'components/ViewAll';
import Loading from 'components/Loading';

const Profile = ({ navigation, route }) => {
  const { user, userAuth } = useContext(UserContext)
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
    else if (route.params.pageType=='Account') {
      setGuide(user)
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

    if (item === null) throw Error('checkout item cannot be null');
    if (tour.picture === '') return <Loading />
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TourInfo', { tour, guide, pageType: 'guideFlow' });
        }}>
        <ImageBackground
          style={styles.listTourImage}
          imageStyle={{ borderRadius: 10}}
          source={{uri: tour.picture}}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
          />
          <Text style={{...bold18, color: white}}>{tour.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderGuideImage = () => {
    if (guide.profilePicture === '') return <Loading />
    return (
      <View
        style={{
          paddingTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
                width: 115,
                height: 115,
                borderRadius: 100,
                backgroundColor: 'transparent',
          }}
          source={guide.profilePicture==undefined?require('../images/defaultpfp.png'):{uri: guide.profilePicture}}
        />
        {route.params.pageType == 'Account' &&
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 130}}
            onPress={() => {navigation.navigate('ProfileEdit')}}
          >
            <Text style={{ color: gray}}>Edit <Ionicons name={'pencil'} size={16} /></Text>
          </TouchableOpacity>
        }
        <Text style={{ fontSize: 22, fontWeight: '700', marginTop: 5 }}>{guide.name}</Text>
        <Text style={{fontSize: 16, marginTop: 5}}>
          {guide.major==undefined?'':guide.major}{guide.major==undefined && guide.year==undefined?'':','} {guide.year==undefined?'':guide.year}
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
                const tour = route.params .tour
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
      source={require('../images/Westwood_village.jpg')}
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
            marginTop: 180,
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: -100,
              justifyContent: 'center',
            }}>
            {renderGuideImage()}

          </View>
          
          {route.params.pageType=='guideFlow' && 
            <>
              <View style={styles.divider} />
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
                <Text style={{...bold18, marginLeft: 5}}>Tours</Text>
                <ViewAll navigaton={navigation}/>
              </View>
              <FlatList
                horizontal={true}
                data={tours}
                renderItem={item => navigateCheckout(item)}
                style={{marginTop: 20, marginBottom: 30}}
              />
              {tours[0] == null &&
                <Text
                  style={{
                    fontSize: 18,
                    color: lightGray,
                  }}
                >
                  No Available Tours
                </Text>
              }
            </>
          }
          <View style={styles.divider} />
          <View>
            <Text
              style={{...bold18, marginTop: 20, marginLeft: 5}}>
              {"Hi, I'm " + guide.name + '!'}
            </Text>

            <Text
              style={{
                color: gray,
                fontSize: 14,
                fontStyle: 'italic',
                marginVertical: 5,
              }}>
              {guide.hometown? `Hometown: ${guide.hometown}`: 'No Hometown'}
            </Text>
            <View
              style={{backgroundColor: 'white', width: '100%'}}>
              {/* {!seeMore && (
                <LinearGradient
                  colors={['#ffffff00', white]}
                  style={styles.linearGradText}
                />
              )} */}
              {/* <View style={styles.opacityBlock} /> */}
              <Text style={{ fontSize: 16, marginBottom: 20}}>
                {guide.intro?guide.intro: 'No Intro'}
              </Text>
              {/* <Text
                onPress={() => setSeeMore(!seeMore)}
                style={styles.seeMoreButton}>
                {seeMore ? 'Read Less' : 'Read More'}
              </Text> */}
            </View>
          </View>
          <View style={styles.divider} />
          <Text
            style={{...bold18, marginVertical: 20, marginLeft: 5}}>
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
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomColor: gray,
    borderBottomWidth: 1,
    width: '90%'
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
  roundButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginVertical: 15,
    width: 77,
    height: 28,
    backgroundColor: primary,
    borderRadius: 10,
  },
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
    paddingVertical:30,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'flex-end'
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
    color: tappableBlue,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});

export default Profile;
