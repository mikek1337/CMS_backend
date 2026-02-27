import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import "dotenv/config";
import { db } from "./db"

const origins = [process.env.FRONTEND_URL!]

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql'
  }),
  advanced:{
    useSecureCookies: true,
    defaultCookieAttributes:{
      sameSite: 'none'
    }
  },
  trustedOrigins:[
    ...origins
  ],
  databaseHooks:{
    user:{
      create: {
        after: async (user)=>{
          await db.author.create({
            data:{
              userId: user.id
            }
          })
        }
      }
    }
  },
  emailAndPassword:{
    enabled: true,
  }
})
