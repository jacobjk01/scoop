import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import { primary, white, gray, black } from 'config/colors';
import BackButton from 'components/BackButton';
import GuidesMsgSection from 'components/GuidesMsgSection';
import tourGuides from 'data/tourGuides';
import GuidesLastMsg from 'components/GuidesLastMsg';
function Messages(props) {
  const {navigation} = props;

  return(
    <SafeAreaView style={styles.container}>
      
      {/* <View style={styles.title}>
        <Text style={{color: white, fontFamily: 'Helvetica', fontSize: 20}}>Your Messages</Text>
      </View> */}
      {/* <BackButton /> */}
      <View style={styles.body}>
        <View style={[styles.bottomLine]}>
          <GuidesMsgSection tourGuides={tourGuides}/>
        </View>
        
        <ScrollView>
          <Text style={[{color: black, fontFamily: 'Helvetica', fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingBottom: 20}]}>Messages</Text>
          <GuidesLastMsg tourGuides={tourGuides} navigation={navigation}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    height: '100%',
    
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,

  },
  body: {
    backgroundColor: white,
    padding: 20,
    height: '100%'
    
  },
  bottomLine: {
    paddingBottom: 20,
    borderBottomColor: gray,
    borderBottomWidth: 1,
  }
})

export default Messages;