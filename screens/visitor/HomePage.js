import React, {useState, useContext, useEffect, useRef} from 'react';

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
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {black, grayDark, grayLight, grayMed, white, primary} from '../../config/colors';
import {color} from 'react-native-reanimated';
import GuideProfile from './GuideProfile';
import {viewTourSettings, viewAvailableTours, viewAllTours, convertToTourSummary} from '../../api/tours'
import { UserContext } from '../../contexts'
import {titleText, grayMedText, mediumBold, largeBoldText, linearGrad} from '../../config/typography.js'

import toursData from '../../data/toursDatav2';

const HomePage = ({navigation}) => {
  const {
    user, setUser,
  } = useContext(UserContext)

  const [tours, setTours] = useState();
  const [guides, setGuides] = useState(toursData.guides);

  useEffect(() => {
    let isMounted = true
    console.log('useEffect')
    viewAvailableTours().then(tours => {
      //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      //You are not suppose to use async/await functions in useEffect
      //jon has no idea how these 3 isMounted are connected...
        if (isMounted) {
        setTours(tours)
        }
      });
      
    return () => {
      isMounted = false
    }
  }, [])
  console.log('homepage')
  const viewAll = (text) => {
    return (
      <View style={{paddingHorizontal: 30, marginTop: 15, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...largeBoldText}}>
          {text}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TourList')}
          style={{marginLeft: 'auto'}}>
          <View>
            <Text style={{color: '#3D68CC'}}>view all</Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          size={15}
          name={'chevron-forward-sharp'}
          color='#3D68CC'
        />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%', backgroundColor: white}}>
        <Text style={{...titleText, paddingLeft: 30, marginTop: 50,}}>Explore around UCLA!</Text>
        <TextInput style={styles.input}/>
          <Ionicons
            name={'search-sharp'}
            size={32}
            color={grayMed}
            fontFamily='Raleway-Bold'
            style={{left: 35, position: 'absolute', top: 137, zIndex: 100, elevation: 100}}
          />
        {/* <Text style={styles.sectionText}>Category</Text>
        <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.recommendationbuttonleft}>
              <View>
                <Text style={styles.recommendationTitle}>UCLA Picks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recommendationbuttonright}>
              <View>
                <Text style={styles.recommendationTitle}>
                  Outdoor Activities
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <TouchableOpacity style={styles.recommendationbuttonleft}>
              <View>
                <Text style={styles.recommendationTitle}>Sightseeing</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recommendationbuttonright}>
              <View>
                <Text style={styles.recommendationTitle}>Popular Food</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{backgroundColor: primary, marginHorizontal: '5%', width: '90%', paddingVertical: 15, paddingHorizontal: 20,
        borderRadius: 15, elevation: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}
        >
          <View style={{display: 'flex', flexWrap:'wrap',flexDirection: 'column', justifyContent:'space-between',}}>
            <View style={{margin: 5}}>
              <Text style={{...grayMedText}}>
                Upcoming Tour</Text>
              <Text style={{...mediumBold, color: white}}>
                Westwood Tour</Text>
            </View>
            <View style={{margin: 5}}>
              <Text style={{...grayMedText}}>
                Date</Text>
              <Text style={{...mediumBold, color: white}}>
                Jul 14</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexWrap:'wrap', flexDirection: 'column',}}>
            <View style={{margin: 5, display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={{...grayMedText}}>
                  Tour Guide</Text>
                <Text style={{...mediumBold, color: white}}>
                  Brittany</Text>
              </View>
              <Image
                style={{height: 50, width: 50, borderRadius: 25}}
                source={require('../../images/brittany.png')}
              />
            </View>
            <View style={{margin: 5}}>
              <Text style={{...grayMedText}}>
                Time</Text>
              <Text style={{...mediumBold, color: white}}>
                12:00 PM</Text>
            </View>
          </View>
        </View>
        {viewAll('Popular Tours')}
        <FlatList
          style={{marginTop: 10}}
          horizontal={true}
          data={tours}
          renderItem={({item, index}) => {
            return (
              //TODO: make tourinfo get the tour info, this can be done in this screen or in tourinfo screen
            <TouchableOpacity 
              style={{marginBottom: 15, marginLeft: index == 0?20:0}}
              onPress={() => {
                const itemInfo = {title: item.title, picture: item.picture, id: item.id, description: item.description}

                navigation.navigate('TourInfo', {itemInfo})
              }}
            >
              <ImageBackground
                style={styles.listTourImage}
                imageStyle={{borderRadius: 10}}
                source={{uri: item.picture}}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={{linearGrad, marginTop: 'auto', height: '70%', width: '100%'}}
                >
                  <Text style={{...mediumBold, fontWeight: '600', color: white, marginTop: 'auto', left: 20, bottom: 50, zIndex: 100}}>{item.title}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}}
        />
        {viewAll('Tour Guides')}
        <FlatList
          style={{marginTop: 10, marginBottom: 30}}
          horizontal={true}
          data={guides}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              style={{marginLeft: item.id == 0?20:0, marginBottom: 10}}
              onPress={() => navigation.navigate('GuideProfile', {item})}>
              <ImageBackground
                style={styles.listGuideImage}
                imageStyle={{borderRadius: 10,}}
                source={item.src}>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={{linearGrad, marginTop: 'auto', height: '70%', width: '100%'}}
                >
                  <View style={{display: 'flex', flexDirection: 'row', marginTop: 'auto', margin: 10}}>
                    <Text style={{color: white, fontFamily: 'Helvetica-Bold'}}>
                      {item.name},{' '}
                    </Text>
                    <Text style={{color: white, fontFamily: 'Helvetica-Oblique'}}>
                      {item.year}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // tourNotifText: {
  //   color: white,
  //   fontFamily: 'Helvetica-Bold',
  //   fontSize: 18
  // },
  // tourNotifSubText: {
  //   color: grayLight,
  //   fontSize: 15
  // },
  baseText: {
    fontFamily: 'Helvetica',
  },
  // titleText: {
  //   paddingLeft: 30,
  //   marginTop: 50,
  //   fontSize: 27,
  //   fontWeight: '600',
    
  //   fontFamily: 'Helvetica-Bold'
  // },
  input: {
    lineHeight: 50,
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: white,
    height: 60,
    width: '90%',
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: '#656565',
    borderRadius: 10,
    paddingLeft: 60,
    fontSize: 22,

    elevation: 20,
  },
  listTourImage: {
    marginRight: 20,
    width: 210,
    height: 310,
  },
  listGuideImage: {
    marginRight: 10,
    width: 125,
    height: 125,
  },
  // tourText: {
  //   fontWeight: '600',
  //   fontSize: 18,
  //   color: white,
  //   marginTop: 'auto',
  //   left: 20,
  //   bottom: 50,
  //   fontFamily: 'Helvetica-Bold',
  //   zIndex: 100
  // },
  // linearGradTour: {
  //   backgroundColor: 'transparent',
  //   borderRadius: 10,
  //   marginTop: 'auto',
  //   height: '70%',
  //   width: '100%',
  // },
  // linearGradGuide: {
  //   marginTop: 'auto',
  //   height: '70%',
  //   width: '100%',
  //   backgroundColor: 'transparent',
  //   borderRadius: 10,
  // },
});

export default HomePage;
