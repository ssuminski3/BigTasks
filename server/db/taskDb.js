const { ObjectId } = require('mongodb');
const connectToDb = require('./connectToDb');

async function setTaskDone(taskId, userId){
    try{
        const client = await connectToDb();
        const db = client.db("BigTask")
        const collection = db.collection("Tasks")
        const done = collection.findOne({ _id: new ObjectId( taskId )}).done
        await collection.updateOne({ _id: new ObjectId(taskId), userId: userId}, { $set: {done: !done}})
    }catch(e){
        console.error(e)
    }
}

module.exports = { setTaskDone }