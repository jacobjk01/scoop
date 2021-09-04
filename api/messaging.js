import db from '@react-native-firebase/firestore';
const Msg = db().collection('messages');
const Conv = db().collection('conversations');

export const GetConversation = async (conversationId) => {
    
}