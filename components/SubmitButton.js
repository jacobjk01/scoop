import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { gray, primary, lightGray } from "config/colors";
const SubmitButton = ({ onPress, title, isDisabled, style }) => {
  const fontColor = {
    backgroundColor: primary
  }
  if (isDisabled) {
    fontColor.backgroundColor = lightGray
  }
  return (
    <TouchableOpacity style={[{
      margin: 'auto',
      height: 50,
      borderRadius: 10,
    },fontColor, style]} onPress={() => {
      !isDisabled && onPress()
    }}>
      <Text style={{
        color: "#fff",
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        textAlign: "center",
        marginTop: 'auto',
        marginBottom: 'auto',
      }}>{title}</Text>
    </TouchableOpacity>
  )
};


export default SubmitButton