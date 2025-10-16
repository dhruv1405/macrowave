
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "./app/utils/db"
import User from "./app/model/user.model"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    // Runs when a user signs in
    async signIn({ user }) {
      await connectDB();

      // check if user exists
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // create new user
        await User.create({
            email: user.email,
            name: user.name,
        });
      }
      return true; // allow sign in
    },

    // Attach MongoDB _id to session
    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString(); // attach mongo user id
      }

      return session;
    },
  }
})