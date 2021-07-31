/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './components/HomePage';
import Account from './components/Account';
import Tours from './components/Tours';
import TourGuides from './components/TourGuides';
import Messages from './components/Messages';
import TourGuideProfile from './components/TourGuideProfile';
import TourInfo from './components/TourInfo';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tours') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3D68CC',
          inactiveTintColor: '#656565',
        }}
        initialRouteName='HomeScreen'
      >
        <Tab.Screen name="Tours" component={Tours}/>
        <Tab.Screen name="Home">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="HomeScreen" component={HomePage} options={{title: 'Home'}} />
              <HomeStack.Screen name="TourGuideProfile" component={TourGuideProfile}/>
              <HomeStack.Screen name="TourInfo" component={TourInfo}/>
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Messages" component={Messages}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;