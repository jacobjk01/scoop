import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';
import BackButton from '../components/BackButton';
function Messages() {
    return(
      <SafeAreaView style={styles.container}>
        
        <View style={styles.title}>
          <Text style={{color: colors.white, fontFamily: "Helvetica", fontSize: 20}}>Messages Screen</Text>
        </View>
        {/* <BackButton /> */}
        <ScrollView style={styles.body}>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
          <Text>I scoll</Text>
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