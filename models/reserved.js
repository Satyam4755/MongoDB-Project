const { getDB } = require('../utils/dataBase')

module.exports=class Reserve{
    constructor (homeId){
        this.homeId=homeId;
    }
    addReserve(){
        const db=getDB();
        return db.collection('reservedHomes').findOne({homeId:this.homeId}).then(existingReserve=>{
            if(existingReserve){
                return db.collection('reservedHomes').deleteOne({homeId:this.homeId})
            }else{
                return db.collection('reservedHomes').insertOne(this);
            }
        })
    }
    static getReserve(){
        const db=getDB();
        return db.collection('reservedHomes').find().toArray().then(reserved=>{
            return reserved;
        }).catch(err=>{
            console.log(err);
        });
    }
    static cancle(id){
        const db=getDB();
        return db.collection('reservedHomes').deleteOne({homeId:id});
    }
}