import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { blueDark, blueMed, grayMed, primary } from "config/colors";
const SubmitButton = ({ onPress, title, isDisabled, style }) => {
  const fontColor = {
    backgroundColor: primary
  }
  if (isDisabled) {
    fontColor.backgroundColor = grayMed
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
        padding: 17,
      }}>{title}</Text>
    </TouchableOpacity>
  )
};


export default SubmitButton