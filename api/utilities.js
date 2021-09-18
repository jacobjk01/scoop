import firestore from '@react-native-firebase/firestore';

export async function update(collection, id, key, value) {
    try {
        await collection.doc(id)
        .update({
            [key]: value
        })
    } catch(err) {
        console.log(err)
        return false
    }
    return true
}

export async function get(collection, id) {
    return await collection.doc(id).get();
}

//note items must be unique in the array because firebase sucks
//I think you can add multiple items if you use an array for param item
export async function append(collection, id, key, item) {
    return await update(collection, id, key, firestore.FieldValue.arrayUnion(item))
}

//I think you can add multiple items if you use an array for param item
export async function remove(collection, id, key, item) {
    return await update(collection, id, key, firestore.FieldValue.arrayRemove(item))
}

//returns unsubscribe event, https://rnfirebase.io/firestore/usage#realtime-changes
export const onChange = (collection, id) => (cb) => {
    return collection.doc(id).onSnapshot(cb, console.warn)
}
