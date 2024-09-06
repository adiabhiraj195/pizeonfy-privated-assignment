import express from "express";
import morgan from "morgan";
import cors from "cors";
import Router from "./routers";
// import sqlDb from "./db/sql";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use("/", Router);

// sqlDb.sequelize.sync()
//     .then(() => {
//         console.log("Sql database is connected");
//     }).catch((error) => {
//         console.log(error + " couldn't connect");
//     })

export default app;