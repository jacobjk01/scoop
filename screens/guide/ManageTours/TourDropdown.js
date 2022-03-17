//@ts-check
import SelectDropdown from 'react-native-select-dropdown'
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { viewAllTours } from 'api/tours';

const TourDropdown = ({selectedValue, setSelectedValue}) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const getTours = async () => {
      setOptions(await viewAllTours())
    }
    getTours()
    return () => {
    }
  }, [])
  
  return (
    <View >
    <SelectDropdown
      data={options}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        setSelectedValue(options[index])
        return selectedItem.title
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item.title
      }}
    />
  </View>
  );
}
export default TourDropdown