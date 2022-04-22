import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { blueDark, blueMed, grayMed, primary } from "config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewAll = ({ navigation }) => {
    return (
        <TouchableOpacity
            // onPress={() => navigation.navigate('TourList')}
            style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#007BBA', fontSize: 15 }}>view all</Text>
            <Ionicons size={15} name={'chevron-forward-sharp'} color="#007BBA" />
        </TouchableOpacity>
    )
}
export default ViewAll