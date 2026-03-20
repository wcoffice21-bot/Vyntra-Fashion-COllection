const express = require("express")
const router = express.Router()
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./db/shop.db")

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT UNIQUE,
password TEXT,
isAdmin INTEGER DEFAULT 0
)
`)

// SIGNUP
router.post("/signup", (req, res) => {
const {name, email, password} = req.body

db.run(
"INSERT INTO users(name,email,password) VALUES(?,?,?)",
[name,email,password],
function(err){
if(err) return res.json({error:"User already exists"})
res.json({success:"Account created"})
})
})

// LOGIN
router.post("/login", (req, res) => {
const {email,password} = req.body

db.get(
"SELECT * FROM users WHERE email=? AND password=?",
[email,password],
(err,row)=>{
if(!row) return res.json({error:"Invalid login"})
res.json({success:"Login success",user:row})
})
})

// FORGOT PASSWORD
router.post("/forgot", (req,res)=>{
const {email} = req.body
res.json({msg:"Password reset link sent (demo)"})
})

// ADMIN LOGIN
router.post("/admin-login",(req,res)=>{
const {email,password}=req.body

db.get(
"SELECT * FROM users WHERE email=? AND password=? AND isAdmin=1",
[email,password],
(err,row)=>{
if(!row) return res.json({error:"Not admin"})
res.json({success:"Admin login success"})
})
})

module.exports = router