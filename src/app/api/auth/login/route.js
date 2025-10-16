import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../../../utils/db";
import User from "../../../model/user.model";
