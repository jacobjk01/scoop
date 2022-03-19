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

const validate = (selection, template) => {
  console.log(template)
  console.log('^^')
  if (selection !== '') {
    return true
  } else if (selection === 'preset' && template === '') {
    //if user wants to create a preset template, they must select a template also
    return false
  }
  else {
    alert('Please select a tour type')
    return false
  }
}

const ManageTours = ({navigation}) => {
  const [tours, setTours] = useState([] || toursData.tours);
  const [modalVisible, setModalVisible] = useState(false)
  const [selection, setSelection] = useState('preset')
  const {
    userAuth,
    setUserAuth,
    user,
    setUser
  } = useContext(UserContext);
  const [template, setTemplate] = useState('')
  useEffect(async () => {
    console.log(userAuth.uid)
    const tourSettings = await getAllTourSettings(userAuth.uid)
    const _tours = [] 
    //should be more optimal that running through a for loop
    const parents = await Promise.all(tourSettings.map(tourSetting => getParentData(tourSetting.ref))) 
    for (let i = 0; i < tourSettings.length; i++) {
      _tours.push({
        id: tourSettings[i].id,
        src: 1,
        name: parents[i].title || "No name",
        duration: tourSettings[i].duration,
        transportation: tourSettings[i].transportation,
        maxPeople: tourSettings[i].maxPeople,
      })
    }
    console.log('this should be last')
    setTours(_tours)
  }, [userAuth])

  const renderModalButtonCard = ( buttonTitle, setState, state, desiredState) => {
    const borderColor = state === desiredState ? { borderColor: tappableBlue, color: tappableBlue } : {color: grayVeryDark}
    return (
      <TouchableOpacity style={[styles.modalSelectCard, borderColor]}
        onPress={() => (setState(desiredState))}
      >
        <Text style={[{fontSize: 11, fontWeight: '400', textAlign: 'center', top: 1}, borderColor]}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  }
  if (!user) {
    return (
      <SafeAreaView>
          <Text>User not logged in</Text>
      </SafeAreaView>
    );
  }
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
            {false && renderModalButtonCard('Customized Tour', setSelection, selection, 'customized')}
            {renderModalButtonCard('Preset Tour', setSelection, selection, 'preset')}
          </View>
          {selection === 'preset' && <TourDropdown
            selectedValue={template}
            setSelectedValue={setTemplate}
            />
          }
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(true)}
          >
            <SubmitButton title='Add Tour' onPress={() => {
              if (!validate(selection, template)) return
              setModalVisible(false)
              setTemplate('')
              navigation.navigate('AddTour', template);
              console.log(template)
            }} isDisabled={template === ''}/>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={() => {
              setModalVisible(false)
              setTemplate('')
            }}
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
};


const styles = StyleSheet.create({
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

export default ManageTours;