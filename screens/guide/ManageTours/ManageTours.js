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
import { archiveTour, getAllTourSettings, getAllTourSettingsListener, viewAllToursListener } from 'api/tours';
import { onAuthStateChanged } from 'api/auth';
import { white, black, darkGray, gray, tappableBlue, lightGray } from 'config/colors';
import {reg12, reg14, bold12, bold14, bold24, bold18, bold20} from '../../../config/typography.js'
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
  console.log(tours)
  const [modalVisible, setModalVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(0)
  const [tapMode, setTapMode] = useState('Select') // will be Select or not Select, if not Select, in delete mode
  const [selection, setSelection] = useState('preset')
  const {
    userAuth,
    setUserAuth,
    user,
    setUser
  } = useContext(UserContext);
  const [template, setTemplate] = useState('');
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const cancel = getAllTourSettingsListener(userAuth.uid, async tourSettings => {
      //console.log(tourSettings.map(item => item.id))
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
          parentId: parents[i].id,
          introduction: tourSettings[i].introduction,
          maxPeople: tourSettings[i].maxPeople,
          ref: tourSettings[i].ref
        })
      }
      setTours(_tours)
    })    
    return cancel
  }, [userAuth])

  const ModalButtonCard = ( {buttonTitle, setState, state, desiredState}) => {
    const borderColor = state === desiredState ? { borderColor: tappableBlue, color: tappableBlue } : {color: darkGray}
    return (
      <TouchableOpacity style={[styles.modalSelectCard, borderColor]}
        onPress={() => (setState(desiredState))}
      >
        <Text style={[{...bold12, textAlign: 'center'}, borderColor]}>
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
          setModalVisible(false);
        }}
      >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView} >
          <TouchableWithoutFeedback>
            <View style={styles.modalView} >
              <Text style={{...bold24, marginTop: 15, marginBottom: 15 }}>New Tour</Text>
              <Text style={{...reg12, marginBottom: 20, color: gray }}>Select the type of tour you would like to add.</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {false &&
                  <ModalButtonCard 
                    buttonTitle='Customized Tour' 
                    setState={setSelection} 
                    state={selection} 
                    desiredState={'customized'}
                  />
                }
                <ModalButtonCard
                  buttonTitle='Preset Tour'
                  setState={setSelection}
                  state={selection}
                  desiredState='preset'
                />
              </View>
              {selection === 'preset' && <TourDropdown
                selectedValue={template}
                setSelectedValue={setTemplate}
                />
                /*<Dropdown selectedValue={template} setSelectedValue={setTemplate} options={options} visibility={dropdown} setVisibility={setDropdown} />*/
              }

              {!dropdown ? 
                <>
                  <Pressable
                    style={{width: '100%'}}
                    onPress={() => setModalVisible(true)}
                  >
                    <SubmitButton title='Add Tour' onPress={() => {
                        let _template = template;
                        if (!validate(selection, template)) return
                        setModalVisible(false)
                        setTemplate('')
                        //console.log(_template)
                        navigation.navigate('AddTour', _template);
                      }} isDisabled={template === ''}
                    />
                  </Pressable>
                  <Pressable
                    style={{ width: '100%'}}
                    onPress={() => {
                      setModalVisible(false)
                      setTemplate('')
                    }}
                  >
                    <Text style={{...reg12, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20}}>Cancel</Text>
                  </Pressable>
                </> : 
                <View style={{ height: 107 }}></View>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

      <ScrollView style={{paddingRight: 20, paddingLeft: 20, height: '100%'}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 20, ...bold24, marginBottom: 35}}>
            Manage Tours
          </Text>
          <TouchableOpacity style={styles.selectButton} onPress={()=> {
            tapMode == 'Select' ? setTapMode('Cancel') : setTapMode('Select'),
            removeVisible == 0 ? setRemoveVisible(100) : setRemoveVisible(0)}}>
          <Text style={{color: tappableBlue}}>{tapMode}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity style={styles.addNewTourCard}
            onPress={() => setModalVisible(true)}
            // navigation.navigate('AddTour')
            // () => setModalVisible(true);
          >
            
            <Ionicons name={'add'} size={24} style={{color: darkGray}}/>
            <Text style={{...reg14, color: darkGray, textAlign: 'center'}}>
              Add Tour
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
            {(tour,i) => {
                return (
                  <TouchableOpacity key={i} style={styles.tourCard} onPress={async () => {
                    if (tapMode === 'Select') {
                      navigation.navigate('TourEdit', {tour})
                      return;
                    }
                    console.log(tour) //todo: get the ref so that database can be changed also
                    const res = await archiveTour(tour.parentId, tour.id)
                    console.log(res)
                    setTours(tours.filter((item, j) => j !== i))
                  }}>
                    <TouchableOpacity style={{zIndex: 10}}>
                    <Image source = {require('../../../images/remove.png')} 
                          style={{opacity: removeVisible, marginLeft: -5, marginTop: -10, marginBottom: -10, zIndex: 10, height: 20, width: 20}}/>
                    </TouchableOpacity>
                    <ImageBackground style={styles.tourImage} source={{uri: tour.src}} imageStyle={{borderRadius: 10}}>
                      <LinearGradient
                        colors={['transparent', black]}
                        style={styles.linearGradTour}
                        />
                      <Text style={{...bold14, color: white, width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 20}}>
                        {tour.name}
                      </Text>
                    </ImageBackground>
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '700',
  },
  baseText: {
    fontFamily: 'Helvetica',
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
    borderColor: darkGray,
    width: '45%',
    height: 170,
    margin: 8,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    // textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tourCard: {
    width: '45%',
    height: 170,
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
    borderColor: gray,
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