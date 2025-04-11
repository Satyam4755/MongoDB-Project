const { ObjectId } = require("mongodb");
const {getDB}=require("../utils/dataBase");
module.exports=class homes{
    // constructor banyenge jisse pehle check ho sake ki values gyi hai ya nhi \
    // agar values nhi jayengi to error show ho jayega
    constructor(_id,name,type,location,price,imageURL,rating){
        // _id hum isiliye laga rhe hai kyunki data automatically _id me store hota hai DB me
        // isiliye humne _id ko bhi pass kiya hai
        this._id=_id;
        this.name=name;
        this.type=type;
        this.location=location;
        this.price=price;
        this.imageURL=imageURL;
        this.rating=rating;
    }

    // phir ab save() banayenge jisme data save ho rha hoga array me jo controller me ho rha tha kyunki wo controller ka kaam nhi hai data ko retrieve krna. ye kaam models ka hai
    
    save() {
        const db=getDB();
        if(this._id){
            const updatedHome={
                name:this.name,
                type:this.type,
                location:this.location,
                price:this.price,
                imageURL:this.imageURL,
                rating:this.rating
            }
            return db.collection('home')
            .updateOne({_id:new ObjectId(String(this._id))},{$set:updatedHome});
        }else{
            return db.collection('home')
            .insertOne(this).then((result)=>{
            // console.log(result);
            return result;
            }).catch(err=>{
                console.log(err);
            })
        }
        
    }
    static fetch(){
        const db=getDB();
        return db.collection('home').find().toArray().then((homes)=>{
            // console.log(homes);
            return homes;
        }).catch(err=>{
            console.log(err);
        })
    }
    static findById(id){
        const db=getDB();
        return db.collection('home')
        .find({_id:new ObjectId(String(id))})
        .next()
        .then(home=>{
            return home;
        })
        .catch(err=>{
            console.log(err);
        })
    }


// to delete the home
    static deleteHome(id){
        const db=getDB();
        return db.collection('home')
        .deleteOne({_id: new ObjectId(id)})

    }




}


