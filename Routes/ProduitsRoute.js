const express = require("express")
const router = express.Router()
const ProduitsModels = require("../Models/ProduitsModels")
const CategoryModels=require("../Models/CategoryModels")
router.post("/Ajouterproduit", async (req, res) => {
    try {
        const existeProduit = await ProduitsModels.findOne({ nom: req.body.nom })
        if (existeProduit) { return res.status(400).json('Cette produit existe déja') }
        else {
            newproduit = new ProduitsModels({...req.body });
          const resultatsave=  await newproduit.save();
          await CategoryModels.findByIdAndUpdate(req.params.id,{$addToSet:{produits:resultatsave._id}},{new:true})
            return res.status(201).json("produit ajouter avec succes ");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Erreur serveur');
    }
})
router.put("/updateproduit/:id", async (req, res) => {
    try {
        const existeProduit = await ProduitsModels.findById(req.params.id)
        if (!existeProduit) {
            res.status(402).json("produit not existe")
        } else {
            await ProduitsModels.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            return res.status(200).json("produit updated avec succes")
        }
    } catch (error) {
        console.log(error);
        console.log("erreur de mise a jour");
    }
})

router.get("/getallproduit", async (req, res) => {
    try {
        const allproduit = await ProduitsModels.find()
        return res.status(200).json(allproduit)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur server")
    }
})

router.get("/getoneproduit/:id", async (req, res) => {
    try {
        const oneProduit = await ProduitsModels.findById(req.params.id)
        return res.status(200).json(oneProduit)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur server")
    }
})

router.delete("/deleteproduit/:id", async (req, res) => {
    try {
        const categorie = await ProduitsModels.findOne({produit: req.params.id})
        await CategoryModels.findByIdAndUpdate({ _id: categorie._id},{$pull:{produit:req.params.id}}) 
        await ProduitsModels.findOneAndDelete({ _id: req.params.id });
  
        return res.status(200).json('La produit a été supprimé')

    } catch (error) {
        console.log(error);
        res.status(500).json('Impossible de supprimer la produit');
    }
})

module.exports = router