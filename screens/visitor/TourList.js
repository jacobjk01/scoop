import React, { useState } from 'react';
import {
  FlatList, ImageBackground, SafeAreaView,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { renderStars } from '../../components/Stars';
import toursData from '../../data/toursData';

const TourList = ({navigation, route}) => {
  const [guideimages, setGuideImages] = useState(toursData.guides);
  const [tours, setTours] = useState(toursData.tours);

  return (
    <SafeAreaView>
      <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
        <Text style={styles.titleText}>Tour List</Text>
        <FlatList
          style={{marginBottom: 10}}
          horizontal={false}
          data={tours}
          renderItem={touritem => (
            <View>
              {console.log(touritem.item.name)}
              <FlatList
                style={{marginTop: 30, marginBottom: 15}}
                horizontal={true}
                data={guideimages}
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      const itemInfo = {
                        title: touritem.item.name,
                        picture: '',
                        id: touritem.item.id,
                        description: touritem.item.introduction,
                      };
                      navigation.navigate('TourInfo', {itemInfo});
                    }}>
                    <ImageBackground
                      style={styles.listGuideImage}
                      imageStyle={{borderRadius: 10}}
                      source={item.src}></ImageBackground>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  const itemInfo = {
                    title: touritem.item.name,
                    picture: '',
                    id: touritem.item.id,
                    description: touritem.item.introduction,
                  };
                  navigation.navigate('TourInfo', {itemInfo});
                }}>
                <Text style={styles.sectionText}>{touritem.item.name}</Text>
                {renderStars(4.5)}
                <Text style={{marginTop: 5}}>Duration: 60 min</Text>
                <Text style={{marginTop: 5}}>Transportation: Walking</Text>
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </ScrollView>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={20} color={'white'} />
      </TouchableOpacity>
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
    marginTop: 50,
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
  listGuideImage: {
    marginRight: 10,
    width: 100,
    height: 100,
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
