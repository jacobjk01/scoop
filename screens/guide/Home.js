import React, {useState, Component} from 'react';
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../config/colors';
import toursData from '../../data/toursData';

const Home = ({navigation}) => {
  const tours = toursData.tours;
  const nextTour = tours[0];

  return (
    <SafeAreaView backgroundColor='white'>
      <ScrollView style={{height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 30, fontSize: 24, fontWeight: '700'}}>
            Upcoming Tours
          </Text>
        </View>
        <View style={{flexWrap: 'wrap', alignContent: 'center'}}>
            <TouchableOpacity style={styles.nextTourCard} onPress={() => navigation.navigate('TourEdit', {tour: nextTour})}>
                <Image style={styles.nextTourImage} source={nextTour.src}></Image>
                <View style={[styles.tourTextSection, {top: '72%'}]}>
                    <View style={styles.tourDateSection}>
                        <Text style={styles.tourDateText}>{nextTour.tourMonth}</Text>
                        <Text style={styles.tourDateText}>{nextTour.tourDay}</Text>
                    </View>
                    <View style={[styles.tourInfoSection, {marginLeft: '15%'}]}>
                        <Text style={styles.tourNameText}>{nextTour.name}</Text>
                        <Text style={{marginTop: 5}}>{nextTour.startTime}</Text>
                        <Text style={{marginTop: 5}}>{nextTour.meetPoint}</Text>
                    </View>
                    <View style={[styles.forwardIcon, {right: 10}]}>
                        <Ionicons name="chevron-forward-outline" size={20} color={'gray'} />
                    </View>
                </View>
            </TouchableOpacity>
          {tours.slice(1).map((tour) => {
            return(
              <TouchableOpacity style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', {tour})}>
                <Image style={styles.tourImage} source={tour.src}></Image>
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
                <View style={styles.divider}></View>
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
  tourDateSection: {
    marginTop: 8,
    width: '20%',
  },
  tourInfoSection: {
    fontSize: 14,
    marginLeft: '25%',
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
  nextTourCard: {
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
  nextTourImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',
    borderRadius: 10,
  },
  tourImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    left: '23%',
    bottom: '15%',
  },
  tourTextSection: {
    position: 'absolute',
    // top: '72%',
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