import bcrypt from "bcrypt";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/libs/prismadb';

export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const {email, password} = credentials as {
                    email:string;
                    password:string;
                }
                if(!email || !password){
                    throw new Error('Invalid Credentials.');
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email:email
                    }
                });

                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid Credentials.");
                } 

                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.hashedPassword
                );

                if(!isCorrectPassword) {
                    throw new Error("Invalid Credentials.");
                }

                return user;
            }
        })
    ],
    debug:process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt'
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET
};


export default NextAuth(authOptions);