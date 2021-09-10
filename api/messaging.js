import db from '@react-native-firebase/firestore';
import {update, get} from './utilities';
const Msg = db().collection('messages');
const Conv = db().collection('conversations');

export const getConversation = async (conversationId) => {
    return await get(Conv, conversationId)
}

export const getMessageById = async (messageId) => {
    return await get(Msg, messageId)
}

export const getAllMessages = async (conversationId) => {
    const conversation = await getConversation(conversationId);
    return conversation.messages;
}

export const getTheseMessages = async (conversationId, start, number) => {
    const conversation = await getConversation(conversationId);
    return conversation.messages.splice(start, number)
}

//returns if the message was sent or not
export const sendMessage = async (message, conversationId, senderId) => {
    const {sender, text} = message;
    if (!sender || !text) {
        return false;
    }
    const date = new Date();

}

export const onMessageChange = () => {

}