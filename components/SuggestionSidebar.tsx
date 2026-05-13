'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface SuggestionSidebarProps {
  currentProjectId: string;
  category: string;
}

const SuggestionSidebar = ({ currentProjectId, category }: SuggestionSidebarProps) => {
  const [suggestions, setSuggestions] = (require('react').useState)([]);

  (require('react').useEffect)(() => {
    fetch(`/api/projects?category=${category}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data.filter((p: Project) => p._id !== currentProjectId).slice(0, 4));
      });
  }, [category, currentProjectId]);

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Related Projects</h3>
      <div className="space-y-4">
        {suggestions.map((project: Project) => (
          <Link key={project._id} href={`/portfolio/${project.slug}`} className="group block">
            <div className="flex space-x-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={project.coverImage} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">{project.title}</h4>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestionSidebar;
