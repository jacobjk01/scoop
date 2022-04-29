import { black, gray, lightGray, primary, white } from "config/colors";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from "react-native";
import { capitalizeFirstLetter } from "utils";
import TextQuadrant from "./TextQuadrant";

/**
 * 
 * @param {{currentTour, navigation}} props 
 * @returns 
 */
const ActiveTourCard = ({currentTour, navigation, asdfsdf}) => {
  return (
    <TouchableOpacity style={styles.currentTourCard} onPress={() => navigation.navigate('ViewTour', {tour: currentTour})}>
            <View style={{padding: 30}}>
              <Text style={[styles.sectionInfoSubtitleText, {paddingBottom: 0}]}>Current Tour</Text>
                <Text style={styles.sectionTitleText}>{currentTour.name}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 0}}>
                    <TextQuadrant name='Date' info={capitalizeFirstLetter(currentTour.tourMonth) + ' ' + currentTour.tourDay}/>
                    <TextQuadrant name='Time' info={currentTour.startTime}/>
                    <TextQuadrant name='Visitors' info={currentTour.visitors}/>
                    <TextQuadrant name='Meetup Point' info={currentTour.meetPoint}/>
                </View>
            </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tourDateSection: {
    marginTop: 8,
    width: '20%',
  },
  tourInfoSection: {
    fontSize: 14,
    marginLeft: '3%',
    flex: 1,
    paddingRight: '15%',
  },
  tourDateText: {
    fontWeight: '700',
    fontSize: 18,
    color: primary,
    alignSelf: 'center',
  },
  tourNameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  currentTourCard: {
    width: '85%',
    borderRadius: 10,
    backgroundColor: white,
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 10,
  },
  tourCard: {
    width: '100%',
    // height: 100,
    backgroundColor: white,
    justifyContent: 'flex-end',
  },
  currentTourImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',
    borderRadius: 10,
  },
//   tourImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//     left: '23%',
//     bottom: '15%',
//   },
  tourTextSection: {
    // position: 'absolute',
    // top: '15%',
    left: 10,
    right: 5,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical:10
  },
  forwardIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 30,
  },
  divider: {
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
    width: '100%',
    },
  sectionTitleText: {
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 5,
    color: primary,
  },
  sectionInfoSubtitleText: {
    fontWeight: '400',
    fontSize: 14,
    color: gray,
    paddingVertical: 5,
  },
  sectionInfoText: {
      fontWeight: '700',
      fontSize: 16,
      paddingBottom: 15,
  },
  textQuadrant: {
      position: 'relative',
      width: '50%',
  },
});

export default ActiveTourCard