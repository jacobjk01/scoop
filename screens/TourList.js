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
import colors from '../config/colors';
import {color} from 'react-native-reanimated';
import TourGuideProfile from './TourGuideProfile';

const TourList = ({navigation}) => {
  const [tourimages, setImages] = useState([
    {name: 'Santa Monica', src: require('../images/SantaMonica.png')},
    {name: 'Westwood Tour', src: require('../images/Westwood_village.png')},
  ]);

  const renderItem = ({item}) => {
    const handleOnPress = () => navigation.navigate('TourInfo2', {item});
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <ImageBackground
          style={styles.listGuideImage}
          imageStyle={{borderRadius: 10}}
          source={item.src}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradGuide}
          />
        </ImageBackground>
        <Text style={styles.guideText}>
          {item.name}, {item.year}, {item.major}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '700', marginBottom: 20}}>
            Tours with Brittany
          </Text>
        </View>
        {/* <FlatList
          style={{marginTop: 10}}
          horizontal={true}
          data={tourimages}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('TourInfo2')}>
              <ImageBackground
                style={styles.listTourImage}
                imageStyle={{borderRadius: 10}}
                source={item.src}>
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={styles.linearGradTour}
                />
              </ImageBackground>
              <Text style={styles.tourText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        /> */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {tourimages.map((tour) => {
            return(
              <TouchableOpacity style={styles.tourCard} onPress={() => navigation.navigate('TourInfo2')}>
                <Image style={styles.tourImage} source={tour.src}></Image>
                <View style={styles.tourTextSection}>
                  <Text style={{color: "#9B9BA7"}}>60 min | Max 6 people</Text>
                  <Text style={{fontWeight: '600'}}>Westwood Tour</Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>Get to know the neighborhood: where to grocery shop, where the best hangout...</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        {/*           
          <View style={styles.tourCard}>
            
          </View>
          <View style={styles.tourCard}>
            
          </View> */}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={20} color='white' />
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
  tourCard: {
    width: '45%',
    height: 250,
    margin: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5
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
    justifyContent: 'center'
},
});

export default TourList;