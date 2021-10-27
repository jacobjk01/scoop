import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';

const BookingCheckout = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView>
      {/* {console.log(item)} */}
      <Text>TODO: LET IT TAKE THE ITEM, if possible</Text>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={item.src}></Image>
        <Text style={styles.tourNameText}>{item.name}</Text>
        <Text style={styles.regularText1}>Tour Guide: Brittany</Text>
        <Text style={styles.regularText2}>Duration: 60 min</Text>
        <Text style={styles.regularText3}>Transportation: Walking</Text>
      </View>
      <View style={styles.bottomContainer}></View>

      <View style={styles.confirmContainter}></View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.popToTop('HomeVisitor')}>
        <Text style={styles.confirmationText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 30,
    left: 0,
    height: 120,
    width: 200,
  },
  topContainer: {
    position: 'absolute',
    width: 355,
    height: 300,
    left: 17,
    top: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bottomContainer: {
    position: 'absolute',
    width: 355,
    height: 178,
    left: 17,
    top: 330,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  confirmContainter: {
    position: 'absolute',
    width: 500,
    height: 178,
    top: 528,
    backgroundColor: 'white',
  },
  confirmButton: {
    position: 'absolute',
    width: 331,
    height: 60,
    left: 22,
    top: 575,
    backgroundColor: '#3154A5',
    borderRadius: 20,
  },
  confirmationText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    left: 130,
    top: 20,
    color: 'white',
  },
  tourNameText: {
    position: 'absolute',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    left: 190,
    top: 40,
  },
  regularText1: {
    position: 'absolute',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    left: 190,
    top: 70,
  },
  regularText2: {
    position: 'absolute',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    left: 190,
    top: 85,
  },
  regularText3: {
    position: 'absolute',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    left: 190,
    top: 100,
  },
});

export default BookingCheckout;
