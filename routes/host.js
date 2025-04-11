const express=require('express')
const hostRouter=express.Router()
const {addHome,adminHomeList,editHome,postAddHome,PosteditHome,deleteHome}=require('../controller/host')
hostRouter.get('/addHomes',addHome)
hostRouter.get('/admin_HomeList',adminHomeList)

hostRouter.post('/addHomes',postAddHome)
hostRouter.get('/edit_home/:homeId',editHome)
hostRouter.post('/edit_home',PosteditHome)

// for delete
hostRouter.post('/delete_home/:homeId',deleteHome)
exports.hostRouter=hostRouter;
