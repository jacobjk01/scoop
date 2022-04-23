import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { getAllTourSettings, getAllTourSettingsListener, viewAllToursListener } from 'api/tours';
import { onAuthStateChanged } from 'api/auth';
import { white, black, grayVeryDark, grayMed, tappableBlue } from 'config/colors';
import BottomButton from 'components/BottomButton';
import { UserContext } from 'contexts';
import SubmitButton from 'components/SubmitButton';
import TourDropdown from './TourDropdown';
import { getParentData } from 'api/utilities';
import TourCardList from './TourCardList';
import Dropdown from '../../../components/Dropdown';
import { viewAllTours } from 'api/tours';


const validate = (selection, template) => {
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
  const [removeVisible, setRemoveVisible] = useState(0)
  const [selectText, setSelectText] = useState('Select')
  const [selection, setSelection] = useState('preset')
  const {
    userAuth,
    setUserAuth,
    user,
    setUser
  } = useContext(UserContext);
  const [template, setTemplate] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      let tourData = await viewAllTours();
      let titles = [];
      tourData.forEach((tour) => {
        titles.push(tour.title)
      })
      setOptions(titles);
    }
    //console.log('===begin')
    const cancel = viewAllToursListener()
    
    return () => {
      cancel()
    }
  }, [])

  useEffect(async () => {
    const cancel = getAllTourSettingsListener(userAuth.uid, async tourSettings => {
      console.log(tourSettings.map(item => item.id))
      const _tours = [] 
      //should be more optimal that running through a for loop
      const parents = await Promise.all(tourSettings.map(tourSetting => getParentData(tourSetting.ref))) 
      for (let i = 0; i < tourSettings.length; i++) {
        _tours.push({
          src: parents[i].picture,
          id: tourSettings[i].id,
          name: parents[i].title || "Missing Name",
          duration: tourSettings[i].duration || 0,
          transportation: tourSettings[i].transportation,
          maxPeople: tourSettings[i].maxPeople,
        })
      }
      setTours(_tours)
    })    
    return cancel
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

  const renderButtons = () => {
    return (
      <>
        <Pressable
          style={[styles.button]}
          onPress={() => setModalVisible(true)}
        >
          <SubmitButton title='Add Tour' onPress={() => {
            let _template = template;
            if (!validate(selection, template)) return
            setModalVisible(false)
            setTemplate('')
            //console.log(_template)
            navigation.navigate('AddTour', _template);
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
      </>
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
          setModalVisible(false);
        }}
      >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView} >
          <TouchableWithoutFeedback>
            <View style={styles.modalView} >
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
                
                /*<Dropdown selectedValue={template} setSelectedValue={setTemplate} options={options} visibility={dropdown} setVisibility={setDropdown} />*/
              }

              {!dropdown ? renderButtons() : <View style={{ height: 107 }}></View>}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

      <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 20, fontSize: 24, fontWeight: '700', marginBottom: 35}}>
            Manage Tours
          </Text>
          <TouchableOpacity style={styles.selectButton} onPress={()=> {
            selectText == 'Select' ? setSelectText('Cancel') : setSelectText('Select'),
            removeVisible == 0 ? setRemoveVisible(100) : setRemoveVisible(0)}}>
          <Text style={{color: tappableBlue}}>{selectText}</Text>
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
          <TourCardList
            tours={tours}
          >
            {(tour) => {
                return(
                  <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => navigation.navigate('TourEdit', {tour})}>
                    <TouchableOpacity style={{zIndex: 10}}>
                    <Image source = {require('../../../images/remove.png')} 
                           style={{opacity: removeVisible, marginLeft: -5, marginTop: -10, marginBottom: -10, zIndex: 10, height: 20, width: 20}}/>
                    </TouchableOpacity>
                    <ImageBackground style={styles.tourImage} source={{uri: tour.src}} imageStyle={{borderRadius: 10}}>
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
              }}

          </TourCardList>
          
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