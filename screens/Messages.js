import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';
import BackButton from '../components/BackButton';
import TourGuidesMsgSection from '../components/TourGuidesMsgSection';
import tourGuides from '../data/tourGuides';
import TourGuidesLastMsg from '../components/TourGuidesLastMsg';
function Messages(props) {
  

  return(
    <SafeAreaView style={styles.container}>
      
      <View style={styles.title}>
        <Text style={{color: colors.white, fontFamily: "Helvetica", fontSize: 20}}>Message</Text>
      </View>
      {/* <BackButton /> */}
      <View style={styles.body}>
        <View style={[styles.bottomLine]}>
          <TourGuidesMsgSection tourGuides={tourGuides}/>
        </View>
        <ScrollView style={[styles.body]}>
          <TourGuidesLastMsg tourGuides={tourGuides}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "100%",
    
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    
  },
  body: {
    backgroundColor: colors.white,
    marginTop: 20,
    padding: 20,
    height: '100%'
    
  },
  bottomLine: {
    paddingBottom: 20,
    borderBottomColor: colors.grayDark,
    borderBottomWidth: 1,
  }
})

export default Messages;