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
export async function deleteC(field1, query1, field2, query2) {

    await tours.where(field1, '==', query1).where(field2, '==', query2).get().then(querySnapshot =>{
        querySnapshot.forEach((documentSnapshot) =>
            {
               tours.doc(documentSnapshot.id).delete();
            });
    });
}
