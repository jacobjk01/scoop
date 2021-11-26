import React, {useState, useContext} from 'react';

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

import toursData from '../../data/toursDatav2';

const HomePage = ({navigation}) => {


  const [tours, setTours] = useState(toursData.generalTours);
  const [guides, setGuides] = useState(toursData.guides);
  const viewAll = (text) => {
    return (
      <View style={{paddingHorizontal: 30, marginTop: 15, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{ fontSize: 23, fontWeight: '700'}}>
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
        <Text style={styles.titleText}>Explore around UCLA!</Text>
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
        {viewAll('Popular Tours')}
        <FlatList
          style={{marginTop: 10}}
          horizontal={true}
          data={tours}
          renderItem={({item, index}) => {
            return (
              //TODO: make tourinfo get the tour info, this can be done in this screen or in tourinfo screen
            <TouchableOpacity 
              key={item.id} 
              style={{marginBottom: 15, marginLeft: item.id == 0?20:0}}
              onPress={() => {
                navigation.navigate('TourInfo', {item})
              }}
            >
              <ImageBackground
                style={styles.listTourImage}
                imageStyle={{borderRadius: 10}}
                source={item.src}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.linearGradTour}
                >
                  <Text style={styles.tourText}>{item.name}</Text>
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
                  style={styles.linearGradGuide}
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
  baseText: {
    fontFamily: 'Helvetica',
  },
  titleText: {
    paddingLeft: 30,
    fontSize: 27,
    fontWeight: '600',
    marginTop: 50,
    fontFamily: 'Helvetica-Bold'
  },
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
  tourText: {
    fontWeight: '600',
    fontSize: 18,
    color: white,
    marginTop: 'auto',
    left: 20,
    bottom: 50,
    fontFamily: 'Helvetica-Bold',
    zIndex: 100
  },
  linearGradTour: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginTop: 'auto',
    height: '70%',
    width: '100%',
  },
  linearGradGuide: {
    marginTop: 'auto',
    height: '70%',
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
});

export default HomePage;
