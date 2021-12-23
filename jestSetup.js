
// // Mocking replaces a node module with something else you specify
// jest.mock('react-native-gesture-handler', () => {
//     // eslint-disable-next-line global-require
//     const View = require('react-native/Libraries/Components/View/View');
//     return {
//         Swipeable: View,
//         DrawerLayout: View,
//         State: {},
//         ScrollView: View,
//         Slider: View,
//         Switch: View,
//         TextInput: View,
//         ToolbarAndroid: View,
//         ViewPagerAndroid: View,
//         DrawerLayoutAndroid: View,
//         WebView: View,
//         NativeViewGestureHandler: View,
//         TapGestureHandler: View,
//         FlingGestureHandler: View,
//         ForceTouchGestureHandler: View,
//         LongPressGestureHandler: View,
//         PanGestureHandler: View,
//         PinchGestureHandler: View,
//         RotationGestureHandler: View,
//         /* Buttons */
//         RawButton: View,
//         BaseButton: View,
//         RectButton: View,
//         BorderlessButton: View,
//         /* Other */
//         FlatList: View,
//         gestureHandlerRootHOC: jest.fn(),
//         Directions: {},
//     };
// });

// jest.mock('@react-navigation/native', () => {})
// jest.mock('@react-navigation/bottom-tabs', () => {});
// jest.mock('@react-navigation/stack', () => {});

// // jest.mock('@react-navigation/native', () => {})
// // jest.mock('@react-navigation/bottom-tabs', () => {
// //     const View = require('react-native/Libraries/Components/View/View');
// //     return {
// //         createBottomTabNavigator: () => View
// //     }
// // });
// // jest.mock('@react-navigation/stack', () => {
// //     const View = require('react-native/Libraries/Components/View/View');
// //     return {
// //         createStackNavigator: ()=>View
// //     }
// // });
// // jest.mock('react-native-vector-icons/Ionicons', () => {});
// // jest.mock('@react-native-firebase/auth', () => {});
jest.mock('@react-native-google-signin/google-signin', () => {
    // const {
    //     GoogleSignin,
    //     statusCodes
    // }  = require('@react-native-google-signin/google-signin');
    const View = require('react-native/Libraries/Components/View/View');
    let GoogleSigninButton = View;
    GoogleSigninButton.Size = {
        Wide: 0
    }
    GoogleSigninButton.Color = {
        Dark: 'black'
    }
    return {
        GoogleSignin: {
            configure: () => {}
        },
        statusCodes: null,
        GoogleSigninButton
    }
});
jest.mock('@react-native-firebase/firestore', () => {
    //const db = require('@react-native-firebase/firestore/lib/index.js')
    return () => {
        return {
            collection: () => {}
        }
    }
});

// // jest.mock('react-native-linear-gradient', () => {})
jest.mock('react-native-reanimated', () => {})
// // jest.mock('react-native-maps', () => {
// //     return {
// //         PROVIDER_GOOGLE: null
// //     }
// // })
// // jest.mock('react-native-invertible-scroll-view', () => {})
// // jest.mock('react-native-calendars', () => {Calendar: null})
// // jest.mock('react-native-date-picker', () => {})
// // jest.mock('react-native-sticky-parallax-header', () => {})
// //https://github.com/software-mansion/react-native-gesture-handler/issues/344#issuecomment-540386912



jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
// jest.mock('react-native-firebase', () => {
//     const firebaseMock = require('./__mocks__/react-native-firebase')
//     return firebaseMock
// })
