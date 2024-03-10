const mongoose=require("mongoose")
const Schema=mongoose.Schema
const UserSchema=new Schema({
    nom: { type: String, required: true },
    prenom:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{type:String,required:true,
    enum:[ 'admin','user']}
   
})
module.exports=mongoose.model("user",UserSchema) 