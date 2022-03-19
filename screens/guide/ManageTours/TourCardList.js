import React, {useState, useEffect, useContext} from 'react';
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
  Modal,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
// import { Picker } from "@react-native-picker/picker";
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'config/colors';
import toursData from 'data/toursData';
import {color} from 'react-native-reanimated';
import { getUser } from 'api/users';
import { getAllTourSettings } from 'api/tours';
import { onAuthStateChanged } from 'api/auth';
import { white, black, grayVeryDark, grayMed, tappableBlue } from 'config/colors';
import BottomButton from 'components/BottomButton';
import { UserContext } from 'contexts';
import SubmitButton from 'components/SubmitButton';
import TourDropdown from './TourDropdown';
import { getParentData } from 'api/utilities';

/**
 * For educational purposes only. Please do not use a shell for soloing removing a map function
 * @param {{tours : []}} props 
 */
const TourCardList = (props) => {
  return <>
    {props.tours.map(props.children)}
  </>
}

export default TourCardList