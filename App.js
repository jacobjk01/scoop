/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


//react imports
import 'react-native-gesture-handler';
import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity
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

//config imports
import colors from './config/colors';

//dev imports
import Test from './screens/dev/Test';

//guide imports
import ManageTours from './screens/guide/ManageTours';
import Account from './screens/guide/Account';
import AccountEdit from './screens/guide/AccountEdit';
import AddTour from './screens/guide/AddTour';
import EditTour from './screens/guide/EditTour';
import HomeGuide from './screens/guide/Home';
import Registration from './screens/guide/Registration';
import ViewTour from './screens/guide/ViewTour';

//visitor imports
import Tours from './screens/visitor/Tours';
import Checkout from './screens/visitor/Checkout';
import Conversation from './screens/visitor/Conversation';
import HomeVisitor from './screens/visitor/HomePage';
import TourInfo from './screens/visitor/TourInfo';
import TourInfo2 from './screens/visitor/TourInfo2';
import TourGuideProfile from './screens/visitor/TourGuideProfile';
import TourGuideProfile2 from './screens/visitor/TourGuideProfile2';
import Messages from './screens/visitor/Messages';
import Booking from './screens/visitor/Booking';
import TourGuideList from './screens/visitor/TourGuideList';
import TourList from './screens/visitor/TourList';

/**
 * 
 *  All navigation is handled here
 * 
 */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MODE = 'visitor'; // visitor | guide | dev

//displays bottom tab and some navigation
const TabAllModes = () => {
  return (
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
              <Tab.Screen name="Home" component={HomeVisitor} options={{tabBarVisible:true}}
          />
              <Tab.Screen name="Tours" component={Tours} />
              <Tab.Screen name="Account" component={Account} />
            </>
          } else if (MODE === 'guide'){
            return <>
              <Tab.Screen name="Home" component={HomeGuide} />
              <Tab.Screen name="ManageTours" component={ManageTours} />
              <Tab.Screen name="Account" component={Account} />
            </>
          } else {
            return <>
              <Tab.Screen name="HomeVisitor" component={HomeVisitor} />
              <Tab.Screen name="HomeGuide" component={HomeGuide} />
              <Tab.Screen name="ManageTours" component={ManageTours} />
              <Tab.Screen name="Tours" component={Tours} />
              <Tab.Screen name="Account" component={Account} />
              <Tab.Screen name="Test" component={Test} />
            </>
          }
        })()}
      </Tab.Navigator>
  )
}

//bulk of navigation
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={TabAllModes} options={{headerShown: false}}/>
        {/* Dev Routes */}
        <Stack.Screen name="Test" component={Test} options={{headerShown: false}}/>

        {/* Guide Routes */}
        <Stack.Screen name="Account" component={Account} options={{headerShown: true}}/>
        <Stack.Screen name="AccountEdit" component={AccountEdit} options={{headerShown: true}}/>
        <Stack.Screen name="AddTour" component={AddTour} options={{headerShown: true}}/>
        <Stack.Screen name="EditTour" component={EditTour} options={{headerShown: true}}/>
        <Stack.Screen name="Home" component={HomeGuide} options={{headerShown: false}}/>
        <Stack.Screen name="ManageTours" component={ManageTours} options={{headerShown: true}}/>
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: true}}/>
        <Stack.Screen name="ViewTour" component={ViewTour} options={{headerShown: true}}/>

        {/* Visitor Routes */}
        <Stack.Screen name="Tours" component={Tours} options={{headerShown: false}}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}}/>
        <Stack.Screen name="Conversation" component={Conversation} options={{headerShown: false}}/>
        <Stack.Screen name="HomeVisitor" component={HomeVisitor} options={{headerShown: false}}/>
        <Stack.Screen name="TourInfo" component={TourInfo} options={{headerShown: false}}/>
        <Stack.Screen name="TourInfo2" component={TourInfo2} options={{headerShown: false}}/>
        <Stack.Screen name="TourGuideProfile" component={TourGuideProfile} options={{headerShown: true}}/>
        <Stack.Screen name="TourGuideProfile2" component={TourGuideProfile2} options={{headerShown: true}}/>
        <Stack.Screen name="Messages" component={Messages} options={{headerShown: false}}/>
        <Stack.Screen name="Booking" component={Booking} options={{headerShown: false}}/>
        <Stack.Screen name="TourGuideList" component={TourGuideList} options={{headerShown: false}}/>
        <Stack.Screen name="TourList" component={TourList} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
