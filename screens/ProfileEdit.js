import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts';
import { getPicture, changeName, changePicture, changeMajor, changeYear, changeIntro, changeLanguages, changeHometown } from '../api/users';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { primary, grayDark, white, black, grayShadow, grayVeryDark } from '../config/colors';
import BackButton from 'components/BackButton';

const AccountEdit = ({navigation}) => {
  const nav = useNavigation();
  const {user, setUser, userAuth, setUserAuth} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [year, setYear] = useState(user.year);
  const [major, setMajor] = useState(user.major);
  const [intro, setIntro] = useState(user.intro);
  const [hometown, setHometown] = useState(user.hometown);
  const [imageData, setImageData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const isFocused = useIsFocused();

  useEffect(async () => {
    // setProfilePicture(await getPicture(userAuth.uid, 'profilePicture'));
    setBackgroundPicture(await getPicture(userAuth.uid, 'backgroundPicture'));
  }, [isFocused])

  saveFields = () => {
    const uid = userAuth.uid;
    changeName(uid, name);
    changePicture(uid, profilePicture, 'profilePicture');
    changePicture(uid, backgroundPicture, 'backgroundPicture');
    changeMajor(uid, major);
    changeYear(uid, year);
    changeIntro(uid, intro);
    changeHometown(uid, hometown);
    // changeLanguages(uid, languages);
    setUser({hometown, intro, major, name, profilePicture, backgroundPicture, userType: user.userType, year});
  };

  handlePhotoPicker = async (type) => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('Photo Library: This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('Photo Library: The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('Photo Library: The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('Photo Library: The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('Photo Library: The permission is denied and not requestable anymore');
            break;
        }
      })
    launchImageLibrary(type);
  }

  launchImageLibrary = (type) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const ImagePicker = require('react-native-image-picker');
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const data = response.assets[0];
        if (type == 'PROFILE') {
          setProfilePicture(data.uri);
        } else if (type == 'BACKGROUND') {
          setBackgroundPicture(data.uri);
        }
        setImageData({
          uri: data.uri,
          name: data.fileName,
          size: data.fileSize,
          height: data.height,
          width: data.width,
          type: data.type,
        });
      }
    });
  }
  const renderGuideBio = (user) => {
    return (
      <View style={{ paddingTop: 10, paddingBottom: 80 }}>
        <Text style={styles.titleText}>
          {'First Name'}
        </Text>
        <TextInput style={styles.input} placeholder='Edit your name' maxLength={50}
          onChangeText={name => setName(name)}>
          {user.name}
        </TextInput>
        <Text style={styles.titleText}>
          {'Year'}
        </Text>
        <TextInput style={styles.input} placeholder='Select Year' maxLength={200}
          onChangeText={year => setYear(year)}>
          {user.year}
        </TextInput>
        <Text style={styles.titleText}>
          {'Major'}
        </Text>
        <TextInput style={styles.input} placeholder='Edit your major' maxLength={50}
          onChangeText={major => setMajor(major)}>
          {user.major}
        </TextInput>
        <Text style={styles.titleText}>
          {'Intro'}
        </Text>
        <TextInput style={styles.inputIntro} placeholder='Tell us about yourself!' multiline={true} maxLength={200}
          onChangeText={intro => setIntro(intro)}>
          {user.intro}
        </TextInput>
        <Text style={styles.titleText}>
          {'Hometown'}
        </Text>
        <TextInput style={styles.input} placeholder='Edit your hometown' maxLength={50}
          onChangeText={hometown => setHometown(hometown)}>
          {user.hometown}
        </TextInput>
        <View style={styles.divider} />
        <Ionicons name='add' style={styles.addIcon} size={30}/>
        <Text style={styles.bodyText}>Add another language</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => (nav.goBack(), saveFields())}>
          <Text style={{alignSelf: 'center', color: white, fontWeight: '700'}}>
            {'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ImageBackground
      source={{uri: backgroundPicture}}
      style={styles.backgroundImage}>
    <ScrollView>
      <BackButton navigation={navigation}/>
      <TouchableOpacity
        onPress={() => handlePhotoPicker('BACKGROUND')}
        style={{position: 'absolute', right: 25, top: 120}}>
        <Ionicons name={'camera'} size={25} color={grayDark}/>
      </TouchableOpacity>
      {renderGuideImage(profilePicture)}
      <View
        style={{
          marginTop: -40,
          paddingTop: 80,
          paddingRight: 20,
          paddingLeft: 20,
          height: '100%',
          backgroundColor: white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          zIndex: 0
        }}
      >
        {renderGuideBio(user)}
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderGuideImage = (profilePicture) => {
  return (
    <ImageBackground 
      style={styles.guideImage}
      imageStyle={{borderRadius: 100}}
      source={{uri: profilePicture}} 
    >
      <TouchableOpacity
        onPress={() => {handlePhotoPicker('PROFILE')
        console.log('press')
      }}
        style={{alignSelf: 'center', justifyContent: 'center', zIndex: 1, height: '100%', width: '100%', zIndex: 100}}
      >
        <Ionicons 
          style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}
          name={'camera'} size={35} color={white}/>
        {/* <View style={styles.circleOverlay}/> */}
      </TouchableOpacity>
    </ImageBackground>
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
    marginBottom: 0,
    borderBottomColor: grayDark,
    borderBottomWidth: 1,
    width: '92%',
  },
  input: {
    alignSelf: 'center',
    height: 45,
    width: '92%',
    borderWidth: 1,
    borderColor: grayDark,
    borderRadius: 7,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  inputIntro: {
    alignSelf: 'center',
    minHeight: 0,
    width: '92%',
    borderWidth: 1,
    borderColor: grayDark,
    borderRadius: 7,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 30,
    paddingTop: 10,
  },
  guideImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: grayDark,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25%',
    zIndex: 100,
  },
  circleOverlay: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: black,
    position: 'absolute',
    bottom: 70,
    opacity: 0.2,
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
    color: grayDark,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    left: 52,
    color: grayVeryDark,
    top: -5,
    paddingBottom: 40,
  },
  addIcon: {
    color: grayVeryDark,
    fontSize: 25,
    position: 'relative',
    left: 25,
    top: 17,
  },
  saveButton: {
    marginHorizontal: 20,
    backgroundColor: primary,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: grayShadow,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
});

export default AccountEdit;
