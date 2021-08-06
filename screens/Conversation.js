import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import colors from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

function Conversation(props) {
    let {conversation} = props.route.params;
    //if conversation is null, change it to [] so conversation.length doesn't error
    conversation = conversation ? conversation : [];
    const [text, setText] = useState('');
    const [conv, setConv] = useState(conversation);
    const Messages = []
    
    

    for (let i = 0; i < conv.length; i++) {
        let {message, isYou} = conv[i];
        Messages.unshift(Textbox({
            key: i,
            message,
            isYou
        }))
    }
    return (
        <View style={styles.container}>
            <InvertibleScrollView inverted
                ref={ref => { this.scrollView = ref; }}
                onContentSizeChange={() => {
                    this.scrollView.scrollTo({y: 0, animated: true});
                }}
            >
                {Messages}
            </InvertibleScrollView>
            {/* <ScrollView>
                {Messages}
            </ScrollView> */}
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    onChangeText={text => setText(text)}
                    value={text}
                    placeholder='Type a message'
                />
                <TouchableOpacity onPress={() => {
                    // adds a new message to the conversation
                    setConv([...conv, {
                        message: text,
                        isYou: true
                    }])
                    //causes update in dom and textinput clears because of this
                    setText('')
                }}>
                    <Ionicons name='send' size={25} color={colors.primary} style={styles.send}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
/**
 * this is does not officially work like a react component but it basically one
 * @param {*} props 
 * @returns react functional component
 */
function Textbox(props) {
    const {isYou, message, key} = props;
    const stylesCharacter = isYou ? styles.hero : styles.enemy;
    const stylesCharacterText = isYou ? styles.heroText : styles.enemyText;
    return(
        <View style={[styles.textbox, stylesCharacter]}>
            <Text key={key} style={[styles.text, stylesCharacterText]}>
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textbox: {
        borderRadius: 25,
        textAlign: 'center',
        padding:20,
        paddingTop: 13,
        paddingBottom: 13,
        margin: 20,
        marginBottom: 11,
        marginTop: 11,
        maxWidth: '70%',
    },
    text: {
        lineHeight: 20
    },
    hero: {
        backgroundColor: colors.primary,
        alignSelf: 'flex-end'
    },
    heroText: {
        color: colors.white
    },
    enemy: {
        backgroundColor: colors.white,
        alignSelf: 'flex-start',
        shadowColor: colors.grayMed,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -1
        },
        shadowRadius: 6
        
    },
    enemyText: {
        color: colors.black
    },
    inputContainer: {
        backgroundColor: colors.white,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        borderRadius: 25,
        borderColor: colors.white,
        backgroundColor: colors.grayLightBlue
    },
    send: {
    }
})

export default Conversation;