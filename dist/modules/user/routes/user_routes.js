"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const check_token_1 = require("../../../config/check_token");
const user_router = (0, express_1.Router)();
user_router.use(check_token_1.AuthMiddleware.authenticateToken);
user_router.use(check_token_1.AuthMiddleware.isUser);
user_router.get("/get-job-list", userController_1.default.jobList);
user_router.get("/get-job-list/:id", userController_1.default.getJobById);
user_router.get("/search", userController_1.default.searchJOB);
user_router.post("/add-job", userController_1.default.CreateJOB);
user_router.patch("/update-job/:id", userController_1.default.updateJOB);
user_router.delete("/delete-job/:id", userController_1.default.deleteJOB);
user_router.get('/is-user-login', userController_1.default.isUserLogin);
exports.default = user_router;
