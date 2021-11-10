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
import { UserContext } from '../../contexts'
import { getUser, changeName, changeProfilePicture, changeMajor, changeYear, changeIntro, changeLanguages, changeHometown } from '../../api/users';
import { onAuthStateChanged } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';



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

  saveFields = () => {
    const uid = userAuth.uid;
    changeName(uid, name);
    // changeProfilePicture(uid, profilePicture);
    changeMajor(uid, major);
    changeYear(uid, year);
    changeIntro(uid, intro);
    changeHometown(uid, hometown);
    // changeLanguages(uid, languages);
  };

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
            {renderGuideImage(user.profilePicture)}
            <TouchableOpacity
              // onPress={() => }
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
                <TextInput style={styles.inputIntro} placeholder='Tell us about yourself!' multiline='true'
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
                <Ionicons name='add' style={styles.addIcon}/>
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
