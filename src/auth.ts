// import { MUser } from "./model/User";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "./lib/dbConnect";
// import crypto from "crypto";
// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { NextRequest } from "next/server";
// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Credential is missing");
//         }

//         await dbConnect();

//         const user = await MUser.findOne({ email: credentials.email }).select(
//           "+password"
//         );

//         if (!user) {
//           throw new Error("User not found");
//         }
//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isMatch) {
//           throw new Error("Password does not match");
//         }
//         const sessionToken = crypto.randomBytes(32).toString("hex");
//         user.token = sessionToken;
//         await user.save();
//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           image: user.image,
//           role: user.role,
//           emailVerified: user.emailVerified || null,
//         };
//       },
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID!,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     // }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.image = user.image;
//         token.email = user.email;
//         token.role = user.role ?? "user";
//         token.emailVerified = user.emailVerified ?? null;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.image = token.image;
//         session.user.email = token.email;
//         session.user.role = token.role;
//         session.user.emailVerified = token.emailVerified ?? null;
//       }
//       return session;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? "__Secure-auth.session-token"
//           : "dev-auth.session-token",
//       options: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         path: "/",
//         maxAge: 60 * 60,
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./lib/dbConnect";
import bcrypt from "bcryptjs";
import { MUser } from "./model/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credential is missing");
        }

        await dbConnect();
        const user = await MUser.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error("Password does not match");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // ✅ This is enough for JWT signing
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.email = user.email;
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-auth.session-token"
          : "dev-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60, 
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

export default NextAuth(authOptions);
