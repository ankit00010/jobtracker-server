import { Request, Response } from "express";
import ThrowError from "../../../middleware/error";
import UserRepository from "../repository/user_repository";
import { UpdateJobSchema } from "../models/user_model";

class UserController {


    static async CreateJOB(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            const userID = req.user?.userId;
            const {
                title,
                company,
                status,
                appliedSite,
                salary,
                jobType,
                date,
                location,
                contactInfo
            } = req.body;

            if (!userID) {
                res.status(403).json({ code: 403, title: "ACCESS_DENIED", message: "No User Id Found" });
                return;
            }

            //Validation 

            const missingFields: string[] = [];

            if (!title) missingFields.push("title");
            if (!company) missingFields.push("company");
            if (!status) missingFields.push("status");
            if (!appliedSite) missingFields.push("appliedSite");
            if (!jobType) missingFields.push("jobType");
            if (!date) missingFields.push("date");
            if (!location) missingFields.push("location");


            if (missingFields.length > 0) {
                return res.status(400).
                    json({ code: 400, title: "VALIDATION_ERROR", message: `Missing required fields : ${missingFields.join(", ")}` })
            }


            const addData = await UserRepository.addJobs(req.body, userID)

            if (!addData) {
                return res.status(500).json("Failed to add the Data");
            }


            return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job Added!" })



        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static async jobList(
        req: Request,
        res: Response
    ): Promise<any> {
        try {


            const { page, limit, status, jobType } = req.query;
            const user_id = req.user?.userId



            if (!user_id) {
                throw new ThrowError(400, "ACCESS_DENIED", "User Id not Found");
            }
            if (!page || !limit) {
                throw new ThrowError(400, "REQUIRED_PARAMETERS", "Missing required query parameters: 'page' and 'limit'.");
            }
            const currentPage = parseInt(page as string, 10);
            const limitAdded = parseInt(limit as string, 10);
            const skip = Math.ceil((currentPage - 1) * limitAdded);

            const paginationData = {
                page: currentPage,
                limit: limitAdded,
                skip,
                status: status as string,
                jobType: jobType as string
            };

            //get list with pagination and filter
            const getList = await UserRepository.getUsersJobsList(paginationData, user_id);

            return res.status(200).json({ code: 200, title: "SUCCESS", message: "GOT IT", getList })
        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    static async getJobById(
        req: Request,
        res: Response
    ): Promise<any> {
        try {

            const userID = req.user?.userId;
            const jobID = req.params.id;


            if (!userID) {
                throw new ThrowError(403, "ACCESS_DENIED", 'Unauthorized');

            }


            if (!jobID) {
                throw new ThrowError(404, "NOT_FOUND", "No id was provided");
            }


            const result = await UserRepository.getJobByIdRepository(jobID);

            console.log(result);

            const data = {
                title: result.title,
                company: result.company,
                status: result.status,
                appliedSite: result.appliedSite,
                jobType: result.jobType,
                date: result.date,
                salary: result.salary ?? null,
                location: result.location,
                contactInfo: result.contactInfo ?? null
            }
            return res.status(200).json({ jobData: data })

        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    static async searchJOB(
        req: Request,
        res: Response
    ): Promise<any> {
        try {

            const { searchTerm } = req.query;
            const userID = req.user?.userId;

            if (!userID) {
                throw new ThrowError(403, "ACCESS_DENIED", 'Unauthorized');
            }

            if (!searchTerm) {
                throw new ThrowError(404, "NOT_SEARCH", "No Data was found to search");
            }



            const result = await UserRepository.searchJobRepository(searchTerm as string,userID);


            return res.status(200).json({ code: 200, title: "SUCCESS", data: result })


        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }







    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static async updateJOB(
        req: Request,
        res: Response
    ): Promise<any> {
        try {

            const userID = req.user?.userId;
            const jobID = req.params.id;

            if (!userID) {
                throw new ThrowError(403, "ACCESS_DENIED", 'Unauthorized');
            }



            const parsed = UpdateJobSchema.safeParse(req.body);

            console.log(parsed.data);


            if (!parsed.success) {
                return res.status(400).json({ code: 400, title: "FAILED", message: parsed.error.errors });
            }


            const result = await UserRepository.updateJobsRepository(jobID, parsed.data);

            if (!result) {
                return res.status(404).json({ code: 404, title: "FAILED", message: "Job was not updated" });
            }


            return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job was Updated Successfully" });


        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static async deleteJOB(
        req: Request,
        res: Response
    ): Promise<any> {
        try {



            const userID = req.user?.userId;
            const jobID = req.params.id;

            if (!userID) {
                throw new ThrowError(403, "ACCESS_DENIED", 'Unauthorized');
            }


            if (!jobID) {
                throw new ThrowError(404, "NOT_FOUND", "Id not found");
            }

            const result = await UserRepository.deleteObject(jobID);


            if (!result) {
                return res.status(404).json({ code: 404, title: "FAILED", message: "Job was not deleted" })

            }

            return res.status(200).json({ code: 200, title: "SUCCESS", message: "Job was Deleted Succesfully" })

        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }


    /////////////////////////////////////////////////
    static async isUserLogin(
        req: Request,
        res: Response
    ): Promise<any> {
        try {


            const userID = req.user?.userId

            if (!userID) {
                throw new ThrowError(403, "ACCESS_DENIED", 'Unauthorized');
            }


           return  res.status(200).json({ code: 200, title: "SUCCESS", message: "User Already Login" });

        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }

}



export default UserController;