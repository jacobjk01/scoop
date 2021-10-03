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
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Account from './screens/guide/Account';
import Checkout from './screens/visitor/Checkout';
import ManageTours from './screens/guide/ManageTours';
import Tours from './screens/visitor/Tours';
import HomeStack from './components/navigation/HomeStack';
import Conversation from './screens/visitor/Conversation';
import colors from './config/colors';
import Test from './screens/dev/Test';

const Tab = createBottomTabNavigator();

const MODE = 'visitor'; // visitor | guide | dev

const App: () => Node = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'ManageTours':
                iconName = focused ? 'map' : 'map-outline';
                break;
              case 'Tours':
                iconName = focused ? 'map' : 'map-outline';
                break;
              case 'Account':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = focused ? 'help-circle' : 'help-circle-outline';
            } 
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.primary,
        }}
        initialRouteName={MODE === 'visitor' ? "Home" : MODE === 'guide' ? "Home" : "Home" }>
          
        {(() => {
          if (MODE === 'visitor') {
            return <>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Tours" component={Tours} />
              <Tab.Screen name="Account" component={Account} />
            </>
          } else if (MODE === 'guide'){
            return <>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="ManageTours" component={ManageTours} />
              <Tab.Screen name="Tours" component={Tours} />
              <Tab.Screen name="Account" component={Account} />
            </>
          } else {
            return <>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="ManageTours" component={ManageTours} />
              <Tab.Screen name="Tours" component={Tours} />
              <Tab.Screen name="Account" component={Account} />
              <Tab.Screen name="Test" component={Test} />
            </>
          }
        })()}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
