import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'
import SigninButton from '../components/SigninButton';
import SignoutButton from '../components/SignoutButton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Dropdown from 'react-bootstrap/Dropdown';

export default ({ navigation }) => {
  const { mode, setMode } = useContext(UserContext);
  const feedbackOptions = ['General Feedback', 'Tour Specific Feedback', 'Tour Guide Feedback', 'Booking Issues', 'Technical Support', 'Other']

  const [text, setText] = useState('');

  const style = StyleSheet.create({
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
          onSelect={(selectedItem, index) => { console.log(selectedItem, index) }}
          defaultButtonText={"Select"}
          buttonTextStyle={style.defaultText}
          buttonTextAfterSelection={(selectedItem, index) => {
            selected = selectedItem;
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
          onChangeText={c => setText(c)}
        ></TextInput>
        <View style={{ paddingTop: 10, marginTop: 20, backgroundColor: "#3154A5", borderRadius: 10, height: 60 }}>
          <Button
            onPress={async () => {
              // await 
              navigation.popToTop();
            }}
            titleStyle={{
              color: "white",
              fontSize: 16,
              fontFamily: 'Helvetica-Bold',
            }}
            title="Submit"
            color="#fff" />
        </View>

      </View>
    </SafeAreaView>
  )


}

