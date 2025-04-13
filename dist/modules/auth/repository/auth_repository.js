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
const prismaClient_1 = require("../../../config/prismaClient");
const error_1 = __importDefault(require("../../../middleware/error"));
class AuthRepository {
    static isUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                throw new error_1.default(404, "NOT_FOUND", "User Does not exists");
            }
            return user;
        });
    }
    static createUserData(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield prismaClient_1.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                user = yield prismaClient_1.prisma.user.create({
                    data: { name, email, password },
                });
            }
            console.log("✅ User created successfully:", user);
            return user;
        });
    }
    static handleGoogleCheck(profile) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
            let user = yield prismaClient_1.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                user = yield prismaClient_1.prisma.user.create({
                    data: {
                        googleID: profile.id,
                        email: ((_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0].value) || '',
                        name: profile.displayName || '',
                    },
                });
            }
            const userData = {
                email: user.email,
                id: user.id,
                isUser: true
            };
            return userData;
        });
    }
}
exports.default = AuthRepository;
