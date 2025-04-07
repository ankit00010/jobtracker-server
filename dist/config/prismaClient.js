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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
const prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient();
exports.prisma = prisma;
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
/**
 * Establishes a connection to the database.
 * Logs success or exits on failure.
 */
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log("✅ Database connected successfully!");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Exit process on failure
    }
});
exports.initializeDatabase = initializeDatabase;
