
const express=require("express")
const bodyParser=require("body-parser")
const sqlite3=require("sqlite3").verbose()
const app=express()
app.use(bodyParser.json())
app.use(express.static("../frontend"))

const db=new sqlite3.Database("shop.db")

db.run("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT,price INTEGER,image TEXT)")

app.get("/api/products",(req,res)=>{
 db.all("SELECT * FROM products",(e,r)=>res.json(r))
})

app.post("/api/products",(req,res)=>{
 const {name,price,image}=req.body
 db.run("INSERT INTO products(name,price,image) VALUES(?,?,?)",[name,price,image])
 res.json({status:"added"})
})

app.listen(3000,()=>console.log("server running"))
const authRoutes = require("./auth")
app.use("/api/auth", authRoutes)