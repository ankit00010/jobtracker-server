"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const user_routes_1 = __importDefault(require("./modules/user/routes/user_routes"));
const prismaClient_1 = require("./config/prismaClient");
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth_routes"));
const cors_1 = __importDefault(require("cors"));
const const_routes_1 = require("./constants/const_routes");
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./config/passport_config");
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
(0, prismaClient_1.initializeDatabase)();
const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
(0, passport_config_1.initializePassport)();
app.use(const_routes_1.const_routes);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.listen(port, () => {
    console.log("Server is running on port ", port);
});
