import React from 'react';
import {Text, View} from 'react-native'

function TourGuidesLastMsg(props) {
    const {tourGuides} = props;
    const TourGuides = tourGuides.map(guide => {
        return <LastMsg guide={guide}/>
    })
    return (
        <View>
            {TourGuides}
        </View>
        
    );
}

function LastMsg(props) {
    const {guide} = props;
    return <Text>{guide.name}</Text>
}

export default TourGuidesLastMsg;