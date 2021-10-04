import React, {useState, Component} from 'react';
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
import colors from '../../config/colors';
import {color} from 'react-native-reanimated';
import TourGuideProfile from '../visitor/TourGuideProfile';
import toursData from '../../data/toursData';

const ManageTours = ({navigation}) => {
  const tours = toursData.tours;

  return (
    <SafeAreaView>
      <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 20, fontSize: 24, fontWeight: '700', marginBottom: 20}}>
            Manage Tours
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity style={styles.addNewTourCard} onPress={() => navigation.navigate('AddTour')}>
            <Ionicons name={'add'} size={24} style={{color: "#525252", position: 'absolute', left: 8}}/>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#525252', textAlign: 'center', left: 8, top: 1}}>Add a new tour</Text>
            </TouchableOpacity>
          {tours.map((tour) => {
            return(
              <TouchableOpacity style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', tour)}>
                <Image style={styles.tourImage} source={tour.src}></Image>
                <View style={styles.tourTextSection}>
                  <Text style={{fontSize: 10, color: "#9B9BA7"}}>{tour.duration} min | <Ionicons name={'people'} size={12}/> Max {tour.maxPeople} people | <Ionicons name={tour.transportation} size={12}/></Text>
                  <Text style={{fontWeight: '600'}}>{tour.name}</Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>{tour.description}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  tourText: {
    width: 200,
    fontWeight: '600',
    fontSize: 18,
    color: colors.white,
    position: 'absolute',
    bottom: 50,
    left: 20,
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
    height: 250,
    margin: 8,
    borderRadius: 10,
    justifyContent: 'center',
    // textAlign: 'center',
    alignItems: 'center',
    
  },
  tourCard: {
    width: '45%',
    height: 250,
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
    height: '50%',
    borderRadius: 10,
  },
  tourTextSection: {
    position: 'absolute',
    top: '53%',
    left: 10,
    right: 5,
  },
});

export default ManageTours;