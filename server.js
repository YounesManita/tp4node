const express  = require('express');
const dotenv=require("dotenv")
dotenv.config()
const app=express()
const databseconnect=require("./config/database")
const CategoryRote = require("./Routes/CategoryRoute")
const ProduitRoute = require("./Routes/ProduitsRoute")
databseconnect()

app.use("/category", CategoryRote)
app.use("/produit", ProduitRoute)

app.listen(process.env.port,()=>{console.log(`server is runing at ${process.env.port}`)})