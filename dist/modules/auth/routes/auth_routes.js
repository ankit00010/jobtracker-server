"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aut_controller_1 = __importDefault(require("../controller/aut_controller"));
const auth_router = (0, express_1.Router)();
auth_router.post('/register', aut_controller_1.default.RegisterUser);
auth_router.post('/login', aut_controller_1.default.loginUser);
exports.default = auth_router;
