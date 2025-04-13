import { Profile } from "passport";
import { prisma } from "../../../config/prismaClient";
import ThrowError from "../../../middleware/error";
import { UserModel } from "../../user/models/user_model";

class AuthRepository {




    static async isUserExists(
        email: string
    ): Promise<UserModel> {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new ThrowError(404, "NOT_FOUND", "User Does not exists")
        }
        return user;

    }



    static async createUserData(name: string, email: string, password: string): Promise<UserModel> {



        let user = await prisma.user.findUnique({
            where: { email }
        })



        if (!user) {
            user = await prisma.user.create({
                data: { name, email, password },
            });
        }

        console.log("✅ User created successfully:", user);
        return user;
    }



    static async handleGoogleCheck(profile: Profile): Promise<any> {
        const email = profile.emails?.[0]?.value;




        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleID: profile.id,
                    email: profile.emails?.[0].value || '',
                    name: profile.displayName || '',
                },
            });
        }


        const userData = {
            email: user.email,
            id: user.id,
            isUser: true
        }
        return userData;

    }




}


export default AuthRepository;