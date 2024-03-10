const mongoose=require("mongoose")
const databse=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/tp4nodejs")
        console.log("databse connect with succes ");
    } catch (error) {
        console.log(error);
        console.log("data base not connect ");
    }
}
module.exports=databse