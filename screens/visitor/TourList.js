import React, { useState, useEffect } from 'react';
import {
  FlatList, ImageBackground, SafeAreaView, Image,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { renderStars } from '../../components/Stars';
import {bold24, bold18, bold20} from '../../config/typography.js'
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
          <Text style={{...bold24, marginTop: 100}}>Tours</Text>
          <FlatList
            style={{marginBottom: 10}}
            horizontal={false}
            data={tours}
            renderItem={(tour) => {
              return (
              <View
              key={tour.id}
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
                    width: 110,
                    height: 110,
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
                  <Text style={{...bold18}}>{tour.item.title}</Text>
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
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
  },
});

export default TourList;
