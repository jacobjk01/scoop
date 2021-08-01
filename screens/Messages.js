import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';
import BackButton from '../components/BackButton';
import TourGuidesMsgSection from '../components/TourGuidesMsgSection';
import tourGuides from '../data/tourGuides';

function Messages(props) {
  

  return(
    <SafeAreaView style={styles.container}>
      
      <View style={styles.title}>
        <Text style={{color: colors.white, fontFamily: "Helvetica", fontSize: 20}}>Messages Screen</Text>
      </View>
      {/* <BackButton /> */}
      <View style={styles.body}>
        <TourGuidesMsgSection tourGuides={tourGuides}/>
      </View>
      <ScrollView style={styles.body}>
        <Text>
          HERERE
        </Text>
        <Text>
          HERERE
        </Text>
        <Text>
          HERERE
        </Text>
        <Text>
          HERERE
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "100%"
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    height: 100
  },
  body: {
    backgroundColor: colors.white
  }
})

export default Messages;