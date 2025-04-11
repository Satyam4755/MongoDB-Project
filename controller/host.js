const { query } = require('express')
const homes=require('../models/homes')

// host
exports.hostPage=(req,res,next)=>{
    res.render('./admin/host',{title:"Host Page"})
}
// add home
exports.addHome=(req,res,next)=>{
    res.render('./admin/editHomes',{editing:false,title:"Add Home details"})
}
// get edit home
exports.editHome=(req,res,next)=>{
    const homeId=req.params.homeId
    const editing=req.query.editing==='true'
    
    homes.findById(homeId).then(home=>{
        res.render('./admin/editHomes',{home:home,editing:editing,title:"Edit Home details"})
    })
        
     
}
// admin_homelist
exports.adminHomeList=(req,res,next)=>{
    homes.fetch().then(registerHomes=>{ //----------registerHomes as a callBack kaam karega fetch() ke liye
        res.render('./admin/admin_homeList',{homes:registerHomes,title:"Admin HomeList Page"})
    })
    
}
exports.postAddHome=(req,res,next)=>{
    const {_id,name,type,location,price,image,rating}=req.body;
    // models ke andar ke class ko yaha call karenge
    const Home=new homes(_id,name,type,location,price,image,rating)
    Home.save().then(()=>{
        console.log('Home added');
    });
    res.redirect('/host/admin_HomeList');
}
// Post edit home
exports.PosteditHome=(req,res,next)=>{
    const {id,name,type,location,price,image,rating}=req.body;
    // models ke andar ke class ko yaha call karenge
    
    const Home=new homes(id,name,type,location,price,image,rating)
    Home.save().then(()=>{
        console.log('Home updated',);
    })
    res.redirect('/host/admin_HomeList')//--------yaha pe UPDATE wala command dalna padega
}

// delete home
exports.deleteHome=(req,res,next)=>{
    const homeId=req.params.homeId
    homes.deleteHome(homeId).then(()=>{
        res.redirect('/host/admin_HomeList')
    })
    
}