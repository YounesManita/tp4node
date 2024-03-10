const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ProduitSchema=new Schema({
    nom:{
        type:String,
        required:true
    },
    prix:{
        type:Number,
        required:true
    },
    image: { type:String},
    quantite:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('Produits',ProduitSchema) 