import React, {useState, useEffect} from 'react';
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
import colors from 'config/colors';
import toursData from 'data/toursData';
import {color} from 'react-native-reanimated';
import GuideProfile from '../visitor/GuideProfile';
import { getUser } from 'api/users';
import { onAuthStateChanged } from 'api/auth';

const ManageTours = ({navigation}) => {
  const tours = toursData.tours;
  const [userAuth, setUserAuth] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log('onAuthStateChanged called')
    var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
      //if userAuth exists, 
      if (newUserAuth && userAuth == null) { // userAuth is null, so definitely unique
        setUserAuth(newUserAuth);
      // userAuth exists and doesn't match with with newUserAuth.uid
      } else if (userAuth.uid && newUserAuth && (userAuth.uid != newUserAuth.uid)) {
        setUserAuth(newUserAuth);
      }
    })
    return () => {
      unsubscribeAuth();
    }
  }, []);
  useEffect(async () => {
    if (userAuth) {
      console.log('user logged in');
      const currentUser = await getUser(userAuth);
      setUser({...currentUser.data()})
    }
  }, [userAuth]);

  if (!user) {
      return (
          <SafeAreaView>
              <Text>User not logged in</Text>
          </SafeAreaView>
      );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
          <View style={{marginTop: 50}}>
            <Text style={{marginLeft: 20, fontSize: 24, fontWeight: '700', marginBottom: 40}}>
              Manage Tours
            </Text>
            <TouchableOpacity style={styles.selectButton}>
            <Text style={{color: '#007BBA'}}>Select</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <TouchableOpacity style={styles.addNewTourCard} onPress={async () => {
                navigation.navigate('AddTour')
              }}>
              <Ionicons name={'add'} size={24} style={{color: "#525252", position: 'absolute', left: 8}}/>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#525252', textAlign: 'center', left: 8, top: 1}}>
                Add a new tour
              </Text>
              </TouchableOpacity>
            {tours.map((tour) => {
              return(
                <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', {tour})}>
                  <Image style={styles.tourImage} source={tour.src}></Image>
                  <View style={styles.tourTextSection}>
                    <Text style={styles.tourTitle}>{tour.name}</Text>
                    <Text style={styles.tourText}>{tour.duration} min | <Ionicons name={'people'} size={12}/> Max {tour.maxPeople} people | <Ionicons name={tour.transportation} size={12}/></Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
  },
  selectButton: {
    position: 'absolute',
    top: 7,
    right: 22,
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 30,
    marginLeft: 10,
  },
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
  },
  listGuideImage: {
    marginRight: 10,
    width: 120,
    height: 120,
  },
  tourTitle: {
    // width: 200,
    fontWeight: '600',
    // fontSize: 18,
    color: colors.white,
    position: 'absolute',
    bottom: 45,
    // left: 20,
  },
  tourText: {
    position: 'absolute',
    color: colors.white,
    fontSize: 10,
    bottom: 30,
  },
  guideText: {
    width: 120,
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: colors.white,
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
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  addNewTourCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    // stroke-dasharray: "8, 3",
    borderColor: '#525252',
    width: '45%',
    height: 160,
    margin: 8,
    borderRadius: 10,
    justifyContent: 'center',
    // textAlign: 'center',
    alignItems: 'center',
    
  },
  tourCard: {
    width: '45%',
    height: 160,
    margin: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tourImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tourTextSection: {
    position: 'relative',
    top: '110%',
    left: 10,
    right: 5,
  },
});

export default ManageTours;