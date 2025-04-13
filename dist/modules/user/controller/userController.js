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
const error_1 = __importDefault(require("../../../middleware/error"));
const user_repository_1 = __importDefault(require("../repository/user_repository"));
const user_model_1 = require("../models/user_model");
class UserController {
    static CreateJOB(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log("did we got the user id", userID);
                const { title, company, status, appliedSite, salary, jobType, date, location, contactInfo } = req.body;
                if (!userID) {
                    res.status(403).json({ code: 403, title: "ACCESS_DENIED", message: "No User Id Found" });
                    return;
                }
                //Validation 
                const missingFields = [];
                if (!title)
                    missingFields.push("title");
                if (!company)
                    missingFields.push("company");
                if (!status)
                    missingFields.push("status");
                if (!appliedSite)
                    missingFields.push("appliedSite");
                if (!jobType)
                    missingFields.push("jobType");
                if (!date)
                    missingFields.push("date");
                if (!location)
                    missingFields.push("location");
                if (missingFields.length > 0) {
                    return res.status(400).
                        json({ code: 400, title: "VALIDATION_ERROR", message: `Missing required fields : ${missingFields.join(", ")}` });
                }
                const addData = yield user_repository_1.default.addJobs(req.body, userID);
                if (!addData) {
                    return res.status(500).json("Failed to add the Data");
                }
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job Added!" });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static jobList(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, status, jobType } = req.query;
                const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log("did we got the user id", user_id);
                if (!user_id) {
                    throw new error_1.default(400, "ACCESS_DENIED", "User Id not Found");
                }
                if (!page || !limit) {
                    throw new error_1.default(400, "REQUIRED_PARAMETERS", "Missing required query parameters: 'page' and 'limit'.");
                }
                const currentPage = parseInt(page, 10);
                const limitAdded = parseInt(limit, 10);
                const skip = Math.ceil((currentPage - 1) * limitAdded);
                const paginationData = {
                    page: currentPage,
                    limit: limitAdded,
                    skip,
                    status: status,
                    jobType: jobType
                };
                //get list with pagination and filter
                const getList = yield user_repository_1.default.getUsersJobsList(paginationData, user_id);
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "GOT IT", getList });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static getJobById(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const jobID = req.params.id;
                if (!userID) {
                    throw new error_1.default(403, "ACCESS_DENIED", 'Unauthorized');
                }
                if (!jobID) {
                    throw new error_1.default(404, "NOT_FOUND", "No id was provided");
                }
                const result = yield user_repository_1.default.getJobByIdRepository(jobID);
                console.log(result);
                const data = {
                    title: result.title,
                    company: result.company,
                    status: result.status,
                    appliedSite: result.appliedSite,
                    jobType: result.jobType,
                    date: result.date,
                    salary: (_b = result.salary) !== null && _b !== void 0 ? _b : null,
                    location: result.location,
                    contactInfo: (_c = result.contactInfo) !== null && _c !== void 0 ? _c : null
                };
                return res.status(200).json({ jobData: data });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static searchJOB(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchTerm } = req.query;
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userID) {
                    throw new error_1.default(403, "ACCESS_DENIED", 'Unauthorized');
                }
                if (!searchTerm) {
                    throw new error_1.default(404, "NOT_SEARCH", "No Data was found to search");
                }
                const result = yield user_repository_1.default.searchJobRepository(searchTerm, userID);
                return res.status(200).json({ code: 200, title: "SUCCESS", data: result });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static updateJOB(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const jobID = req.params.id;
                if (!userID) {
                    throw new error_1.default(403, "ACCESS_DENIED", 'Unauthorized');
                }
                const parsed = user_model_1.UpdateJobSchema.safeParse(req.body);
                console.log(parsed.data);
                if (!parsed.success) {
                    return res.status(400).json({ code: 400, title: "FAILED", message: parsed.error.errors });
                }
                const result = yield user_repository_1.default.updateJobsRepository(jobID, parsed.data);
                if (!result) {
                    return res.status(404).json({ code: 404, title: "FAILED", message: "Job was not updated" });
                }
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job was Updated Successfully" });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static deleteJOB(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const jobID = req.params.id;
                if (!userID) {
                    throw new error_1.default(403, "ACCESS_DENIED", 'Unauthorized');
                }
                if (!jobID) {
                    throw new error_1.default(404, "NOT_FOUND", "Id not found");
                }
                const result = yield user_repository_1.default.deleteObject(jobID);
                if (!result) {
                    return res.status(404).json({ code: 404, title: "FAILED", message: "Job was not deleted" });
                }
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job was Deleted Succesfully" });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    /////////////////////////////////////////////////
    static isUserLogin(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userID) {
                    throw new error_1.default(403, "ACCESS_DENIED", 'Unauthorized');
                }
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "User Already Login" });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
}
exports.default = UserController;
