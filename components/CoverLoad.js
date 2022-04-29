import React from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity, LinearGradient, ImageBackground, Image } from 'react-native'
import { black } from 'config/colors'
import PictureIcon from './PictureIcon'
export default function CoverLoad({ tourGuides }) {
  return (
    <View styles={styles.container}>
      <Text style={styles.guideTitle}> Loading... </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'red'
  },
  guideTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  guideText: {
    color: black,
    fontWeight: 'bold',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 14
  }
});
