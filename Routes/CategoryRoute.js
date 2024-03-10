const express=require("express")
const router=express.Router()

const CategoryModels = require("../Models/CategoryModels")
router.post("/Ajoutercategory",async(req,res)=>{
    try {
        const existeCategry = await CategoryModels.findOne({nom: req.body.nom}) 
        if (existeCategry) {return res.status(400).json('Cette catégorie existe déja')}
        else{
            newCategory = new CategoryModels({...req.body});
            await newCategory.save();
            return res.status(201).json("categroy ajouter avec succes ");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Erreur serveur');
    }
})
router.put("/updateCategory/:id",async(req,res)=>{
    try {
        const existeCategry=await CategoryModels.findById(req.params.id)
        if(!existeCategry){
            res.status(402).json("category not existe")
        }else{
         await CategoryModels.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
          return res.status(200).json("category updated avec succes")
        }
    } catch (error) {
        console.log(error);
        console.log("erreur de mise a jour");
    }
})

router.get("/getallcategory",async(req,res)=>{
    try {
        const allCategory = await CategoryModels.find().populate("produit")
        return res.status(200).json(allCategory)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur server")
    }
})

router.get("/getonecategory/:id", async (req, res) => {
    try {
        const oneCategory = await CategoryModels.findById(req.params.id).populate("produit")
        return res.status(200).json(oneCategory)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur server")
    }
})

router.delete("/deleteCategory/:id",async(req,res)=>{
    try {
        await CategoryModels.findOneAndDelete({_id : req.params.id});
        return res.status(200).json('La categorie a été supprimé')

    } catch (error) {
        console.log(error);
        res.status(500).json('Impossible de supprimer la catégorie');
    }
})

module.exports=router