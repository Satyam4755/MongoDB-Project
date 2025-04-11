const express=require('express')
const app=express()
const userRouter=require('./routes/user')
const {hostRouter}=require('./routes/host')
const rootPath=require('./utils/rootPath')
const path=require('path')
const {mongoConnect} = require('./utils/dataBase')



app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({extended:true}))
app.use(userRouter);
app.use('/host',hostRouter)
app.use(express.static(path.join(rootPath,'public')))


app.use((req,res)=>{
    res.status(404).render('error',{title:"error"})
})

// adding mongoConnect()
mongoConnect(()=>{
    app.listen(3000,()=>{
        console.log('Server started at port 3000');
    })
})
