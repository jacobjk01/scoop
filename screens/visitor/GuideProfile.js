import React, {useState} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import renderReviews from '../../components/Reviews';
import toursData from '../../data/toursData';
import reviewData from '../../data/reviews';

const GuideProfile = ({navigation, route}) => {
  const [tours, setTours] = useState(toursData);
  const [reviews, setReviews] = useState(reviewData);
  const [seeMore, setSeeMore] = useState(false);
  const {item} = route.params;

  const messageButton = () => {
    return (
      <TouchableOpacity
        onPress={messageButtonHandler}
        style={styles.roundButton1}>
        <Text style={styles.messageFont}>Message</Text>
      </TouchableOpacity>
    );
  };
  const messageButtonHandler = () => {};

  const navigateCheckout = ({item}) => {
    if (item === null) {
      throw Error('checkout item cannot be null');
    }
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TourInfo', {item})}>
        <ImageBackground
          style={styles.listTourImage}
          imageStyle={{borderRadius: 10}}
          source={item.src}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradTour}
          />
        </ImageBackground>
        <Text style={styles.tourText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const bookTourButton = () => {
    const handleOnPress = () => navigation.navigate('GuideBooking1');
    return (
      <TouchableOpacity onPress={handleOnPress} style={styles.roundButton2}>
        <Text style={styles.messageFont}>Book Tour</Text>
      </TouchableOpacity>
    );
  };

  const renderGuideImage = ({item}) => {
    return (
      <View
        style={{
          paddingTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.listGuideImage} source={item.src} />
        <Text style={styles.sectionText}>{item.name}</Text>
        <Text style={styles.baseText}>
          {item.major + ','} {item.year}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => {}} style={styles.roundButton1}>
            <Text style={styles.messageFont}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TourList')}
            style={styles.roundButton2}>
            <Text style={styles.messageFont}>Book Tour</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{height: '100%'}}>
      <ImageBackground
        style={styles.imageHeader}
        source={require('../../images/Westwood_village.png')}
      />
      <ScrollView
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
        }}>
        <View style={{backgroundColor: 'transparent', height: 230}}></View>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -20,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: -80,
              justifyContent: 'center',
            }}>
            {renderGuideImage({item})}
          </View>

          <View style={styles.divider} />
          <View style={{marginTop: 10, marginHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Popular Tours</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TourList')}
              style={{position: 'absolute', right: 10, top: 3}}>
              <View>
                <Text style={{color: '#3D68CC'}}>View All &gt;</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginTop: 10, paddingLeft: 20}}
            horizontal={true}
            data={tours.tours}
            renderItem={({item}) => navigateCheckout({item})}
          />

          <View style={styles.divider} />
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: '700',
              }}>
              {"Hi, I'm " + item.name + '!'}
            </Text>

            <Text
              style={{
                marginTop: 3,
                color: '#9B9BA7',
                fontSize: 14,
                fontStyle: 'italic',
              }}>
              Hometown : Columbia, Missouri
            </Text>
            <View
              style={{marginRight: 30, marginTop: 3, backgroundColor: 'white'}}>
              {!seeMore && (
                <LinearGradient
                  colors={['#ffffff00', 'white']}
                  style={styles.linearGradText}
                />
              )}
              {/* <View style={styles.opacityBlock} /> */}
              <Text style={seeMore ? styles.regularText : styles.limitedText}>
                Coming from a small town in Missouri, getting around LA wasn’t
                easy for me at first, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sapien velit elementum malesuada leo sociis.
                Leo nisi, facilisis fames dignissim euismod nec. Tempus
                scelerisque tempor proin diam int
              </Text>
              <Text
                onPress={() => setSeeMore(!seeMore)}
                style={styles.seeMoreButton}>
                {seeMore ? 'Read Less' : 'Read More'}
              </Text>
            </View>
          </View>

          {/* <SeeMore numberOfLines={5} style={styles.baseText}>
            {
              'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description '
            }
          </SeeMore> */}
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
          {renderReviews(reviews)}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={20} color={'white'} />
      </TouchableOpacity>
    </View>
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
    marginTop: 20,

    borderBottomColor: '#9B9BA7',
    borderBottomWidth: 1,
    marginHorizontal: 30,
  },
  backgroundRectangle: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '10.8%',
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },
  roundButton1: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

    width: 77,
    height: 28,
    backgroundColor: '#3154A5',
    borderRadius: 10,
    marginRight: 10,
  },
  roundButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

    width: 77,
    height: 28,
    backgroundColor: '#3154A5',
    borderRadius: 10,
  },
  listGuideImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#00BCD4',
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
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#656565',
    borderRadius: 7,
    paddingLeft: 20,
  },
  searchicon: {
    position: 'absolute',
    right: 10,
    top: 11,
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
    color: 'white',
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  guideText: {
    width: 120,
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
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
    height: 80,
  },
  seeMoreButton: {
    marginTop: 10,
    color: '#007BBA',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});

export default GuideProfile;
