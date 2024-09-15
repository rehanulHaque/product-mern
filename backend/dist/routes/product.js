"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productModel_1 = __importDefault(require("../models/productModel"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.status(200).json({ products, sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image } = req.body;
        if (!name || !price || !image)
            return res.status(400).json({ message: "All fields are required", sucess: false });
        const product = yield productModel_1.default.create({ name, price, image });
        res.status(201).json({ data: product, sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findById(req.params.id);
        if (!product)
            return res.status(400).json({ message: "Product not found", sucess: false });
        res.status(200).json({ data: product, sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image } = req.body;
        let updateData = {};
        if (name)
            updateData.name = name;
        if (price)
            updateData.price = price;
        if (image)
            updateData.image = image;
        const product = yield productModel_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product)
            return res.status(400).json({ message: "Product not found", sucess: false });
        res.status(200).json({ data: product, sucess: true, message: "Product updated sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(400).json({ message: "Product not found", sucess: true });
        res.status(200).json({ message: "Product deleted sucessfully", sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
exports.default = router;
