import cloudinary from '../config/cloudinary';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

export const uploadImageToCloudinary = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      return next();
    }

    // Verify Cloudinary config before upload
    const config = cloudinary.config();
    console.log('Cloudinary config before upload:', {
      cloud_name: config.cloud_name,
      api_key: config.api_key ? 'SET' : 'NOT SET',
      api_secret: config.api_secret ? 'SET' : 'NOT SET'
    });

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'posts',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { format: 'auto' }
      ]
    });

    // Add the Cloudinary URL to request body
    req.body.imageUrl = uploadResponse.secure_url;
    
    next();
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    console.error('Error details:', {
      message: error.message,
      http_code: error.http_code,
      error: error.error
    });
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'posts',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { format: 'auto' }
      ]
    });

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: uploadResponse.secure_url,
        publicId: uploadResponse.public_id
      }
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
};