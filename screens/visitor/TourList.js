import React, { useState, useEffect } from 'react';
import {
  FlatList, ImageBackground, SafeAreaView, Image,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { renderStars } from '../../components/Stars';
import {titleText, graySmallText, smallBold, largeBoldText, linearGrad} from '../../config/typography.js'
import toursData from '../../data/toursData';
import BackButton from '../../components/BackButton';
import { viewAllTours } from 'api/tours';

const TourList = ({navigation, route}) => {
  const [guideimages, setGuideImages] = useState(toursData.guides);
  const [tours, setTours] = useState(toursData.tours);
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      viewAllTours('', 15).then((tourData) => {
        setTours(tourData)
      })
    }
    return () => isMounted = false
  }, [])
  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%', width: '100%', backgroundColor:'white'}}>
        <BackButton navigation={navigation}/>
        <View style={{marginLeft: 20}}>
          <Text style={{...styles.titleText, marginTop: 100}}>Tours</Text>
          <FlatList
            style={{marginBottom: 10}}
            horizontal={false}
            data={tours}
            renderItem={(tour) => {
              return (
              <View
                style={{marginTop: 20}}
              >
                {/* <FlatList
                  style={{marginTop: 30, marginBottom: 15}}
                  horizontal={true}
                  data={guideimages}
                  renderItem={({item}) => (
                    <ImageBackground
                      style={styles.listGuideImage}
                      imageStyle={{borderRadius: 10}}
                      source={item.src}>
                    </ImageBackground>
                  )}
                /> */}
                <Image
                  source={{uri: tour.item.picture}}
                  style={{
                    marginRight: 10,
                    width: 100,
                    height: 100,
                    borderRadius: 10
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    const itemInfo = {
                      title: tour.item.title,
                      picture: '',
                      id: tour.id,
                      description: tour.item.description,
                    };
                    navigation.navigate('TourInfo', {itemInfo});
                  }}>
                  <Text style={{...smallBold}}>{tour.item.title}</Text>
                  {renderStars(4.5)}
                  {/* <Text style={{marginTop: 5}}>{tour.item.description}</Text> */}
                </TouchableOpacity>
              </View>
            )
            }}></FlatList>
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
    fontWeight: '700',
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
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
});

export default TourList;
