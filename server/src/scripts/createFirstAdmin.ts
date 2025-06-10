import mongoose from "mongoose";
import User from "../models/User";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const createFirstAdmin = async (): Promise<void> => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI!);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists");
      process.exit(0);
    }

    // Create first admin
    const admin = new User({
      name: "Admin User",
      email: "admin@devenv.com",
      password: "admin123456", // Change this password!
      role: "admin" as const,
    });

    await admin.save();
    console.log("✅ First admin created successfully!");
    console.log("📧 Email: admin@example.com");
    console.log("🔑 Password: admin123456");
    console.log(
      "⚠️  IMPORTANT: Please change this password after first login!"
    );
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createFirstAdmin();
