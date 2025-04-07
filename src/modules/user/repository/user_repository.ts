import { prisma } from "../../../config/prismaClient";
import ThrowError from "../../../middleware/error";
import { JobType, UpdateJob, UserModel } from "../models/user_model";

class UserRepository {




    static async addJobs(
        data: JobType,
        userId: string
    ): Promise<any> {

        return prisma.jOBS.create({
            data: {
                title: data.title,
                company: data.company,
                status: data.status,
                jobType: data.jobType,
                date: new Date(data.date),
                salary: data.salary ?? "",
                appliedSite: data.appliedSite,
                location: data.location,
                contactInfo: data.contactInfo ?? "",
                userId,
            }
        })

    }






    static async getUsersJobsList(
        paginationData: {
            page: number,
            limit: number,
            skip: number,
            status?: string,
            jobType?: string
        },
        userID: string
    ): Promise<any> {

        console.log("pagiationdata=>", paginationData);

        const userExists = await prisma.user.findUnique({
            where:
            {
                id: userID

            }
        })
        //If user does not exists
        if (!userExists) {
            throw new ThrowError(400, "NOT_FOUND", "User Does not exists");
        }
        let query = {};

        if (paginationData.status && !paginationData.jobType) {
            query = {
                userId: userID,
                status: paginationData.status
            }
        } else if (paginationData.jobType && !paginationData.status) {

            query = {
                userId: userID,
                jobType: paginationData.jobType
            }
        }
        else if (paginationData.status && paginationData.jobType) {
            query = {
                userId: userID,
                status: paginationData.status,
                jobType: paginationData.jobType
            }
        } else {
            query = {
                userId: userID
            }
        }

        console.log("Query =>", query);


        const getUsersList = await prisma.jOBS.findMany({
            where: query,
            skip: paginationData.skip,
            take: paginationData.limit,
            orderBy: {
                createdAt: 'desc',
            },

        })


        const jobsAppliedCount = await prisma.jOBS.count({
            where: query,
        });

        if (getUsersList.length === 0) {
            throw new ThrowError(404, "NOT_FOUND", "No Data Founded");

        }

        const totalPages = Math.ceil(jobsAppliedCount / paginationData.limit);
        return {
            jobs: getUsersList,
            totalItems: jobsAppliedCount,
            totalPages,
            currentPage: paginationData.page
        };

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////





    static async getJobByIdRepository(
        jobID: string
    ): Promise<JobType> {

        const result = await prisma.jOBS.findUnique({
            where: { id: jobID }
        })


        if (!result) {
            throw new ThrowError(404, "NOT_FOUND", "No Job Found");

        }


        return {
            ...result,
            salary: result.salary ?? undefined,
            contactInfo: result.contactInfo ?? undefined,
        };



    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


    static async updateJobsRepository(
        jobID: string,
        data: Partial<UpdateJob>
    ): Promise<boolean> {

        const isJobExists = await prisma.jOBS.findUnique({
            where: { id: jobID }
        })


        if (!isJobExists) {
            throw new ThrowError(404, "NOT_FOUND", "No Job Found");

        }


        const updated = await prisma.jOBS.update({
            where: { id: jobID },
            data,
        })



        console.log(updated);

        if (!updated) {
            return false
        }


        return true;

    }




    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    static async deleteObject(
        jobID: string
    ): Promise<boolean> {


        const isJobExists = await prisma.jOBS.findUnique({
            where: { id: jobID }
        })


        if (!isJobExists) {
            throw new ThrowError(404, "NOT_FOUND", "No Job Found");
        }


        const deleted = await prisma.jOBS.delete({
            where: { id: jobID }
        });


        if (!deleted) {
            return false;
        }


        return true;


    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////



    static async searchJobRepository(
        searchTerm: string, user_id: string
    ): Promise<any> {

        const searchData = await prisma.jOBS.findMany({
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
            }
            ,
            select: {
                id: true,
                title: true,
                company: true,
            }, take: 10

        })


        return searchData;
    }


}


export default UserRepository;