import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", ()=>{
    console.log("mongoose is connected to db");
});
mongoose.connection.on("error", (err)=>{
    console.log(err);
});

async function startServer(mongo_url: string) {
    await mongoose.connect(mongo_url);
    
    server.listen(PORT, () => {
        console.log(`Server is Live at Port: ${PORT}`)
    });
}

startServer(MONGO_URL as string);