import db from '@react-native-firebase/firestore';
import {update, get, append, onChange} from './utilities';
const Msg = db().collection('messages');
const Conv = db().collection('conversations');

export const getConversation = async (conversationId) => {
    return await get(Conv, conversationId)
}

//we do not need this function because we are embing the msgs in the model
const getMessageById = async (messageId) => {
    return await get(Msg, messageId)
}

export const getAllMessages = async (conversationId) => {
    const conversation = await getConversation(conversationId);
    return conversation.messages;
}

//implemented assuming start message would be first message but this may not be possible due to append, append will only add to end
export const getTheseMessages = async (conversationId, start, number) => {
    const conversation = await getConversation(conversationId);
    return conversation.messages.splice(conversation.messages.length - start - 1, number)
}

//returns if the message was sent or not
export const sendMessage = async (text, conversationId, senderId) => {
    if (!senderId || !text) {
        return false;
    }
    const date = new Date();
    const verifiedMessage = {
        senderId,
        date,
        text
    }
    await append(Conv, conversationId, "messages", verifiedMessage);
}

//personally don't like this
const onConversationChange1 = (id) => {
    return onChange(Conv, id)
}
export const onConversationChange = (id, cb) => {
    return onChange(Conv, id)(cb)
}