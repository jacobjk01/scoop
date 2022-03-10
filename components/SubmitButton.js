import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { blueDark, blueMed, grayMed, primary } from "config/colors";
const SubmitButton = ({ onPress, title, isDisabled }) => {
    return (
      <TouchableOpacity style={{
        height: 50,
        backgroundColor: isDisabled?primary:grayMed,
        borderRadius: 10,
      }} onPress={onPress}>
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