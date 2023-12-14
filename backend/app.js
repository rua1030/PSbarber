const express=require("express")
const responsiveApi=require("./router/index")
const cors =require('cors')
const app=express()
const cookieParser=require('cookie-parser')

app.use(express.json());

app.use(cors())
app.use(cookieParser())

responsiveApi(app)
app.listen(3001, ()=>{
console.log("Server in line port 3001")
})