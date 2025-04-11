const {getDB}=require("../utils/dataBase");

module.exports=class Favourites{
    constructor (houseId){
        this.houseId=houseId;
    }
    save(){
        const db=getDB();
        return db.collection('favouriteHomes').findOne({houseId:this.houseId}).then(existingFav=>{
            if(existingFav){
                return db.collection('favouriteHomes').deleteOne({houseId:this.houseId})
            }else{
                return db.collection('favouriteHomes').insertOne(this);
            }
        })
    }
    static getFavourite(){
        const db=getDB();
        return db.collection('favouriteHomes').find().toArray().then(favourites=>{
            return favourites;
        }).catch(err=>{
            console.log(err);
        });
    }
    // to unfavourite the home
    static unfavourite(id){
        const db=getDB();
        return db.collection('favouriteHomes').deleteOne({houseId:id});
    }

}