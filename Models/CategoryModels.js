const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const categorySchema=new Schema({
  nom:{
    type:String,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  produit:{
    type:mongoose.Schema.Types.ObjectId,
      ref:"Produits"
  }


})

module.exports=mongoose.model("Cetgory",categorySchema)