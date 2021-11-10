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
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../contexts'
import { getUser, changeName, changeProfilePicture, changeMajor, changeYear, changeIntro, changeLanguages, changeHometown } from '../../api/users';
import { onAuthStateChanged } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
// import * as firebase from 'firebase/app';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/firestore';
// import ImagePicker from 'react-native-image-picker';
// https://www.pluralsight.com/guides/upload-images-to-firebase-storage-in-react-native

const AccountEdit = ({navigation}) => {
  const nav = useNavigation();
  const [userAuth, setUserAuth] = useState(null);
  const [validUser, setUser] = useState(null);
  const {user} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [year, setYear] = useState(user.year);
  const [major, setMajor] = useState(user.major);
  const [intro, setIntro] = useState(user.intro);
  const [hometown, setHometown] = useState(user.hometown);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [imageData, setImageData] = useState(null);
  // console.log(profilePicture);

  useEffect(() => {
    var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
      //if userAuth exists, 
      if (newUserAuth && userAuth == null) { // userAuth is null, so definitely unique
        setUserAuth(newUserAuth);
      // userAuth exists and doesn't match with with newUserAuth.uid
      } else if (userAuth.uid && newUserAuth && (userAuth.uid != newUserAuth.uid)) {
        setUserAuth(newUserAuth);
      }
    })
    return () => {
      unsubscribeAuth();
    }
  }, []);

  useEffect(async () => {
    if (userAuth) {
      const currentUser = await getUser(userAuth);
      setUser({...currentUser.data()})
    }
  }, [userAuth]);

  useEffect(() => {
  },[user]);

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }
  uploadToFirebase = (blob) => {
    return new Promise((resolve, reject)=>{
      var storageRef = storage().ref();
      storageRef.child('uploads/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }


  saveFields = () => {
    const uid = userAuth.uid;
    changeName(uid, name);
    // changeProfilePicture(uid, profilePicture);
    changeMajor(uid, major);
    changeYear(uid, year);
    changeIntro(uid, intro);
    changeHometown(uid, hometown);
    changeProfilePicture(uid, profilePicture);
    // changeLanguages(uid, languages);
    // console.log(profilePicture.name);
    // console.log(profilePicture.uri);
    /*
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const ImagePicker = require('react-native-image-picker');
    ImagePicker.launchImageLibrary((options),(result)=>{ 

      if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        return uriToBlob(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase(blob);

    }).then((snapshot)=>{

      console.log("File uploaded");
   
    }).catch((error)=>{

      throw error;

    }); 
    */
    
    // var send = uriToBlob(profilePicture.uri);
    // uploadToFirebase(send);
    
    // task.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    //   );
    // });
    // try {
    //   task;
    // } catch (e) {
    //   console.error(e);
    // }
    // const reference = storage().ref('black-t-shirt-sm.png');
    // reference.storage().putFile(profilePicture.uri);
    // console.log("put ",profilePicture.uri);
  };

  handleProfilePicture = async () => {
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
    launchImageLibrary();
  }

  launchImageLibrary = () => {
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
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const data = response.assets[0];
        setProfilePicture(data.uri);
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

  if (!validUser) {
    return (
        <SafeAreaView>
            <Text>User not logged in</Text>
        </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          <ImageBackground
            source={require('../../images/SantaMonica.png')}
            style={styles.backgroundImage}>
            {renderGuideImage(profilePicture)}
            <TouchableOpacity
              style={{position: 'absolute', right: 25, top: 120}}>
              <Ionicons name={'camera'} size={25} color={'#9B9BA7'}/>
            </TouchableOpacity>
            <View
              style={{
                marginTop: '40%',
                paddingRight: 20,
                paddingLeft: 20,
                height: '100%',
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View style={{ paddingTop: 80, paddingBottom: 80 }}>
                <Text style={styles.titleText}>
                  {'First Name'}
                </Text>
                <TextInput style={styles.input} placeholder='Edit your name'
                  onChangeText={name => setName(name)}>
                  {user.name}
                </TextInput>
                <Text style={styles.titleText}>
                  {'Year'}
                </Text>
                <TextInput style={styles.input} placeholder='Select Year'
                  onChangeText={year => setYear(year)}>
                  {user.year}
                </TextInput>
                <Text style={styles.titleText}>
                  {'Major'}
                </Text>
                <TextInput style={styles.input} placeholder='Edit your major'
                  onChangeText={major => setMajor(major)}>
                  {user.major}
                </TextInput>
                <Text style={styles.titleText}>
                  {'Intro'}
                </Text>
                <TextInput style={styles.inputIntro} placeholder='Tell us about yourself!' multiline={true}
                  onChangeText={intro => setIntro(intro)}>
                  {user.intro}
                </TextInput>
                <Text style={styles.titleText}>
                  {'Hometown'}
                </Text>
                <TextInput style={styles.input} placeholder='Edit your hometown'
                  onChangeText={hometown => setHometown(hometown)}>
                  {user.hometown}
                </TextInput>
                <View style={styles.divider} />
                <Ionicons name='add' style={styles.addIcon} size={30}/>
                <Text style={styles.bodyText}>Add another language</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => (nav.goBack(), saveFields())}>
                  <Text style={{alignSelf: 'center', color: "white", fontWeight: '700'}}>
                    {'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const renderGuideImage = (profilePicture) => {
  return (
    <TouchableOpacity
      onPress={() => handleProfilePicture()}
      style={{position: 'absolute', alignSelf: 'center', left: '50%', justifyContent: 'center', top: 135, zIndex: 1}}>
      {/* {console.log("here")} */}
      {/* {console.log(profilePicture)} */}
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
    marginBottom: 0,
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
    top: -5,
    paddingBottom: 40,
  },
  addIcon: {
    color: '#525252',
    fontSize: 25,
    position: 'relative',
    left: 25,
    top: 17,
  },
  saveButton: {
    marginHorizontal: 20,
    backgroundColor: '#3154A5',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#adadad',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
});

export default AccountEdit;
