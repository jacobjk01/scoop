import { StyleSheet, View, Text } from "react-native";
import {grayDark} from '../../../config/colors'
import React from "react";
/**
 * 
 * @param {{name, info}} 
 * @returns 
 */
const TextQuadrant = ({name, info}) => {
  return (
    <View style={styles.textQuadrant}>
        <Text style={styles.sectionInfoSubtitleText}>{name}</Text>
        <Text style={styles.sectionInfoText}>{info}</Text>
    </View>
);
}

const styles = StyleSheet.create({
  textQuadrant: {
    position: 'relative',
    width: '50%',
  },
  sectionInfoText: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 15,
  },
  sectionInfoSubtitleText: {
    fontWeight: '400',
    fontSize: 14,
    color: grayDark,
    paddingVertical: 5,
  },
});


export default TextQuadrant