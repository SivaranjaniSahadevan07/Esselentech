# Pinterest-Style Portfolio Implementation Plan

Build a full-stack portfolio platform with Next.js 15, MongoDB, and Cloudinary.

## User Review Required

> [!IMPORTANT]
> You will need to provide the following environment variables in a `.env.local` file for the application to function:
> - `MONGODB_URI`
> - `CLOUDINARY_CLOUD_NAME`
> - `CLOUDINARY_API_KEY`
> - `CLOUDINARY_API_SECRET`

## Proposed Changes

### Core Infrastructure

#### [NEW] [mongodb.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/lib/mongodb.ts)
- MongoDB connection utility using Mongoose.

#### [NEW] [cloudinary.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/lib/cloudinary.ts)
- Cloudinary configuration and helper functions for server-side uploads.

#### [NEW] [Project.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/models/Project.ts)
- Mongoose schema for the Project model.

#### [NEW] [project.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/types/project.ts)
- TypeScript interfaces for Project and Media objects.

---

### Backend API

#### [NEW] [route.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/api/projects/route.ts)
- GET all projects (with filtering/search) and POST new project.

#### [NEW] [route.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/api/projects/[id]/route.ts)
- GET, PUT, and DELETE specific project.

#### [NEW] [route.ts](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/api/upload/route.ts)
- Endpoint for server-side Cloudinary uploads.

---

### UI Components

#### [NEW] [MasonryGrid.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/components/MasonryGrid.tsx)
- Responsive masonry grid using `react-masonry-css`.

#### [NEW] [MediaCard.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/components/MediaCard.tsx)
- Individual card with hover effects and video preview.

#### [NEW] [SlideshowViewer.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/components/SlideshowViewer.tsx)
- Fullscreen/inline gallery for project details.

#### [NEW] [AdminForm.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/components/AdminForm.tsx)
- Form for creating and editing projects.

#### [NEW] [UploadWidget.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/components/UploadWidget.tsx)
- Integrated media uploader for Cloudinary.

---

### Pages

#### [MODIFY] [page.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/page.tsx)
- Main portfolio landing page with masonry grid and filters.

#### [NEW] [page.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/portfolio/[slug]/page.tsx)
- Detailed project view.

#### [NEW] [page.tsx](file:///d:/SR_07_Files/Pinterest_Style_Portfolio/app/admin/page.tsx)
- Admin dashboard for managing projects.

## Verification Plan

### Automated Tests
- I will verify the API routes using `curl` or by testing them within the app flow.
- I will check for TypeScript errors using `npx tsc`.

### Manual Verification
- Test image/video upload to Cloudinary.
- Verify masonry grid responsiveness on different screen sizes.
- Test CRUD operations from the admin dashboard.
- Verify smooth transitions and hover effects.
