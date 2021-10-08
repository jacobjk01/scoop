import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import toursData from '../../data/toursData';
import { onAuthStateChanged } from '../../api/auth';
import { getUser } from '../../api/users';

const Home = ({navigation}) => {
  const tours = toursData.tours;
  const currentTour = tours[0];
  const [userAuth, setUserAuth] = useState(null);
  const [user, setUser] = useState(null);
  
  
  return (
    <SafeAreaView backgroundColor='white'>
      <ScrollView style={{height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 30, fontSize: 24, fontWeight: '700'}}>
            Upcoming Tours
          </Text>
        </View>
        <View style={{flexWrap: 'wrap', alignContent: 'center'}}>
            {/* <TouchableOpacity style={styles.currentTourCard} onPress={() => navigation.navigate('TourEdit', {tour: currentTour})}>
                <Image style={styles.currentTourImage} source={currentTour.src}></Image>
                <View style={[styles.tourTextSection, {top: '72%'}]}>
                    <View style={styles.tourDateSection}>
                        <Text style={styles.tourDateText}>{currentTour.tourMonth}</Text>
                        <Text style={styles.tourDateText}>{currentTour.tourDay}</Text>
                    </View>
                    <View style={[styles.tourInfoSection, {marginLeft: '15%'}]}>
                        <Text style={styles.tourNameText}>{currentTour.name}</Text>
                        <Text style={{marginTop: 5}}>{currentTour.startTime}</Text>
                        <Text style={{marginTop: 5}}>{currentTour.meetPoint}</Text>
                    </View>
                    <View style={[styles.forwardIcon, {right: 10}]}>
                        <Ionicons name="chevron-forward-outline" size={20} color={'gray'} />
                    </View>
                </View>
            </TouchableOpacity> */}
          {tours.slice(1).map((tour) => {
            return(
              <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', {tour})}>
                {/* <Image style={styles.tourImage} source={tour.src}></Image> */}
                <View style={styles.tourTextSection}>
                    <View style={styles.tourDateSection}>
                        <Text style={styles.tourDateText}>{tour.tourMonth}</Text>
                        <Text style={styles.tourDateText}>{tour.tourDay}</Text>
                    </View>
                    <View style={styles.tourInfoSection}>
                        <Text style={styles.tourNameText}>{tour.name}</Text>
                        <Text style={{marginTop: 5}}>{tour.startTime}</Text>
                        <Text style={{marginTop: 5}}>{tour.meetPoint}</Text>
                    </View>
                    <View style={styles.forwardIcon}>
                        <Ionicons name="chevron-forward-outline" size={20} color={'gray'} />
                    </View>
                </View>
                {/* <View style={styles.divider}></View> */}
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tourDateSection: {
    marginTop: 8,
    width: '20%',
  },
  tourInfoSection: {
    fontSize: 14,
    marginLeft: '3%',
    flex: 1,
    paddingRight: '15%',
  },
  tourDateText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#3154A5',
    alignSelf: 'center',
  },
  tourNameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  currentTourCard: {
    width: '85%',
    height: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10
  },
  tourCard: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  currentTourImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',
    borderRadius: 10,
  },
//   tourImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//     left: '23%',
//     bottom: '15%',
//   },
  tourTextSection: {
    position: 'absolute',
    top: '15%',
    left: 10,
    right: 5,
    flexDirection: 'row',
  },
  forwardIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 30,
  },
  divider: {
    borderBottomColor: '#9B9BA7',
    borderBottomWidth: 1,
    width: '100%',
    },
});

export default Home;
