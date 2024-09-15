import express from 'express';
import Product from '../models/productModel';

const router = express.Router();


interface ProductRequestBody {
    name: string;
    price: number;
    image: string;
}
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({products, sucess: true})
    } catch (error: any) {
        res.status(500).json({message: error.message, sucess: false})
    }
})

router.post("/", async (req, res) =>{
    try {
        const { name, price, image } = req.body
        if(!name || !price || !image) return res.status(400).json({message: "All fields are required", sucess: false})
        const product = await Product.create({ name, price, image })
        res.status(201).json({data: product, sucess: true})
    } catch (error: any) {
        res.status(500).json({message: error.message, sucess: false})
    }
})

router.get("/:id", async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(400).json({message: "Product not found", sucess: false})
        res.status(200).json({data: product, sucess: true})
    } catch (error: any) {
        res.status(500).json({message: error.message, sucess: false})
    }
})

router.put("/:id", async (req, res) =>{
    try {
        const { name, price, image } = req.body
        let updateData= {} as ProductRequestBody
        if(name) updateData.name = name
        if(price) updateData.price = price
        if(image) updateData.image = image

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if(!product) return res.status(400).json({message: "Product not found", sucess: false})
        res.status(200).json({data: product, sucess: true, message: "Product updated sucessfully"})
    } catch (error: any) {
        res.status(500).json({message: error.message, sucess: false})
    }
})


router.delete("/:id", async (req, res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json({message: "Product not found", sucess: true})
        res.status(200).json({message: "Product deleted sucessfully", sucess: true})
    } catch (error: any) {
        res.status(500).json({message: error.message, sucess: false})
    }
})
export default router