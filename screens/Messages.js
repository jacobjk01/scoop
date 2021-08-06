import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';
import BackButton from '../components/BackButton';
import TourGuidesMsgSection from '../components/TourGuidesMsgSection';
import tourGuides from '../data/tourGuides';
import TourGuidesLastMsg from '../components/TourGuidesLastMsg';
function Messages(props) {
  const {navigation} = props;

  return(
    <SafeAreaView style={styles.container}>
      
      {/* <View style={styles.title}>
        <Text style={{color: colors.white, fontFamily: "Helvetica", fontSize: 20}}>Your Messages</Text>
      </View> */}
      {/* <BackButton /> */}
      <View style={styles.body}>
        <View style={[styles.bottomLine]}>
          <TourGuidesMsgSection tourGuides={tourGuides}/>
        </View>
        
        <ScrollView>
          <Text style={[{color: colors.black, fontFamily: "Helvetica", fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingBottom: 20}]}>Messages</Text>
          <TourGuidesLastMsg tourGuides={tourGuides} navigation={navigation}/>
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