import { type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth } from "@/lib/firebase-admin"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        try {
          const firebaseUser = await auth.getUserByEmail(credentials.email)
          const user = await prisma.user.findUnique({
            where: { firebaseId: firebaseUser.uid }
          })

          if (!user) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
            role: user.role as string
          }
        } catch {
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  }
}

