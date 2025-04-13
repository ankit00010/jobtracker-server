"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aut_controller_1 = __importDefault(require("../controller/aut_controller"));
const passport_1 = __importDefault(require("passport"));
const auth_router = (0, express_1.Router)();
auth_router.post('/register', aut_controller_1.default.RegisterUser);
auth_router.post('/login', aut_controller_1.default.loginUser);
auth_router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
auth_router.get('/google/callback', passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/verify-user`, // 👈 redirect on failure
}), aut_controller_1.default.handleGoogleLoginSuccess // 👈 successful login
);
exports.default = auth_router;
