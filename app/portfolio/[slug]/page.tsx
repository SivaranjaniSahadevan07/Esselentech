import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Navbar from '@/components/Navbar';
import SlideshowViewer from '@/components/SlideshowViewer';
import SuggestionSidebar from '@/components/SuggestionSidebar';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const project = await Project.findOne({ slug });
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  await dbConnect();
  const project = await Project.findOne({ slug });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <SlideshowViewer media={JSON.parse(JSON.stringify(project.media))} />
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-black text-gray-900">{project.title}</h1>
              <div className="prose prose-lg text-gray-600 max-w-none">
                {project.description}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-12">
              <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Project Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-bold text-gray-900">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-bold text-gray-900">{new Date(project.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>

              <SuggestionSidebar 
                currentProjectId={project._id.toString()} 
                category={project.category} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
