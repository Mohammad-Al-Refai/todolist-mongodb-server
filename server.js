const express=require("express")
const {addOne,getAll,editOne,deleteOne}=require('./database/db')
const app=express()
const bp=require('body-parser')
const PORT=process.env.PORT||3000
app.use(bp.json())


app.get("/",(req,res)=>{
    getAll(data=>{
        res.send(data)
    })
})


app.post("/add",(req,res)=>{
    const value=req.body.value
    addOne(value,data=>{
        res.send(data)
    })
})
app.put("/update",(req,res)=>{
    console.log(req.body)
    const old_value=req.body.old_value
    const value=req.body.value
    console.log(req.body)
    editOne(old_value,value,data=>{
        res.send(data)
    })
})
app.post("/delete",(req,res)=>{
    const value=req.body.value
    deleteOne(value,data=>{
        res.send(data)
    })
})
app.listen(PORT)

