import { placeholder } from '@babel/types';
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Select,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tourGuides from '../../data/tourGuides';
import { UserContext } from '../../contexts'


const AccountEdit = ({navigation}) => {
  const {user} = useContext(UserContext);

  useEffect(() => {
  },[user])

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require('../../images/SantaMonica.png')}
          style={styles.backgroundImage}>
          {renderGuideImage(user.profilePicture)}
          <TouchableOpacity
            // onPress={() => }
            style={{position: 'absolute', right: 25, top: 120}}>
            <Ionicons name={'camera'} size={25} color={'#9B9BA7'}/>
          </TouchableOpacity>
          <View
            style={{
              marginTop: '40%',
              paddingTop: 40,
              paddingRight: 20,
              paddingLeft: 20,
              height: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>

              <Text style={styles.titleText}>
                {'First Name'}
              </Text>
              <TextInput style={styles.input} placeholder='Edit your name'>
                {user.name}
              </TextInput>
              <Text style={styles.titleText}>
                {'Year'}
              </Text>
              <TextInput style={styles.input} placeholder='Select Year'>
                {user.year}
              </TextInput>
              <Text style={styles.titleText}>
                {'Major'}
              </Text>
              <TextInput style={styles.input} placeholder='Edit your major'>
                {user.major}
              </TextInput>
              <Text style={styles.titleText}>
                {'Intro'}
              </Text>
              <TextInput style={styles.inputIntro} placeholder='Tell us about yourself!'>
                {user.intro}
              </TextInput>
              <Text style={styles.titleText}>
                {'Hometown'}
              </Text>
              <TextInput style={styles.input} placeholder='Edit your hometown'>
                {user.hometown}
              </TextInput>
              <View style={styles.divider} />
              <Ionicons name='add' style={styles.addIcon} size={30}/>
              <Text style={styles.bodyText}>Add another language</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderGuideImage = (profilePicture) => {
  return (
    <TouchableOpacity
        // onPress={() => }
        style={{position: 'absolute', alignSelf: 'center', left: '50%', justifyContent: 'center', top: 135, zIndex: 1}}>
        <View
          style={{
            top: 140,
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Image style={styles.guideImage} source={{uri: profilePicture}} />
          <Ionicons style={{position: 'absolute', bottom: 105}} name={'camera'} size={35} color={'white'}/>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  divider: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#9B9BA7',
    borderBottomWidth: 1,
    width: "92%",
  },
  input: {
    alignSelf: 'center',
    height: 45,
    width: "92%",
    borderWidth: 1,
    borderColor: '#9B9BA7',
    borderRadius: 7,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  inputIntro: {
    alignSelf: 'center',
    height: 100,
    width: "92%",
    borderWidth: 1,
    borderColor: '#9B9BA7',
    borderRadius: 7,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 50,
    paddingTop: 10
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
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 10,
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
    color: '#9B9BA7'
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    left: 52,
    color: '#525252',
    bottom: 3,
  },
  addIcon: {
    color: '#525252',
    fontSize: 25,
    position: 'absolute',
    left: 25,
    bottom: 0,
  },
});

export default AccountEdit;
