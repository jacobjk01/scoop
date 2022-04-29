import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { primary, white, gray, black, red } from 'config/colors';
import { styles } from './styles';
import SubmitButton from 'components/SubmitButton';
import { addTour } from 'api/tours';
import { UserContext } from 'contexts';

class Counter extends React.Component {
  state = this.props.maxPeople ? {count: this.props.maxPeople} : {count: 0};
  
  subtractCount = () => {
    this.setState(
      prevState => ({ ...prevState, count: this.state.count > 1 ? this.state.count - 1 : this.state.count })
    )
    this.props.onChange(this.state.maxPeople)
  }
  
  addCount = () => {
    this.setState(
      prevState => ({ ...prevState, count: this.state.count < 10 ? this.state.count + 1 : this.state.count})
    )
    this.props.onChange(this.state.maxPeople)
  }

  render() {
    const { count } = this.state;
    return (
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={count > 1 ? styles.removeButton : styles.removeButtonGray} onPress={this.subtractCount}>
              <Ionicons name={'remove'} size={16} style={count > 1 ? {color: white} : {color: gray}}/>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 8}}>{count}</Text>
          <TouchableOpacity style={count < 10 ? styles.addButton : styles.addButtonGray} onPress={this.addCount}>
              <Ionicons name={'add'} size={16} style={count < 10 ? {color: white} : {color: gray}}/>
          </TouchableOpacity>
      </View>
    );
  }
}

export default Counter