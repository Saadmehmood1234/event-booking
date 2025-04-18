"use server";
import { MUser } from "@/model/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await dbConnect();
    console.log("My data", data);
    console.log("SAad Mehmood", data.email, data.name, data.password);
    if (!data.name || !data.email || !data.password) {
      return { success: false, message: "All fields are required" };
    }

    const { name, email, password } = data;
    console.log("User email:", email, "User name:", name);

    const existingUser = await MUser.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
      name
    )}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    await MUser.create({
      name,
      email,
      image:profilePicture,
      password: hashedPassword,
      profilePicture,
    });

    return { success: true, message: "Account created successfully" };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { success: false, message: "Server error, please try again" };
  }
};

