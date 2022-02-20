import React, {useState, useEffect} from 'react';
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
import { onAuthStateChanged } from 'api/auth';
import { white, black, grayVeryDark, grayMed, tappableBlue } from 'config/colors';
import BottomButton from '../../components/BottomButton';


const ManageTours = ({navigation}) => {
  const tours = toursData.tours;
  const [userAuth, setUserAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customized, setCustomized] = useState(false);
  const [preset, setPreset] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");



  useEffect(() => {
    console.log('onAuthStateChanged called')
    var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
      //if userAuth exists, 
      if (newUserAuth && userAuth == null) { // userAuth is null, so definitely unique
        setUserAuth(newUserAuth);
      // userAuth exists and doesn't match with with newUserAuth.uid
      } else if (userAuth.uid && newUserAuth && (userAuth.uid != newUserAuth.uid)) {
        setUserAuth(newUserAuth);
      }
    })
    return () => {
      unsubscribeAuth();
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (userAuth) {
        console.log('user logged in');
        const currentUser = await getUser(userAuth);
        setUser({...currentUser.data()})
      }
    }
    fetchData();
  }, [userAuth]);

  const SubmitButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.submitButton}>
      <Text style={styles.submitText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderModalButtonCard = ( text, setState, state, setOtherState ) => {
    const borderColor = state ? { borderColor: tappableBlue } : {}
    return (
      <TouchableOpacity style={[styles.modalSelectCard, borderColor]}
        onPress={() => (setState(!state), setOtherState(state))}
      >
        <Text style={{fontSize: 11, fontWeight: '400', color: grayVeryDark, textAlign: 'center', top: 1}}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  // const renderTourDropdown = () => {
  //   return (
  //     // <View style={styles.container}>
  //       <Picker
  //         selectedValue={selectedValue}
  //         style={{ height: 40, width: '100%', color: 'red', backgroundColor: 'red'}}
  //         mode="dropdown"
  //         onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  //       >
  //         <Picker.Item label="Java" value="java" style={{}} />
  //         <Picker.Item label="JavaScript" value="js" />
  //       </Picker>
  //     // </View>
  //   );
  // }

  const validate = () => {
    if (customized || preset) {
      setModalVisible(false);
      let type = customized ? 'customized' : 'preset';
      navigation.navigate('AddTour', type);
    } else {
      alert('Please select a tour type')
    }
  }

  const submitBgColor = customized || preset ? "#3154A5" : grayMed
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // paddingTop: 40,
      // height: 50,
      // alignItems: "center"
    },
    submitButton: {
      height: 50,
      backgroundColor: submitBgColor,
      borderRadius: 10,
    },
    submitText: {
      color: "#fff",
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      textAlign: "center",
      padding: 17,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '100%',
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    textStyle: {
      color: "black",
      // fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: '700',
    },
    baseText: {
      fontFamily: 'Helvetica',
    },
    titleText: {
      fontSize: 24,
      fontWeight: '700',
      marginTop: 60,
    },
    selectButton: {
      position: 'absolute',
      top: 7,
      right: 22,
    },
    sectionText: {
      fontSize: 20,
      fontWeight: '700',
      marginTop: 30,
      marginLeft: 10,
    },
    listTourImage: {
      marginRight: 15,
      width: 200,
      height: 300,
    },
    listGuideImage: {
      marginRight: 10,
      width: 120,
      height: 120,
    },
    tourTitle: {
      // width: 200,
      fontWeight: '600',
      // fontSize: 18,
      color: white,
      position: 'absolute',
      bottom: 45,
      // left: 20,
    },
    tourText: {
      position: 'absolute',
      color: white,
      fontSize: 10,
      bottom: 30,
    },
    guideText: {
      width: 120,
      position: 'absolute',
      bottom: 10,
      left: 10,
      color: white,
    },
    linearGradGuide: {
      position: 'absolute',
      top: 60,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      borderRadius: 10,
    },
    addNewTourCard: {
      borderWidth: 1,
      borderStyle: 'dashed',
      // stroke-dasharray: '8, 3',
      borderColor: grayVeryDark,
      width: '45%',
      height: 160,
      margin: 8,
      borderRadius: 10,
      justifyContent: 'center',
      // textAlign: 'center',
      alignItems: 'center',
      
    },
    tourCard: {
      width: '45%',
      height: 160,
      margin: 8,
      borderRadius: 10,
      backgroundColor: white,
      shadowColor: black,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    modalSelectCard: {
      borderWidth: 1,
      // stroke-dasharray: '8, 3',
      borderColor: grayMed,
      width: '45%',
      height: 100,
      margin: 8,
      borderRadius: 8,
      justifyContent: 'center',
      // textAlign: 'center',
      alignItems: 'center',
    },
    tourImage: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    tourTextSection: {
      position: 'relative',
      top: '110%',
      left: 10,
      right: 5,
    },
    linearGradTour: {
      position: 'absolute',
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      borderRadius: 10,
    },
  });

  if (!user) {
      return (
        <SafeAreaView>
            <Text>User not logged in</Text>
        </SafeAreaView>
      );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: white}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.titleText, { marginTop: 15, marginBottom: 15 }]}>New Tour</Text>
            <Text style={[styles.textStyle, { marginBottom: 20, fontSize: 12, color: grayVeryDark }]}>Select the type of tour you would like to add.</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {renderModalButtonCard('Customized Tour', setCustomized, customized, setPreset)}
              {renderModalButtonCard('Preset Tour', setPreset, preset, setCustomized)}
            </View>
            {/* {preset ? renderTourDropdown() : null} */}
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <SubmitButton title='Add Tour' onPress={() => validate()}></SubmitButton>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
          <View style={{marginTop: 50}}>
            <Text style={{marginLeft: 20, fontSize: 24, fontWeight: '700', marginBottom: 35}}>
              Manage Tours
            </Text>
            <TouchableOpacity style={styles.selectButton}>
            <Text style={{color: tappableBlue}}>Select</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity style={styles.addNewTourCard}
              onPress={() => setModalVisible(true)}
              // navigation.navigate('AddTour')
              // () => setModalVisible(true);
            >
              
              <Ionicons name={'add'} size={24} style={{color: grayVeryDark, position: 'absolute', left: 8}}/>
              <Text style={{fontSize: 16, fontWeight: '400', color: grayVeryDark, textAlign: 'center', left: 8, top: 1}}>
                Add a new tour
              </Text>
            </TouchableOpacity>
            <Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {/* <Text >Hide Modal</Text> */}
            </Pressable>
            {tours.map((tour) => {
              return(
                <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', {tour})}>
                  <ImageBackground style={styles.tourImage} source={tour.src} imageStyle={{borderRadius: 10}}>
                    <LinearGradient
                      colors={['transparent', black]}
                      style={styles.linearGradTour}
                      />
                  </ImageBackground>
                  <View style={styles.tourTextSection}>
                    <Text style={styles.tourTitle}>{tour.name}</Text>
                    <Text style={styles.tourText}>{tour.duration} min | <Ionicons name={'people'} size={12}/> Max {tour.maxPeople} people | <Ionicons name={tour.transportation} size={12}/></Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ManageTours;