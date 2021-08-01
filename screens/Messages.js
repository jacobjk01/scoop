import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';
import BackButton from '../components/BackButton';
import TourGuidesMsgSection from '../components/TourGuidesMsgSection';
import data from '../data';

function Messages(props) {
  
  const tourGuidesMsgSectionList = data.map(tourGuide => {
    return <TourGuidesMsgSection text={tourGuide.name}/>
  });
  return(
    <SafeAreaView style={styles.container}>
      
      <View style={styles.title}>
        <Text style={{color: colors.white, fontFamily: "Helvetica", fontSize: 20}}>Messages Screen</Text>
      </View>
      {/* <BackButton /> */}
      <ScrollView style={styles.body}>
        {tourGuidesMsgSectionList}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    height: 100
  },
  body: {
    backgroundColor: colors.grayLight
  }
})

export default Messages;