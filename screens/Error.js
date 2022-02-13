import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'
import SigninButton from '../components/SigninButton';
import SignoutButton from '../components/SignoutButton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { sendFeedback } from '../api/feedback';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

export default ({ errorMsg }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>
          {errorMsg}
        </Text>
        <Text>
          Look in console for more information on error.
        </Text>
      </View>
    </SafeAreaView>
  )


}
