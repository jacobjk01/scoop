
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground, SafeAreaView,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {black, grayDark, grayLight, grayMed, white, primary} from '../../config/colors';
import {color} from 'react-native-reanimated';
import { UserContext } from '../../contexts'
import {titleText, graySmallText, mediumBold, largeBoldText, linearGrad} from '../../config/typography.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  viewAvailableTours,
  checkIfTourEmpty,
} from '../../api/tours';
import { getGuides } from '../../api/users';
import { SCHOOL } from '../../config/initialState';



const HomePage = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [tours, setTours] = useState();
  //guides is a query snapshot, use foreach and .data() for data.
  const [guides, setGuides] = useState();

  useEffect(() => {
    let isMounted = true
    viewAvailableTours().then(tours => {
      //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      //You are not suppose to use async/await functions in useEffect
      //jon has no idea how these 3 isMounted are connected...
      if (isMounted) {
        checkTourPromises = []
        tours.forEach((element) => {checkTourPromises.push(checkIfTourEmpty(element.ref))})
        Promise.all(checkTourPromises).then(values => {
          tours = tours.filter((tour, index) => values[index].empty == false)
          setTours(tours);
        })
      }
    });
    getGuides().then(guides => {
      if (isMounted) {
        setGuides(guides);
      }
    });

    return () => {
      isMounted = false
    }
  }, [])
  const viewAll = (text) => {
    return (
      <View style={{paddingHorizontal: 30, marginTop: 15, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...largeBoldText}}>
          {text}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TourList')}
          style={{ marginLeft: 'auto' }}>
          <View>
            <Text style={{ color: '#3D68CC' }}>view all</Text>
          </View>
        </TouchableOpacity>
        <Ionicons size={15} name={'chevron-forward-sharp'} color="#3D68CC" />
      </View>
    );
  };

  return (
    <SafeAreaView>
      {tours && guides && <ScrollView style={{ height: '100%', backgroundColor: white }}>
        <Text style={{...titleText, paddingLeft: 30, marginTop: 50,}}>Explore around {SCHOOL}!</Text>
        {/* THIS IS IMPORTANT */}
        {/* THIS IS IMPORTANT */}
        {/* THIS IS IMPORTANT */}
        {/* <TextInput style={styles.input} /> */}
        {/* <Ionicons
          name={'search-sharp'}
          size={32}
          color={grayMed}
          fontFamily="Raleway-Bold"
          style={{
            left: 35,
            position: 'absolute',
            top: 137,
            zIndex: 100,
            elevation: 100,
          }}
        /> */}
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
        <View style={{backgroundColor: white, marginHorizontal: '5%', width: '90%', paddingVertical: 15, paddingHorizontal: 20,
        borderRadius: 15, elevation: 5, shadowColor: black, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}
        >
          <View style={{display: 'flex', flexWrap:'wrap',flexDirection: 'column', justifyContent:'space-between',}}>
            <View style={{margin: 5}}>
              <Text style={{...graySmallText, color: grayDark}}>
                Upcoming Tour</Text>
              <Text style={{...mediumBold, color: black}}>
                Westwood Tour</Text>
            </View>
            <View style={{margin: 5}}>
              <Text style={{...graySmallText, color: grayDark}}>
                Date</Text>
              <Text style={{...mediumBold, color: black}}>
                Jul 14</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
            }}>
            <View style={{ margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 150 }}>
              <View>
                <Text style={{...graySmallText, color: grayDark}}>
                  Tour Guide</Text>
                <Text style={{...mediumBold, color: black}}>
                  Brittany</Text>
              </View>
              <Image
                style={{ height: 50, width: 50, borderRadius: 25}}
                source={require('../../images/brittany.png')}
              />
            </View>
            <View style={{margin: 5}}>
              <Text style={{...graySmallText, color: grayDark}}>
                Time</Text>
              <Text style={{...mediumBold, color: black}}>
                12:00 PM</Text>
            </View>
          </View>
        </View>
        {viewAll('Popular Tours')}
        <FlatList
          style={{ marginTop: 10 }}
          horizontal={true}
          data={tours}
          renderItem={({item, index}) => {
            const tour = {title: item.title, picture: item.picture, id: item.id, description: item.description}
            return (
              <TouchableOpacity 
                style={{marginBottom: 15, marginLeft: index == 0?20:0}}
                onPress={() => {
                  navigation.navigate('TourInfo', {tour})
                }}
              >
                <ImageBackground
                  style={{...styles.listTourImage}}
                  imageStyle={{borderRadius: 10}}
                  source={{uri: tour.picture}}
                >
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={{...linearGrad, marginTop: 'auto', height: '70%', width: '100%'}}
                  >
                  <Text style={{...mediumBold, fontWeight: '600', color: white, marginTop: 'auto', left: 20, bottom: 50, zIndex: 100}}>{item.title}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}}
        />
        {viewAll('Tour Guides')}
        <FlatList
          style={{ marginLeft: 20, marginTop: 10, marginBottom: 30 }}
          horizontal={true}
          data={guides}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={{marginLeft: item.id == 0?20:0, marginBottom: 10}}
              onPress={() => navigation.navigate('Profile', {id: item.id, pageType: 'guideFlow'})}>
              <ImageBackground
                style={styles.listGuideImage}
                imageStyle={{ borderRadius: 10 }}
                source={item.profilePicture == undefined?require('../../images/defaultpfp.png'):{ uri: item.profilePicture }}>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.4)']}
                  style={{...linearGrad, marginTop: 'auto', height: '100%', width: '100%'}}
                >
                  <View style={{display: 'flex', flexDirection: 'row', marginTop: 'auto', margin: 10, flexWrap: 'wrap'}}>
                    <Text style={{color: white, fontFamily: 'Helvetica-Bold'}}>
                      {item.name}{item.year == undefined?'':', '}
                    </Text>
                    <Text
                      style={{ color: white, fontFamily: 'Helvetica-Oblique' }}>
                      {item.year}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </ScrollView>}
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
