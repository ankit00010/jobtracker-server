"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobSchema = void 0;
const zod_1 = require("zod");
;
exports.UpdateJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title cannot be empty').optional(),
    company: zod_1.z.string().min(1, 'Company cannot be empty').optional(),
    status: zod_1.z.string().min(1, 'Status cannot be empty').optional(),
    appliedSite: zod_1.z.string().min(1, 'Applied site cannot be empty').optional(),
    jobType: zod_1.z.string().min(1, 'Job type cannot be empty').optional(),
    date: zod_1.z.string().min(1).transform(val => new Date(val)).optional(),
    salary: zod_1.z.string().min(1, 'Salary cannot be empty').optional(),
    location: zod_1.z.string().min(1, 'Salary cannot be empty').optional(),
    contactInfo: zod_1.z.string().min(1, 'Salary cannot be empty').optional(),
});
