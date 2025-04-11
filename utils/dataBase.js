const mongo=require('mongodb');

const mongoClient=mongo.MongoClient;
const mongoURL='mongodb+srv://satyam:satyam4755@satyamdb.mebk6.mongodb.net/?retryWrites=true&w=majority&appName=SatyamDB';

// making db for accessing the database in the model section
let _db;
exports.mongoConnect=callback=>{
    mongoClient.connect(mongoURL).then(client=>{
        callback();
        _db=client.db('SatyamDB');//db ka naam jiske naam se server bana hai
    })
    .catch(err=>{
        console.log('Error connecting to MongoDB',err);
    });
}

// now for accessing the db, we will make the method of getDB
exports.getDB=()=>{
    if(!_db){
        throw new Error('Database not found');
    }else{
        return _db;
    }
}