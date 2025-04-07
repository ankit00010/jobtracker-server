import { z } from "zod";

export interface UserModel {
    id: string;
    name: string;
    email: string;
    password?: string
    createdAt: Date;
}



export interface JobType {
    title: string;
    company: string;
    status: string;
    appliedSite: string;
    jobType: string;
    date: Date;
    location: string;
    salary?: string;
    contactInfo?: string

};



export const UpdateJobSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty').optional(),
    company: z.string().min(1, 'Company cannot be empty').optional(),
    status: z.string().min(1, 'Status cannot be empty').optional(),
    appliedSite: z.string().min(1, 'Applied site cannot be empty').optional(),
    jobType: z.string().min(1, 'Job type cannot be empty').optional(),
    date: z.string().min(1).transform(val => new Date(val)).optional(),
    salary: z.string().min(1, 'Salary cannot be empty').optional(),
    location: z.string().min(1, 'Salary cannot be empty').optional(),
    contactInfo: z.string().min(1, 'Salary cannot be empty').optional(),
})


export type UpdateJob = z.infer<typeof UpdateJobSchema>;