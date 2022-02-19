import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'
import SigninButton from '../components/SigninButton';
import SignoutButton from '../components/SignoutButton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { sendFeedback } from '../api/feedback';
import uuid from 'react-native-uuid';

export default ({ navigation }) => {
  const { mode, setMode } = useContext(UserContext);
  // const timerLog = () => console.log('timer starts')
  // const [timer, setTimer] = useState(null)
  const [topic, setTopic] = useState(null);
  const [description, setDescription] = useState("");
  const feedbackOptions = ['General Feedback', 'Tour Specific Feedback', 'Tour Guide Feedback', 'Booking Issues', 'Technical Support', 'Other']
  const SubmitButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={style.submitButton}>
      <Text style={style.submitText}>{title}</Text>
    </TouchableOpacity>
  );

  const style = StyleSheet.create({
    submitButton: {
      height: 60,
      backgroundColor: "#3154A5",
      borderRadius: 10,

    },
    submitText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: 'Helvetica-Bold',
      textAlign: "center",
      padding: 22,
    },
    dropdownButton: {
      width: "100%",
      height: 40,
      borderRadius: 10,
      //  backgroundColor: "#FFF", 
      borderWidth: 1,
      borderColor: "#D9D9D9",
    },
    defaultText: {
      textAlign: 'left',
      fontSize: 14,
      fontFamily: 'Helvetica',
      color: "#9B9BA7",
    },
    dropdownText: {
      textAlign: 'left',
      fontSize: 14,
      fontFamily: 'Helvetica',
      color: "#000",
    },
    dropdownRow: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderWidth: 1,
      borderColor: "#D9D9D9",
      maxHeight: 240,
    },
    row: {
      height: 40,
    }

  });

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 30 }}>
        <View style={{ marginTop: 40, marginBottom: 30 }}>
          <Text style={{ fontSize: 25, fontFamily: 'Helvetica-Bold' }}>
            Feedback
          </Text>
          <Text style={{ fontSize: 14, paddingVertical: 15 }}>
            We are constantly striving to improve, let us know what you think!
          </Text>
        </View>

        <View style={{ marginBottom: 11 }}>
          <Text style={{ fontSize: 14 }}>
            What are you giving us feedback on?
          </Text>
        </View>
        <SelectDropdown
          data={feedbackOptions}
          onSelect={(topic, index) => setTopic(topic)}
          defaultButtonText={"Select"}
          buttonTextStyle={style.defaultText}
          buttonTextAfterSelection={(topic, index) => {
            selected = topic;
            return (
              <Text style={{ color: "#000" }}>{selected}</Text>
            );
          }}
          rowTextForSelection={(item, index) => { return item }}
          buttonStyle={style.dropdownButton}
          dropdownStyle={style.dropdownRow}
          rowTextStyle={style.dropdownText}
          dropdownOverlayColor={"#00FFF"}
          rowStyle={style.row}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={"caret-down"}
                color={"#9B9BA7"}
                size={25}
              />
            );
          }}
          dropdownIconPosition={"right"}
        />
        <TextInput
          style={{ padding: 10, paddingTop: 10, marginTop: 15, borderRadius: 10, borderWidth: 1, borderColor: "#D9D9D9", height: 375 }}
          multiline={true}
          onChangeText={(msg) => setDescription(msg)}
        // onSubmitEditing={()=>alert(description)}
        ></TextInput>
        <View style={{ marginTop: 20 }}>
          <SubmitButton onPress={async () => {
            try {
              await sendFeedback(uuid.v4(), topic, description);
            } catch (error) {
              console.error(error)
            }
            navigation.popToTop();
          }}
            title="Submit"
          />
        </View>
      </View>
    </SafeAreaView>
  )


}
