import { black, grayDark } from 'config/colors';
import tempBackgroundImage from 'images/Westwood_village.jpg';
import React from 'react';
import {
  ImageBackground, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

/**
 * 
 * @param {{backgroundImage}} props 
 * @returns 
 */
const Foreground =  ({backgroundImage}) => {
  return (
    <View style={{flex: 1, borderRadius: 15}}>
        <ImageBackground
            style={styles.imageHeader}
            source={backgroundImage || tempBackgroundImage}>
            <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
            />
        </ImageBackground>
        <TouchableOpacity
            style={{position: 'absolute', right: 25, top: 120}}>
            <Ionicons name={'camera'} size={25} color={grayDark}/>
        </TouchableOpacity>
    </View>
  );
}

export default Foreground
