import db from '@react-native-firebase/firestore';

import { update, get} from './utilities';
import { useLinkBuilder } from '@react-navigation/native';
import {collection, query, orderBy, serverTimestamp} from 'firebase/firestore';

const Feedback = db().collection("feedback");


export const sendFeedback = async(id, topic, message)=>{
    
    if(!(topic && message)){
        //console.log("missing parameter")
        return;
    }
    else{
        
        await Feedback.doc(id).set({
            user: id,
            topic,
            message, 
            timestamp: new Date,
        });
        await Feedback.doc(id).collection("admin").doc().set({
            assigned: "user",
            status: "in progress",
            isArchived: false,
        });
        
    }
    return Feedback;
}

//not tested yet
export const editFeedback = async(id) => {
    await Feedback.doc(id).collection("admin").doc().update({
        status: "complete",
        isArchived: true,
    });
    return Feedback;
}

export const sortFeedback =async()=>{
    //console.log('feedback');
    Feedback.orderBy('timestamp').get().then(doc=>{
        // //console.log(doc.docs.length)
        for(let i = 0; i < doc.docs.length; i++){
            //console.log(i);
            //console.log(doc.docs[i].data());
        }
    
    });
}