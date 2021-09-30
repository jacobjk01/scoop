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
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomePage = ({navigation}) => {
  const [tourimages, setImages] = useState([
    {name: 'Santa Monica', src: require('../images/SantaMonica.png')},
    {name: 'Westwood Tour', src: require('../images/Westwood_village.png')},
  ]);

  const renderItem = ({item}) => {
    const handleOnPress = () => navigation.navigate('TourGuideProfile2', {item});
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View>
          <ImageBackground
            style={styles.listGuideImage}
            imageStyle={{borderRadius: 60}}
            source={item.src}>
          </ImageBackground>
          <Text style={styles.guideName}>
            {item.name}
          </Text>
          <Text style={styles.guideTitle}>
          {item.major}, {item.year}
          </Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>
    );
  };

  const [guideimages, setGuideImages] = useState([
    {
      name: 'Natalie',
      year: 'Junior',
      major: 'Psychobiology',
      src: require('../images/natalie.png'),
    },
    {
      name: 'Trevor',
      year: 'Senior',
      major: 'Marketing',
      src: require('../images/trevor.png'),
    },
    {
      name: 'Brittany',
      year: 'Junior',
      major: 'Mechanical Eng.',
      src: require('../images/brittany.png'),
    },
  ]);
  return (
    <SafeAreaView style={{backgroundColor: colors.grayLight}}>
      <View style={{backgroundColor: colors.primary, height: 100}}>
        <Text style={styles.titleText}>Select Date</Text>
      </View>
      <ScrollView style={{marginRight: 7, marginLeft: 7, height: '100%'}}>

        <View style={styles.guideBox}>
          <View style={{marginTop: 30}}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 20, fontWeight: '700', paddingBottom: 20}}>
              Tour Guides Available
            </Text>
            <View style={styles.line}></View>
          </View>
          <FlatList
            style={{marginBottom: 30}}
            vertical={true}
            data={guideimages}
            renderItem={renderItem}
          />
        </View>
        {/* <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate("TourGuideProfile2")}>
            <Text style={{alignSelf: "center", color: 'white', fontWeight: '600'}}>Book Now</Text>
        </TouchableOpacity> */}
      </ScrollView>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={20} color={colors.primary} />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  baseText: {
    fontFamily: 'Helvetica',
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    fontSize: 24,
    color: colors.white,
    fontFamily: 'Helvetica-Bold'
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 30,
    marginLeft: 10,
  },
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
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
  recommendationbuttonleft: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 7,
    height: 100,
    marginRight: 15,
  },
  recommendationbuttonright: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 7,
    height: 100,
  },
  recommendationTitle: {
    marginTop: 15,
    marginLeft: 15,
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  listTourImage: {
    marginRight: 15,
    width: 200,
    height: 300,
  },
  listGuideImage: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,

    width: 70,
    height: 70,
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
  guideBox: {
    backgroundColor: colors.white,
    borderRadius: 25,
    //ios only
    shadowOffset:{  width: 10,  height: 20,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    //android only

  },
  guideName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    position: 'absolute',
    top: 20,
    left: 100,
    color: colors.black,
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Oblique',
    position: 'absolute',
    bottom: 20,
    left: 100,
    color: colors.black,
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
    backgroundColor: colors.white,
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

export default HomePage;

