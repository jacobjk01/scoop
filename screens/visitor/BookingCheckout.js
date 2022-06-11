import { black, gray, primary, white } from 'config/colors';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Modal, SafeAreaView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bookTour } from '../../api/tours';
import BottomButton from '../../components/BottomButton';
import Header from '../../components/Header';
import { UserContext } from '../../contexts';
import { reg14, bold14, bold16, bold18, bold20, bold24 } from '../../config/typography.js';
import { getMeetingPt } from '../../api/tours';

const Checkout = ({navigation, route}) => {
  const {tour, tourSetting, guide, visitorCount, comment, time} = route.params
  console.log('ff')
  const date = time
  const {
    userAuth, setUserAuth
  } = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [meetingPt, setMeetingPt] = useState()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getMeetingPt(tourSetting.meetingPt).then((meetingPt) => {
        setMeetingPt(meetingPt.title)
      })
    }
    return () => isMounted = false
  }, [])

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
    <SafeAreaView style={{backgroundColor: white}}>
      <FlatList style={{height: '100%'}}
        ListHeaderComponent={
          <View>
            <Header title='Checkout' navigation={navigation} backgroundColor={white} color={primary}/>
            <View>
              <View style={{display: 'flex', flexDirection: 'row', marginLeft: '10%', marginTop: '10%'}}>
                <Image
                  style={{width: '45%', height: 115, resizeMode: 'cover', borderRadius: 10, marginRight: '5%'}}
                  source={{uri: tour.picture}}
                />
                <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                  <Text style={{...bold16}}>{tour.title}</Text>
                  <Text style={{...reg14, color: gray}}>with {guide.name}</Text>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 30, marginLeft: '10%'}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Date</Text>
                  <Text style={styles.info}>{moment(date).format('MMM DD')}</Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Time</Text>
                  <Text style={styles.info}>{moment(date).format('LT')}</Text>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: '10%', marginBottom: 30}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Visitors</Text>
                  <Text style={styles.info}>{visitorCount}</Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text style={styles.infoTitle}>Meetup Point</Text>
                  <Text style={styles.info}>{meetingPt?meetingPt:'N/A'}</Text>
                </View>
              </View>
              <View style={styles.divider}>

              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', width: '80%', marginTop: 33, marginBottom: 33}}>
                <Text style={styles.info}>Total</Text>
                <Text style={styles.info}>${tourSetting.cost}</Text>
              </View>
            </View>

            {/*Bottom area*/}
            {/* <View style={{marginBottom: 80}}>
              <Text style={{...bold18, color: black, marginTop: 40, marginLeft: 30, marginRight: 'auto'}}>
                Select Payment Method
              </Text>
              <TouchableOpacity 
                style={{display: 'flex', flexDirection: 'row', marginLeft: 40, marginTop: 17, marginBottom: 5}}
                onPress={() => setPayOption(false)}
              >
                <View style={{width: 22, height: 22, borderRadius: 25, borderWidth: 1, borderColor: gray}}>
                  {showDot(false)}
                </View>
                <Text style={{fontSize: 15, color: black, marginLeft: 10}}>Venmo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row', marginLeft: 40, marginTop: 15, marginBottom: 43}}
                onPress={() => setPayOption(true)}
              >
                <View style={{width: 22, height: 22, borderRadius: 25, borderWidth: 1, borderColor: gray}}>
                  {showDot(true)}
                </View>
                <Text style={{fontSize: 15, color: black, marginLeft: 10}}>Cash</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        }
      />
      {/* Confirmation_________________________________ */}
      <BottomButton title='Confirm' 
        onPress={async () => {
          setModalVisible(true)
          //console.log(tourSetting.ref)
          //console.log(visitorCount)
          //console.log(userAuth.uid)
          //console.log(comment)
          const res = await bookTour(tourSetting.ref, visitorCount, userAuth.uid, comment || "", date)
        }}
      />
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
            <Text style={{color: primary, ...bold16, marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}>
              Confirmed!
            </Text>
            <View style={[styles.divider, {borderBottomWidth: 1.5, borderColor: gray}]}></View>
            <Text style={{...reg14, width: 250, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', marginTop: 20, marginBottom: 10}}>
              <Text style={{}}>
                Your tour on 
              </Text>
              <Text style={{...bold14}}> July 14, 10:00 AM </Text>
              <Text>
                has been confirmed!
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={{backgroundColor: primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 13, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20}}
            >
              <Text style={{...bold14, color: white, marginLeft: 'auto', marginRight: 'auto'}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoTitle: {
    ...reg14,
    color: gray,
    paddingVertical: 4
  },
  info: {
    ...bold14,
  },
  divider: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomColor: gray,
    borderBottomWidth: 1,
  },
});

export default Checkout;
