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
import { primary, black, grayDark, white, grayLight } from 'config/colors';

const ProfileOptions = ({ navigation }) => {
  const { user, userAuth } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => { }, [user])

  useEffect(async () => {
    setProfilePicture(await getPicture(userAuth.uid, 'profilePicture'));
  }, [isFocused])

  return (
    <ScrollView
      style={{
        backgroundColor: white,
        paddingTop: '40%',
      }}
    >
      <SafeAreaView style={{ alignItems: 'center' }}>
        {renderGuideImage(profilePicture)}
        {renderGuideBio(user ? user : '')}
        {viewProfileButton(navigation)}
      </SafeAreaView>
      <View style={styles.divider} />
      {renderTabCard(navigation, 'compass-outline', 'My Trips')}
      {renderTabCard(navigation, 'chatbubble-ellipses-outline', 'Feedback')}
      <View style={styles.divider} />
      {renderTabCard(navigation, 'exit-outline', 'Log Out')}
      {renderTabCard(navigation, 'people-outline', 'Switch To Visitor Account')}
      <View style={styles.divider} />
    </ScrollView>
  );
};

const renderGuideImage = (profilePicture) => {
  return (
    <View
      style={{
        top: 120,
        alignItems: 'center',
        zIndex: 1
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
        Cal Poly SLO
      </Text>
    </View>
  );
};

const viewProfileButton = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AccountGuide')}
      style={styles.roundButton}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.viewProfileText}>View Profile</Text>
        <Ionicons
          name='chevron-forward-outline'
          size={20}
          color={white}
          style={{
            position: 'absolute',
            right: -28,
            bottom: -2,
          }}
        />
      </View>

    </TouchableOpacity>
  );
};

const renderTabCard = (navigation, iconName, title) => {
  return (
    <TouchableOpacity style={styles.tabCard} onPress={() => navigation.navigate('Feedback')}>
      <View style={styles.cardTextSection}>
        <Ionicons
          name={iconName}
          size={22}
          color={black}
          style={{
            marginRight: 8,
          }}
        />
        <Text style={{ marginTop: 2, fontSize: 15 }}>{title}</Text>
        <Ionicons
          name='chevron-forward-outline'
          size={20}
          color={grayDark}
          style={{
            position: 'absolute',
            right: 0,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  divider: {
    position: 'relative',
    width: '100%',
    borderBottomColor: grayLight,
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
    marginTop: 5,
    marginBottom: 10,
    color: primary,
    fontSize: 16,
  },
  sectionText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 30,
  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    height: 32,
    backgroundColor: primary,
    borderRadius: 32,
    marginTop: 5,
    marginBottom: 35,
  },
  viewProfileText: {
    position: 'relative',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    color: white,
    right: 5,
  },
  tabCard: {
    width: '100%',
    height: 60,
    justifyContent: 'flex-end',
  },
  cardTextSection: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    left: 30,
    flexDirection: 'row',
    width: '85%',
  },
});

export default ProfileOptions;
