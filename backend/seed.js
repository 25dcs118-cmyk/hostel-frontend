import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();

    const adminPassword = await bcrypt.hash("admin123", 10);
    const tenantPassword = await bcrypt.hash("tenant123", 10);

    await User.create([
  {
    username: "admin",
    email: "admin@mail.com",
    password: adminPassword,
    role: "admin"
  },
  {
    username: "tenant",
    email: "tenant@mail.com",
    password: tenantPassword,
    role: "tenant"
  }
]);


    console.log("Users seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
