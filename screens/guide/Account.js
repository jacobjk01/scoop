import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from 'contexts'
import { useIsFocused } from '@react-navigation/core';
import { getPicture } from 'api/users';
import { grayDark, white } from 'config/colors';

const Account = ({ navigation }) => {
  const { user, userAuth } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);

  useEffect(() => { }, [user])

  useEffect(async () => {
    setProfilePicture(await getPicture(userAuth.uid, 'profilePicture'));
    setBackgroundPicture(await getPicture(userAuth.uid, 'backgroundPicture'));
  }, [isFocused])

  return (
    <ImageBackground
      source={{ uri: backgroundPicture }}
      style={styles.backgroundImage}>
      <ScrollView>
        <View
          style={{
            marginTop: '40%',
            paddingRight: 20,
            paddingLeft: 20,
            height: '100%',
            backgroundColor: white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {renderGuideImage(profilePicture)}
          <SafeAreaView>
            {renderGuideBio(user ? user : '')}
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountEdit')}
              style={{ position: 'absolute', right: 10, top: 20 }}>
              <View>
                <Text style={{ color: grayDark }}>Edit <Ionicons name={'pencil'} size={16} /></Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
          </SafeAreaView>
          <View>
            <Text style={styles.titleText}>
              {'Introduction'}
            </Text>
            <Text style={styles.subtitleText}>
              {'Hometown:'} {user.hometown ? user.hometown : ''}
            </Text>
            <Text style={styles.bodyText}>
              {user.intro ? user.intro : ''}
            </Text>
          </View>
          <View style={styles.divider} />
          <Text style={{ fontSize: 20, fontWeight: '700', paddingBottom: 400 }}>
            {'Languages'}
            {/* <View style={{flex: 1, height: 10}}> */}
            {/* <Image source={require('images/languages/us.png')} style={{flex: 1}} resizeMode={'stretch'}></Image> */}
            {/* </View> */}
          </Text>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderGuideImage = (profilePicture) => {
  return (
    <View
      style={{
        top: 120,
        alignItems: 'center',
        zIndex: 1,
      }}>
      <Image style={styles.guideImage} source={{
        uri: profilePicture
      }} />
    </View>
  );
};

const renderGuideBio = (user) => {
  return (
    <View
      style={{
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.sectionText}>{user.name}</Text>
      <Text style={styles.baseText}>
        {user.major && user.year ? user.major + ', ' + user.year : ''}
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
    borderBottomColor: grayDark,
    borderBottomWidth: 1,
  },
  guideImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: grayDark,
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
    color: grayDark,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
  },
});

export default Account;
