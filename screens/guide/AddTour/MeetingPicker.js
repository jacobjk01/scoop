import {Picker} from '@react-native-picker/picker';
import React, { useRef } from 'react';
//android notes are here: https://github.com/react-native-picker/picker
/** */
/**
 * 
 * @param {{setValue, value, meetingPts}} props 
 * @returns 
 */
const MeetingPicker = (props) => {
  const pickerRef = useRef();
  const {setValue, meetingPts, value} = props
  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  console.log(meetingPts)
  return <Picker
  selectedValue={meetingPts[value].title}
  onValueChange={(itemValue, itemIndex) => {

    console.log(itemIndex)
    setValue(itemIndex)
  }}>
    {meetingPts.map((meetingPt, i) => {
      return <Picker.Item label={meetingPt.title} value={meetingPt.title} key={i} />
    })}
</Picker>
}

export default MeetingPicker