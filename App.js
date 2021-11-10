/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//react imports
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
  TouchableOpacity,
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
import colors from 'config/colors';
import { localState } from 'config/initialState';

//contexts imports
import { UserContext } from 'contexts';

//dev imports
import Test from './screens/dev/Test';

//new user imports
import FirstTime from './screens/FirstTime';

//onboarding
import OnboardingVisitor from './screens/visitor/Onboarding';
import OnboardingGuide from './screens/guide/Onboarding';

//guide imports
import ManageTours from './screens/guide/ManageTours';
import TourEdit from './screens/guide/TourEdit';
import TourEdit2 from './screens/guide/TourEdit2';
import TourEdit3 from './screens/guide/TourEdit3';
import AccountGuide from './screens/guide/Account';
import AccountEdit from './screens/guide/AccountEdit';
import AddTour from './screens/guide/AddTour';
import EditTour from './screens/guide/EditTour';
import HomeGuide from './screens/guide/Home';
import ViewTour from './screens/guide/ViewTour';

//visitor imports
import AccountVisitor from './screens/visitor/Account';
import TourList from './screens/visitor/TourList';
import Conversation from './screens/visitor/Conversation';
import GuideBooking1 from './screens/visitor/GuideBooking1';
import GuideBooking2 from './screens/visitor/GuideBooking2';
import GuideBooking3 from './screens/visitor/GuideBooking3';
import TourBooking1 from './screens/visitor/TourBooking1';
import TourBooking2 from './screens/visitor/TourBooking2';
import TourBooking3 from './screens/visitor/TourBooking3';
import BookingCheckout from './screens/visitor/BookingCheckout';
import HomeVisitor from './screens/visitor/HomePage';
import TourInfo from './screens/visitor/TourInfo';
import GuideProfile from './screens/visitor/GuideProfile';
import Messages from './screens/visitor/Messages';
import GuideList from './screens/visitor/GuideList';
import SelectSchool from './screens/visitor/SelectSchool';


//authorization
import RequireAuth from 'components/RequireAuth';

//api
import { onAuthStateChanged } from 'api/auth';
import { getUser } from 'api/users';


/**
 *
 *  All navigation is handled here
 *
 */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


//bulk of navigation
const App = () => {
  /**
   * Authentication
   */
  //userAuth is a object with the field uid
  const [userAuth, setUserAuth] = useState(null);
  //user is a object with the user document data
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [mode, setMode] = useState(localState.currentMode);
  const [guideDone, setGuideDone] = useState(localState.guideDone);
  const [visitorDone, setVisitorDone] = useState(localState.visitorDone);
  const [visitorBone, setVisitorBone] = useState(localState.visitorBone);
  const hasNotFinishedBareOnboarding = mode === 'new' || mode === 'visitor' && !visitorBone  || mode === 'guide' && !guideDone;

  useEffect(() => {
    if (hasNotFinishedBareOnboarding) {
      return;
    }
    console.log('onAuthStateChanged called')
    var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
      //if userAuth exists, 
      if (newUserAuth && userAuth == null) { // userAuth is null, so definitely unique
        setUserAuth(newUserAuth);
      // userAuth exists and doesn't match with with newUserAuth.uid
      } else if (userAuth && userAuth.uid && newUserAuth && (userAuth.uid != newUserAuth.uid)) {
        setUserAuth(newUserAuth);
      }
      if (isUserLoading) {
        setIsUserLoading(false);
      }
    })
    return () => {
      unsubscribeAuth();
    }
  }, [hasNotFinishedBareOnboarding])

  useEffect(async () => {
    if (hasNotFinishedBareOnboarding) {
      return;
    }
    if (userAuth) {
      console.log('user logged in')
      const currentUser = await getUser(userAuth);
      setUser({...currentUser.data()})
    }
  }, [userAuth])

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
                case 'AccountVisitor' || 'AccountGuide':
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
          initialRouteName={mode === 'visitor' ? "Home" : mode === 'guide' ? "Home" : "Home" }>
            
          {(() => {
            if (mode === 'visitor') {
              return <>
                <Tab.Screen name="Home" component={HomeVisitor} options={{tabBarVisible:true}}
            />
                <Tab.Screen name="TourList" component={TourList} />
                <Tab.Screen name="Account" component={AccountVisitor} />
              </>
            } else if (mode === 'guide'){
              return <>
                <Tab.Screen name="Home" component={HomeGuide} />
                <Tab.Screen name="ManageTours" component={ManageTours} />
                <Tab.Screen name="Account" component={AccountGuide} />
              </>
            } else {
              return <>
                <Tab.Screen name="HomeVisitor" component={HomeVisitor} />
                <Tab.Screen name="HomeGuide" component={HomeGuide} />
                <Tab.Screen name="ManageTours" component={ManageTours} />
                <Tab.Screen name="Account" component={AccountGuide} />
                <Tab.Screen name="Test" component={Test} />
              </>
            }
          })()}
        </Tab.Navigator>
    )
  }

  /**
   * Navigation
   */
  return (
    <UserContext.Provider value={{
      userAuth, setUserAuth,
      user, setUser,
      isUserLoading, setIsUserLoading,
      mode, setMode,
      guideDone, setGuideDone,
      visitorDone, setVisitorDone,
      visitorBone, setVisitorBone}}>
      
      {/* Has not finished basic onboarding */}
      {hasNotFinishedBareOnboarding ?
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen name="FirstTime" component={FirstTime} options={{headerShown: false}}/>
          <Stack.Screen name="OnboardingVisitor" component={OnboardingVisitor} options={{headerShown: false}}/>
          <Stack.Screen name="OnboardingGuide" component={OnboardingGuide} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      :
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name=" " component={TabAllModes} options={{headerShown: false}}/>
          
          {/* Dev Routes */}
          <Stack.Screen name="Test" component={Test} options={{headerShown: false}}/>

          {/* Guide Routes */}
          <Stack.Screen name="AccountGuide" component={RequireAuth(AccountGuide)} options={{headerShown: true}}/>
          <Stack.Screen name="AccountEdit" component={RequireAuth(AccountEdit)} options={{headerShown: true}}/>
          <Stack.Screen name="AddTour" component={RequireAuth(AddTour)} options={{headerShown: true}}/>
          <Stack.Screen name="EditTour" component={RequireAuth(EditTour)} options={{headerShown: true}}/>
          <Stack.Screen name="ManageTours" component={RequireAuth(ManageTours)} options={{headerShown: true}}/>
          <Stack.Screen name="TourEdit" component={RequireAuth(TourEdit)} options={{headerShown: true}}/>
          <Stack.Screen name="TourEdit2" component={RequireAuth(TourEdit2)} options={{headerShown: true}}/>
          <Stack.Screen name="TourEdit3" component={RequireAuth(TourEdit3)} options={{headerShown: true}}/>
          <Stack.Screen name="ViewTour" component={RequireAuth(ViewTour)} options={{headerShown: true}}/>

          {/* Visitor Routes */}
          <Stack.Screen name="AccountVisitor" component={AccountVisitor} options={{headerShown: false}}/>
          <Stack.Screen name="TourList" component={TourList} options={{headerShown: false}}/>
          <Stack.Screen name="Conversation" component={Conversation} options={{headerShown: false}}/>
          <Stack.Screen name="GuideBooking1" component={GuideBooking1} options={{headerShown: false}}/>
          <Stack.Screen name="GuideBooking2" component={GuideBooking2} options={{headerShown: false}}/>
          <Stack.Screen name="GuideBooking3" component={GuideBooking3} options={{headerShown: false}}/>
          <Stack.Screen name="TourBooking1" component={TourBooking1} options={{headerShown: false}}/>
          <Stack.Screen name="TourBooking2" component={TourBooking2} options={{headerShown: false}}/>
          <Stack.Screen name="TourBooking3" component={TourBooking3} options={{headerShown: false}}/>
          <Stack.Screen name="BookingCheckout" component={BookingCheckout} options={{headerShown: false}}/>
          <Stack.Screen name="TourInfo" component={TourInfo} options={{headerShown: false}}/>
          <Stack.Screen name="TourInfo2" component={TourInfo} options={{headerShown: false}}/>
          <Stack.Screen name="GuideProfile" component={GuideProfile} options={{headerShown: true}}/>
          <Stack.Screen name="GuideProfile2" component={GuideProfile} options={{headerShown: true}}/>
          <Stack.Screen name="Messages" component={Messages} options={{headerShown: false}}/>
          <Stack.Screen name="GuideList" component={GuideList} options={{headerShown: false}}/>
          <Stack.Screen name="SelectSchool" component={SelectSchool} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>}
    </UserContext.Provider>
   
  );
};

export default App;
