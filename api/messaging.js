import db from '@react-native-firebase/firestore';
import {update, get, append, onChange} from './utilities';

const Conv = db().collection('conversations');

//creates a Msg collection
/**
 * 
 * @param {string} conversationId 
 * @returns message subcollection in conversation collection
 */
const msg = (conversationId) => {
    return Conv.doc(conversationId).collection('messages');
}

/**
 * 
 * @param {string} conversationId 
 * @returns participant subcollection in conversation collection
 */
const participant = (conversationId) => {
    return Conv.doc(conversationId).collection('participants');
}

export const getConversation = async (conversationId) => {
    const Msg = msg(conversationId);

    Msg.orderBy('date')
    return await get(Conv, conversationId)
}


/**
 * Updates the name of the user
 * @param {array} participants example: ['userIdHere', {profilePicture: 'urlHere', name: 'Bob Ross', userId:'userIdHere'}], if you have the profilePicture, name, userId information already, you should pass in the object version of that user, this will save time
 * @param {string} tourId
 * @returns true if successful, false if not
 */
export const createConversation = async (participants, tourId) => {
    if (!Array.isArray(participants)) {
        throw Error('participants must be an array')
    }
    let validatedParticipants = [];
    //validates participants
    for (let i = 0; i < participants.length; i++) {
        let p = participants[i];
        //if p is a string then it is an id
        if (typeof p === 'string') {
            let user = await get(Conv, p);
            if (!user.exists) {
                throw Error('a userId was passed as a participant id but no user found')
            }
            let {profilePicture, name, userId} = p;
            validatedParticipants.push({profilePicture, name, userId})
        } else if (typeof p === 'object') {
            let {profilePicture, name, userId} = p;
            if (!profilePicture || !name || !userId) {
                throw Error('please specify a profilePicture, name and userId')
            }
            //reduce what is being sent to database, if frontend is being inefficient
            validatedParticipants.push({profilePicture, name, userId})
        } else {
            throw Error('every participant needs to be a valid id or object')
        }
    }

    const newConversation = {
        tourId
    }
    const conversation = await Conv.add(newConversation);
    if (conversation.id) {
        throw Error('ConversationId is null')
    }
    const Participants = participant(conversationId);
    for (let i = 0; i < validatedParticipants.length ; i++) {
        Participants.add(validatedParticipants[i])
        //TODO: add some error if this fails
    }
    return true;
}

export const addUserToConversation = async (conversationId, userId) => {
    
}
//we do not need this function because we are embing the msgs in the model
// const getMessageById = async (ConversationId, messageId) => {
    // return await get(Msg, messageId)
// }

//don't use, use the onConversationChange
const getAllMessages = async (conversationId) => {
    const conversation = await getConversation(conversationId);
    return conversation.messages;
}

//implemented assuming start message would be first message but this may not be possible due to append, append will only add to end
//don't use, use the onConversationChange
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
    const Msg = msg(conversationId);
    const asdf = await Msg.add(verifiedMessage);
    console.log(asdf);
}

/**
 * listens to a conversation for updates
 * @param {*} conversationId 
 * @param {*} cb pass an anyonomous function here
 * @returns unsubscribe function to close subscription
 */
export const onConversationChange = (conversationId, cb) => {
    // return onChange(Conv, id)(cb)
    return msg(conversationId).onSnapshot(cb, console.warn)
}

//this may not be good enough to get the most recent messages, I wonder if notifications can fill this void
export const onConversationChangeWhere = (conversationId, cb) => {
    // return onChange(Conv, id)(cb)
    return msg(conversationId).where('date', '>=', Date()).onSnapshot(cb, console.warn)
}

