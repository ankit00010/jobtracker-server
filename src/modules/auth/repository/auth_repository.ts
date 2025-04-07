import { prisma } from "../../../config/prismaClient";
import ThrowError from "../../../middleware/error";
import { UserModel } from "../../user/models/user_model";

class AuthRepository {




    static async isUserExists(
        email: string
    ): Promise<UserModel | null> {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user;

    }



    static async createUserData(name: string, email: string, password: string): Promise<UserModel> {
        const user = await prisma.user.create({
            data: { name, email, password },
        });


        if (!user) {
            throw new ThrowError(500, "FAILURE", "Failed to register the user");
        }

        console.log("✅ User created successfully:", user);
        return user;
    }






}


export default AuthRepository;