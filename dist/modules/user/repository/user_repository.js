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
class UserRepository {
    static addJobs(data, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.jOBS.create({
                data: {
                    title: data.title,
                    company: data.company,
                    status: data.status,
                    jobType: data.jobType,
                    date: new Date(data.date),
                    salary: (_a = data.salary) !== null && _a !== void 0 ? _a : "",
                    appliedSite: data.appliedSite,
                    location: data.location,
                    contactInfo: (_b = data.contactInfo) !== null && _b !== void 0 ? _b : "",
                    userId,
                }
            });
        });
    }
    static getUsersJobsList(paginationData, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pagiationdata=>", paginationData);
            const userExists = yield prismaClient_1.prisma.user.findUnique({
                where: {
                    id: userID
                }
            });
            if (!userExists) {
                throw new error_1.default(400, "NOT_FOUND", "User Does not exists");
            }
            let query = {};
            if (paginationData.status && !paginationData.jobType) {
                query = {
                    userId: userID,
                    status: paginationData.status
                };
            }
            else if (paginationData.jobType && !paginationData.status) {
                query = {
                    userId: userID,
                    jobType: paginationData.jobType
                };
            }
            else if (paginationData.status && paginationData.jobType) {
                query = {
                    userId: userID,
                    status: paginationData.status,
                    jobType: paginationData.jobType
                };
            }
            else {
                query = {
                    userId: userID
                };
            }
            console.log("Query =>", query);
            const getUsersList = yield prismaClient_1.prisma.jOBS.findMany({
                where: query,
                skip: paginationData.skip,
                take: paginationData.limit,
                orderBy: {
                    createdAt: 'desc',
                },
            });
            const jobsAppliedCount = yield prismaClient_1.prisma.jOBS.count({
                where: query,
            });
            if (getUsersList.length === 0) {
                throw new error_1.default(404, "NOT_FOUND", "No Data Founded");
            }
            const totalPages = Math.ceil(jobsAppliedCount / paginationData.limit);
            return {
                jobs: getUsersList,
                totalItems: jobsAppliedCount,
                totalPages,
                currentPage: paginationData.page
            };
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static getJobByIdRepository(jobID) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaClient_1.prisma.jOBS.findUnique({
                where: { id: jobID }
            });
            if (!result) {
                throw new error_1.default(404, "NOT_FOUND", "No Job Found");
            }
            return Object.assign(Object.assign({}, result), { salary: (_a = result.salary) !== null && _a !== void 0 ? _a : undefined, contactInfo: (_b = result.contactInfo) !== null && _b !== void 0 ? _b : undefined });
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static updateJobsRepository(jobID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isJobExists = yield prismaClient_1.prisma.jOBS.findUnique({
                where: { id: jobID }
            });
            if (!isJobExists) {
                throw new error_1.default(404, "NOT_FOUND", "No Job Found");
            }
            const updated = yield prismaClient_1.prisma.jOBS.update({
                where: { id: jobID },
                data,
            });
            console.log(updated);
            if (!updated) {
                return false;
            }
            return true;
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static deleteObject(jobID) {
        return __awaiter(this, void 0, void 0, function* () {
            const isJobExists = yield prismaClient_1.prisma.jOBS.findUnique({
                where: { id: jobID }
            });
            if (!isJobExists) {
                throw new error_1.default(404, "NOT_FOUND", "No Job Found");
            }
            const deleted = yield prismaClient_1.prisma.jOBS.delete({
                where: { id: jobID }
            });
            if (!deleted) {
                return false;
            }
            return true;
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    static searchJobRepository(searchTerm, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchData = yield prismaClient_1.prisma.jOBS.findMany({
                where: {
                    userId: user_id,
                    OR: [
                        {
                            title: {
                                contains: searchTerm,
                                mode: "insensitive"
                            }
                        },
                        {
                            company: {
                                contains: searchTerm,
                                mode: "insensitive"
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    company: true,
                }, take: 10
            });
            return searchData;
        });
    }
}
exports.default = UserRepository;
