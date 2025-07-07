# Post Seeding Guide

This guide explains how to seed your database with dummy posts for the blog application.

## Quick Start (Without Cloudinary)

If you want to quickly seed posts with placeholder images from Unsplash:

```bash
cd server
npm run seed:posts:simple
```

This will create 15 posts with high-quality placeholder images from Unsplash.

## Full Setup (With Cloudinary Image Upload)

To use the full seed script that uploads local images to Cloudinary:

### 1. Set up Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com) and create a free account
2. From your dashboard, note down these credentials:
   - Cloud Name
   - API Key  
   - API Secret

### 2. Configure Environment Variables

Copy the example environment files and configure them:

**Server:**
```bash
cd server
cp .env.example .env.local
```

**Client:**
```bash
cd client
cp .env.example .env.local
```

Then edit `server/.env.local` with your Cloudinary credentials:

```env
# Required for Cloudinary image upload
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Other variables are pre-configured in the example file
```

### 3. Run the Full Seed Script

```bash
cd server
npm run seed:posts
```

This will:
- Upload all 15 images from `client/assets/imgs/` to Cloudinary
- Create posts with the Cloudinary URLs
- Organize images in a `seeded-posts` folder in Cloudinary
- Apply optimizations (resize to 1200x800, auto quality, auto format)

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run seed:posts:simple` | Quick seeding with Unsplash placeholder images |
| `npm run seed:posts` | Full seeding with Cloudinary image upload |

## Post Data Overview

The seed script creates 15 diverse blog posts covering:

- **Technology**: AI, Google, web development, digital marketing
- **News**: Tech trends, iPhone 15, music industry 
- **Lifestyle**: Anger management, audiobooks, photography gear

Each post includes:
- Comprehensive content (500-2000 words)
- Relevant categories and tags
- Random view counts (100-1100)
- Published status
- Associated with a dummy user (`seed@example.com`)

## Troubleshooting

### Missing Cloudinary Credentials
If you see `Must supply api_key` error, ensure your `.env.local` file has the correct Cloudinary credentials.

### Database Connection Issues
Ensure MongoDB is running and the `MONGODB_URI` is correct in your environment variables.

### Image File Not Found
If using the full Cloudinary script, ensure the images exist in `client/assets/imgs/` directory.

## Cloudinary Benefits

Using Cloudinary provides:
- **Automatic optimization**: Images are compressed and served in optimal formats
- **CDN delivery**: Fast global image delivery
- **Transformations**: Automatic resizing and quality optimization
- **Storage management**: Organized folder structure
- **Production ready**: Same workflow as your live application

## Next Steps

After seeding:
1. Start your server: `npm run dev`
2. Test the API endpoints: `GET /api/posts`
3. Check your frontend to see the posts displayed
4. You can now remove the dummy data from `client/data/articles.ts` as requested

## Security Note

Never commit your `.env.local` file to version control. The Cloudinary credentials should be kept secure and only shared with authorized team members.