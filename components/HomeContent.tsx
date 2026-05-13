'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MasonryGrid from '@/components/MasonryGrid';
import { Project } from '@/types/project';
import { motion } from 'framer-motion';

export function HomeContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects${category !== 'All' ? `?category=${category}` : ''}`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black text-gray-900 mb-2"
        >
          {category === 'All' ? 'Discover Amazing Projects' : `${category} Projects`}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 max-w-2xl"
        >
          A curated showcase of high-quality work spanning multiple disciplines.
        </motion.p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {projects.length > 0 ? (
            <MasonryGrid projects={projects} />
          ) : (
            <div className="text-center py-24">
              <h2 className="text-2xl font-bold text-gray-400">No projects found in this category.</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}