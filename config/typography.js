const { white, grayDark, primary, black, grayLight} = require("./colors");
import { StyleSheet } from "react-native";


const style = StyleSheet.create({

    smallBold:{
        fontFamily: 'Helvetica-Bold', 
        fontSize: 18,  
    },
    mediumBold: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 20,
    },
    largeBoldText:{
        fontSize: 23, 
        fontWeight: '700'
    },
    backIcon: {
        backgroundColor: primary,
        borderRadius: 10,
        borderColor: white,
        borderWidth: 1,
        position: "absolute",
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        borderWidth: 0.75,
        borderRadius: 5,
        borderColor: grayDark,
        width: '100%',
        fontSize: 18,
    },
    dropdownButton: {
        borderWidth: 0.75,
        borderLeftWidth: 1.25,
        borderRightWidth: 1.25,
        borderColor: grayDark,
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    titleText: {
        fontSize: 27,
        fontWeight: '600',
        fontFamily: 'Helvetica-Bold'
    },
    graySmallText: {
        color: grayLight,
        fontSize: 15,
    },
    linearGrad: {
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    lightSmallText: {
        fontSize: 14,
        fontWeight: '200',
        color: white,
    },
    medLargeText:{
        fontSize: 20,
        fontWeight: '400', 
        color: white,
    },
    mediumLight: {
        fontSize: 18,
        fontWeight: '200',
    },
    mediumOblique: {
        fontSize: 18,
        fontFamily: 'Helvetica-Oblique',
    }






    // dropdownTitle: {
    //     fontSize: 15,
    //     color: '#456ECD',
    //     fontFamily: 'Helvetica-Bold',
    // },
    // dropdownInfo: {
    //     fontSize: 15,
    //     color: grayDark,
    // },
    // baseText: {
    //     fontFamily: 'Helvetica',
    //   },
    // titleText: {
    //     fonSize: 24,
    //     fontWeight: '600',
    //     color: white,
    // },
    // sectionText: {
    //     fontSize: 18,
    //     fontWeight: '600',
    // },
    // recommendationTitle: {
    //     fontSize: 16,
    //     fontWeight: '600',
    //     color: white,
    // },
    // tourText: {
    //     fontSize: 18,
    //     fontWeight: '600',
    //     color: white,
    // },
    // detailText: {
    //     fontSize: 14,
    //     fontWeight: '200',
    //     color: white,
    // },
    // summaryText: {
    //     fontSize: 18,
    //     fontWeight: '200',
    //     color: white,
    // },
    // backIcon: {
    //     backgroundColor: primary,
    //     borderRadius: 10,
    //     borderColor: white,
    //     borderWidth: 1,
    //     position: "absolute",
    //     left: 20,
    //     top:40,
    //     width: 40,
    //     height: 40,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // recommendationbutton: {
    //     flex: 1,
    //     backgroundColor: primary,
    //     borderRadius: 7,
    //     height: 100,
    // },
    // linearGradTour: {
    //     backgroundColor: "transparent",
    //     borderRadius: 10,
    //     marginTop: 'auto',
    //     position: 'absolute',
    //     top: 150,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    // },
    // linearGradGuide: {
    //     backgroundColor: "transparent",
    //     borderRadius: 10,
    //     marginTop: 'auto',
    //     position: 'absolute',
    //     top: 60,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    // },
    // dropdownButton: {
    //     borderWidth: 0.75,
    //     borderLeftWidth: 1.25,
    //     borderRightWidth: 1.25,
    //     borderColor: grayDark,
    //     width: '100%',
    //     borderTopRightRadius: 5,
    //     borderTopLeftRadius: 5,
    // },
    // listTourImage: {
    //     marginRight: 15,
    //     width: 200,
    //     height: 300,
    // },
    // listGuideImage: {
    //     width: 100,
    //     height: 100,
    // },
    // backCard: {
    //     flex: 1,
    //     backgroundColor: white,
    //     marginTop: 10,
    //     borderRadius: 20,
    //     shadowColor: black,
    //     shadowOpacity: 0.2,
    //     shadowRadius: 5,
    //     shadowOffset: {width: 1, height: 1},
    //     elevation: 5,
    // },
    // continue: {
    //     backgroundColor: primary,
    //     height: 50,
    //     borderRadius: 10,
    //     shadowColor: '#adadad',
    //     shadowOpacity: 0.8,
    //     shadowRadius: 3,
    //     shadowOffset: {width: 2, height: 2},
    //     justifyContent: 'center',
    // },
    // searchicon: {
    //     position: 'absolute',
    //     right: 10,
    //     top: 11,
    // },
    // roundButton2: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     display: 'flex',
    //     width: 77,
    //     height: 28,
    //     backgroundColor: '#3154A5',
    //     borderRadius: 10,
    //     position: 'absolute',
    //     left: 185,
    //     top: 200,
    // },
    // roundButton1: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     display: 'flex',
    //     width: 77,
    //     height: 28,
    //     backgroundColor: '#3154A5',
    //     borderRadius: 10,
    //     position: 'absolute',
    //     left: 100,
    //     top: 200,
    // },
    // inputIntro: {
    //     alignSelf: 'center',
    //     height: 100,
    //     width: '92%',
    //     borderWidth: 1,
    //     borderRadius: 7,
    //     borderColor: '#9B9BA7',
    //     paddingLeft: 15, 
    //     marginTop: 10,
    //     marginBottom: 30,
    //     paddingBottom: 50,
    //     paddingTop: 10,
    // },

});

module.exports={
    ...style
}