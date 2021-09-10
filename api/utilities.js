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
