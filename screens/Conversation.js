import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native'
import InvertibleScrollView from 'react-native-invertible-scroll-view';


function Conversation(props) {
    const Messages = []
    for (let i = 0; i < 100; i++) {
        Messages.push(Textbox({key: i}))
    }
    return (
        <View style={styles.container}>
            <InvertibleScrollView>
            {Messages}
            </InvertibleScrollView>
            {/* <ScrollView>
                {Messages}
            </ScrollView> */}
            <Text>
                Input will go here
            </Text>
        </View>
    );
}

function Textbox(props) {
    return(
        <Text key={props.key}>
            This is where a message. {props.key}
        </Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})

export default Conversation;