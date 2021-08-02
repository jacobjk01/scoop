import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import colors from '../config/colors';
import PictureIcon from './PictureIcon';
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
    return <View style={styles.lastMessage}>
        <View style={styles.left}>
            <PictureIcon  source={guide.picture} size={60}/>
        </View>
        <View style={[styles.middle]}>
            <NameTourText guide = {guide}/>
            <Text style={{color: colors.grayMed}} numberOfLines={1}>
                    {guide.lastMessage}
            </Text>
        </View>
        <View style={styles.right}>
            <Text style={{color: colors.grayMed}} >
                {guide.date}
            </Text>
        </View>
    </View>
}

function NameTourText(props) {
    const {guide} = props;
    return <Text numberOfLines={1}>
        <Text style={{fontWeight:'bold'}}>{guide.name}</Text>
        <Text> • </Text>
        <Text style={{fontStyle:'italic'}}>{guide.tour}</Text>
    </Text>

}

const styles = StyleSheet.create({
    lastMessage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    middle: {
        flex: 3
    },
    right: {
        flex: 1
    }
})
export default TourGuidesLastMsg;