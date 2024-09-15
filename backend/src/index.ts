import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
const app = express();

import productRoute from './routes/product'
import mongoose from 'mongoose';
app.use(cors())
app.use(express.json());

app.use("/api/product", productRoute)
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName:"product"
        })
        console.log("Db Connected")
    } catch (error: any) {
        console.log(error.message)
    }
}

app.listen(3000, () => {
    connectDB();
    console.log('server started on port 3000')
});