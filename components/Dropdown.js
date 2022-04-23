import React from 'react';
import { grayDark, black, primary } from 'config/colors.js';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DropdownIcon = () => {
  return (
      <Ionicons
          name={'caret-down-outline'}
          size={24}
          color={primary}
      />
  )
}
const Dropdown = ({ selectedValue, setSelectedValue, options, visibility, setVisibility }) => {
    const styles = {
        dropdownButton: {
            borderWidth: 0.75,
            borderLeftWidth: 1.25,
            borderRightWidth: 1.25,
            borderColor: grayDark,
            width: '100%',
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginTop: 40,
        },
    }
    const rows = []
    for (let i = 0; i < options.length; i++) {
        rows.push(
            <TouchableOpacity
                style={{ paddingVertical: 8, paddingLeft: 15, borderColor: grayDark, borderBottomWidth: i != options.length - 1?0.5:0}}
                key={i}
                onPress={() => {
                    setSelectedValue(options[i])
                    setVisibility(false)
                }}    
            >
                <Text style={{fontSize: 18}}>
                    {options[i]}
                </Text>

            </TouchableOpacity>
        )
    }

    

    return (
        <View style={{marginBottom: 25}}>
            <TouchableOpacity 
                style={[{ ...styles.dropdownButton, display: 'flex', flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 15, marginTop: 40 }, 
                { borderBottomRightRadius: 5, borderBottomLeftRadius: 5 }]}
                onPress={() => setVisibility(!visibility)}
            >
                <Text style={{ marginRight: 'auto', fontSize: 18, color: black }}>{selectedValue}</Text>
                <DropdownIcon />
            </TouchableOpacity>
            {visibility &&
                <View style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, borderRadius: 5, borderWidth: 1, borderColor: grayDark, borderTopWidth: 0, position: 'absolute', width: '100%', backgroundColor: 'white', zIndex: 100, top: 83.8 }}>
                    {rows}
                </View>
            }
        </View>
    )
}
export default Dropdown;