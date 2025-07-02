import multer from "multer";
import { RequestHandler } from "express";

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit
  },
});

// Type-safe exports
export const uploadSingle = (fieldname: string): RequestHandler =>
  upload.single(fieldname) as unknown as RequestHandler;

export default upload;
