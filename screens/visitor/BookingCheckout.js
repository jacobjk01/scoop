import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Modal
} from 'react-native';
import { primary, white, black, grayDark, grayLight, grayMed } from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Checkout = ({navigation}) => {

  const [payOption, setPayOption] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const showDot = (option) => {
    if (payOption == option) {
      return (
        <View
          style={{height: 13, width: 13, backgroundColor: primary, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}
        ></View>
      )
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5', fontFamily: 'Helvetica'}}>
      <FlatList style={{height: '100%'}}
        ListHeaderComponent={
          <View>
            {/*Top Container___________________________________________________________ */}
            <View style={styles.topContainer}>
              <View style={{display: 'flex', flexDirection: 'row', marginLeft: '5%', marginTop: '10%'}}>
                <Image
                  style={{width: 180, height: 115, resizeMode: 'cover', borderRadius: 10}}
                  source={require('../../images/Westwood_village.png')}
                />
                <View style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 10}}>
                  <Text style={{fontFamily: 'Helvetica-Bold', color: black, fontSize: 18}}>Westwood Tour</Text>
                  <Text style={{fontSize: 15, color: grayMed}}>with Natalie</Text>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 30, marginLeft: '10%'}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Date</Text>
                  <Text style={styles.info}>July 14</Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Time</Text>
                  <Text style={styles.info}>10:00 AM</Text>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: '10%', marginBottom: 30}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Visitors</Text>
                  <Text style={styles.info}>2</Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Meetup Point</Text>
                  <Text style={styles.info}>Bruin Bear Statue</Text>
                </View>
              </View>
              <View style={styles.divider}>

              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', width: '80%', marginTop: 33, marginBottom: 33}}>
                <Text style={styles.info}>Total</Text>
                <Text style={styles.info}>$16</Text>
              </View>
            </View>

            {/*Bottom area*/}
            <View style={styles.bottomContainer}>
              <Text style={{fontSize: 18, fontFamily: 'Helvetica-Bold', color: black, marginTop: 40, marginLeft: 30, marginRight: 'auto'}}>
                Select Payment Method
              </Text>
              <TouchableOpacity 
                style={{display: 'flex', flexDirection: 'row', marginLeft: 40, marginTop: 17, marginBottom: 5}}
                onPress={() => setPayOption(false)}
              >
                <View style={{width: 22, height: 22, borderRadius: 25, borderWidth: 1, borderColor: grayDark}}>
                  {showDot(false)}
                </View>
                <Text style={{fontSize: 15, color: black, marginLeft: 10}}>Venmo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row', marginLeft: 40, marginTop: 15, marginBottom: 43}}
                onPress={() => setPayOption(true)}
              >
                <View style={{width: 22, height: 22, borderRadius: 25, borderWidth: 1, borderColor: grayDark}}>
                  {showDot(true)}
                </View>
                <Text style={{fontSize: 15, color: black, marginLeft: 10}}>Cash</Text>
              </TouchableOpacity>
            </View>
          </View>
        }/>
      {/* Confirmation_________________________________ */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={payOption==null?styles.disabledConfirmButton:styles.confirmButton}
          onPress={() => {if (payOption != null){setModalVisible(true)}}}  
          disabled={payOption == null}
        >
          <Text style={payOption==null?styles.disabledConfirmText:styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      {/*Modal____________________________________________________________________*/}
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%'}}>
          <View style={{backgroundColor: white, width: '90%', marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto', marginLeft: 'auto', borderRadius: 15}}>
            <Ionicons
              name={"checkmark-circle-outline"}
              color={primary}
              size={40}
              style={{marginLeft: 'auto', marginRight:'auto', marginTop: 13}}
            >
            </Ionicons>
            <Text style={{color: primary, fontSize: 16, fontFamily: 'Helvetica-Bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}>
              Confirmed!
            </Text>
            <View style={[styles.divider, {borderBottomWidth: 1.5, borderColor: grayMed}]}></View>
            <Text style={{fontSize: 15, width: 250, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', marginTop: 20, marginBottom: 10}}>
              <Text style={{}}>
                Your tour on 
              </Text>
              <Text style={{fontFamily: 'Helvetica-Bold'}}> July 14, 10:00 AM </Text>
              <Text>
                has been confirmed!
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('HomePage')}
              style={{backgroundColor: primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 13, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20}}
            >
              <Text style={{fontSize: 15, color: white, marginLeft: 'auto', marginRight: 'auto', fontFamilt: 'Helvetica-Bold'}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/*Header______________________________________________________________________________ */}
      <View style={{backgroundColor: primary, height: 80, width: '100%', position: 'absolute'}}>
        <Text style={[styles.titleText, {marginTop: 20}]}>Checkout</Text>
      </View>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name='chevron-back-outline' size={20} color={primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoBox: {

  },
  infoTitle: {
    fontSize: 16,
    color: grayMed
  },
  info: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold'
  },
  backIcon: {
    backgroundColor: white,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    top: 22,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 27,
    color: white,
    fontFamily: 'Helvetica-Bold'
  },
  divider: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomColor: grayMed,
    borderBottomWidth: 1,
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 20,
    left: 0,
    height: 120,
    width: 200,
  },
  topContainer: {
    width: 390,
    marginTop: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    backgroundColor: 'white',

    //android only
    elevation: 10
  },
  bottomContainer: {

    width: 390,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 115,
    borderRadius: 20,
    backgroundColor: 'white',

    //android only
    elevation: 10,
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 105,
    backgroundColor: white,
    
  },
  confirmButton: {
    height: '60%',
    width: '90%',
    backgroundColor: primary,
    borderRadius: 17,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',

    // Android only
    elevation: 10,
  },
  disabledConfirmButton: {
    height: '60%',
    width: '90%',
    backgroundColor: white,
    borderRadius: 17,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: grayMed,

  },
  confirmText: {
    color: white,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto', fontSize: 19,
    fontFamily: 'Helvetica-Bold'
  },
  disabledConfirmText: {
    color: grayMed,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto', fontSize: 19,
    fontFamily: 'Helvetica-Bold'
  }
});

export default Checkout;
