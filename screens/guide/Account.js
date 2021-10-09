import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tourGuides from '../../data/tourGuides';

const Account = ({navigation}) => {
  const item = tourGuides[0];

  return (
    <ImageBackground
      source={require('../../images/Santa_Monica.png')}
      style={styles.backgroundImage}>
      {renderGuideImage(item.picture)}
      <ScrollView
        style={{
          marginTop: '40%',
          paddingRight: 20,
          paddingLeft: 20,
          height: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <SafeAreaView>
          {renderGuideBio({item})}
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountEdit', item)}
            style={{position: 'absolute', right: 10, top: 20}}>
            <View>
              <Text style={{color: '#9B9BA7'}}>
                Edit <Ionicons name={'pencil'} size={16} />
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
        </SafeAreaView>
        <View>
          <Text style={styles.titleText}>{'Introduction'}</Text>
          <Text style={styles.subtitleText}>
            {'Hometown: ' + item.hometown}
          </Text>
          <Text style={styles.bodyText}>{item.intro}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={{fontSize: 20, fontWeight: '700'}}>{'Languages'}</Text>
      </ScrollView>
    </ImageBackground>
  );
};

const renderGuideImage = ({item}) => {
  return (
    <View
      style={{
        top: 275,
        alignItems: 'center',
        zIndex: 1,
      }}>
      <Image style={styles.guideImage} source={item} />
    </View>
  );
};

const renderGuideBio = ({item}) => {
  return (
    <View
      style={{
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.sectionText}>{item.name}</Text>
      <Text style={styles.baseText}>
        {item.major + ','} {item.year}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  divider: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#9B9BA7',
    borderBottomWidth: 1,
  },
  guideImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#00BCD4',
    position: 'absolute',
    bottom: 70,
  },
  baseText: {
    fontFamily: 'Helvetica',
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 30,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    fontStyle: 'italic',
    color: '#9B9BA7',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
  },
});

export default Account;
