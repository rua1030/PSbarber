const express=require("express")
const responsiveApi=require("./router/index")
const cors =require('cors')
const app=express()

app.use(express.json());
app.use(cors())
responsiveApi(app)
app.listen(3001, ()=>{
console.log("Server in line port 3001")
})