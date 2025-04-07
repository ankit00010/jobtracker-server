import express from "express";
import "dotenv/config";
import user_router from "./modules/user/routes/user_routes";
import { initializeDatabase } from "./config/prismaClient";
import auth_router from "./modules/auth/routes/auth_routes";
import cors from "cors";
import { const_routes } from "./constants/const_routes";
const app = express();

const port = process.env.PORT || 8001;

initializeDatabase();
const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(const_routes)
app.use("/api/auth", auth_router);
app.use("/api/users", user_router);

app.listen(port, () => {
    console.log("Server is running on port ", port);
})
