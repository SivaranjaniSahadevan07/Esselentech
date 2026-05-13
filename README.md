# Pinterest-Style Portfolio Showcase Platform

A modern, full-stack portfolio platform built with Next.js 15, TypeScript, Tailwind CSS, MongoDB, and Cloudinary.

## Features

- **Responsive Masonry Grid**: Pinterest-style layout for showcasing projects.
- **Image & Video Support**: High-quality media management with Cloudinary.
- **Admin Dashboard**: Full CRUD operations for projects without complex auth (for personal use).
- **Project Detail Pages**: Beautiful slideshows and related project suggestions.
- **Premium UI**: Smooth animations with Framer Motion and a clean, modern aesthetic.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Mongoose
- **Database**: MongoDB Atlas
- **Media**: Cloudinary

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Pinterest_Style_Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your credentials:
```env
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and configurations (MongoDB, Cloudinary).
- `models/`: Mongoose schemas.
- `types/`: TypeScript definitions.

## License

MIT
