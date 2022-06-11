
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground, SafeAreaView,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {black, gray, white, primary} from '../../config/colors';
import {reg12, reg14, reg16, bold12, bold16, bold18, bold20, bold24, oblique12, oblique16} from '../../config/typography.js'
import { UserContext } from '../../contexts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  viewAllTours,
  checkIfTourEmpty,
  getVisitorBookings
} from '../../api/tours';
import { getGuides, getUserByRef } from '../../api/users';
import { getParentData } from '../../api/utilities'
import { SCHOOL } from '../../config/initialState';
import moment from 'moment'
import ViewAll from '../../components/ViewAll';
import Loading from 'components/Loading';



const HomePage = ({ navigation }) => {
  const { user, setUser, userAuth } = useContext(UserContext);

  const [tours, setTours] = useState();
  //guides is a query snapshot, use foreach and .data() for data.
  const [guides, setGuides] = useState();
  const [upcoming, setUpcoming] = useState();
  
  useEffect(() => {
    let isMounted = true
    // Gets list of tours
    if (isMounted) {
      viewAllTours('', 5).then(tours => {
        //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
        //You are not suppose to use async/await functions in useEffect
        //jon has no idea how these 3 isMounted are connected...
        let checkTourPromises = []
        tours.forEach((element) => {checkTourPromises.push(checkIfTourEmpty(element.ref))})
        Promise.all(checkTourPromises).then(values => {
          tours = tours.filter((tour, index) => values[index].empty == false)
          setTours(tours);
        })
      });
      // gets list of guides
      getGuides().then(guides => {
        setGuides(guides);
      });
      // for upcoming tour
      if (userAuth) {
        getVisitorBookings(userAuth.uid).then(bookings => {
          let tourSettingArray = []
  
          bookings.forEach((book) => {
              tourSettingArray.push(getParentData(book.ref))
          })
          Promise.all(tourSettingArray).then((tourSettings) => {
              let guideArray = []
              let tourArray = []
  
              tourSettings.forEach((tourSetting) => {
                  guideArray.push(getUserByRef(tourSetting.guide))
                  tourArray.push(getParentData(tourSetting.ref))
              })
              Promise.all(guideArray).then((guides) => {
                  Promise.all(tourArray).then((tours) => {
                    for (let i = 0; i < bookings.length; i++) {
                      let time = booking.time.toDate()
                      if ((moment(new Date()).isAfter(time) && moment(upcoming).isBefore(time))) {
                        upcomingTime = time
                        setUpcoming({
                          time: bookings[i].time.toDate(),
                          guide: guides[i]._data.name,
                          tour: tours[i].title,
                          tourPicture: tours[i].picture,
                          guidePicture: guides[i]._data.profilePicture
                        })
                      }
                    }
                  })
              })
          })
        })
      }
    }

    return () => {
      isMounted = false
    }
  }, [])

  const viewAll = (text) => {
    return (
      <View style={{paddingHorizontal: 30, marginTop: 15, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...bold20}}>
          {text}
        </Text>
        <ViewAll navigation={navigation}/>
      </View>
    );
  };
  if (!(tours && guides)) {
    return <Loading />
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%', backgroundColor: white }}>
        <Text style={{...bold24, paddingLeft: 30, marginTop: 50,}}>Explore around {SCHOOL}!</Text>
        {/* THIS IS IMPORTANT */}
        {/* THIS IS IMPORTANT */}
        {/* THIS IS IMPORTANT */}
        {/* <TextInput style={styles.input} /> */}
        {/* <Ionicons
          name={'search-sharp'}
          size={32}
          color={gray}
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
        {upcoming && 
          <TouchableOpacity style={{backgroundColor: white, marginHorizontal: '5%', width: '90%', paddingVertical: 15, paddingHorizontal: 20,
          borderRadius: 15, elevation: 5, shadowColor: black, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}
          onPress={()=>{navigation.navigate("MyTrips")}}
          >
            <View style={{display: 'flex', flexWrap:'wrap',flexDirection: 'column', justifyContent:'space-between',}}>
              <View style={{margin: 5, width: 160}}>
                <Text style={{...reg14, color: gray}}>
                  Upcoming Tour</Text>
                <Text style={{...bold16, color: black}}>
                  {upcoming.tour}</Text>
              </View>
              <View style={{margin: 5}}>
                <Text style={{...reg14, color: gray}}>
                  Date</Text>
                <Text style={{...bold16, color: black}}>
                  {moment(upcoming.time).format('MMM DD')}</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}>
              <View style={{ margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 100}}>
                  <Text style={{...reg14, color: gray}}>
                    Tour Guide</Text>
                  <Text style={{...bold16, color: black}}>
                    {upcoming.guide}</Text>
                </View>
                <Image
                  style={{ height: 50, width: 50, borderRadius: 25}}
                  source={{uri: upcoming.guidePicture}}
                />
              </View>
              <View style={{margin: 5}}>
                <Text style={{...reg14, color: gray}}>Time</Text>
                <Text style={{...bold16, color: black}}>{moment(upcoming.time).format('LT')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        }
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
                    style={{        backgroundColor: 'transparent',
                    borderRadius: 10, marginTop: 'auto', height: '70%', width: '100%'}}
                  >
                  <Text 
                    style={{...bold16, color: white, marginTop: 'auto', zIndex: 100, width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 30}}>
                      {item.title}
                  </Text>
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
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={{backgroundColor: 'transparent', borderRadius: 10, marginTop: 'auto', height: '100%', width: '100%'}}
                >
                  <View style={{display: 'flex', flexDirection: 'row', marginTop: 'auto', margin: 10, flexWrap: 'wrap'}}>
                    <Text style={{...bold12, color: white}}>
                      {item.name}
                    </Text>
                    <Text style={{...oblique12, color: white}}>
                      {item.year == undefined?'':', '}
                    </Text>
                    <Text
                      style={{...oblique12, color: white}}>
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
});

export default HomePage;
