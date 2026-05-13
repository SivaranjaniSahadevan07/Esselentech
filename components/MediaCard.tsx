'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MediaCardProps {
  project: Project;
}

const MediaCard = ({ project }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={500}
            height={700}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
            <p className="text-white/80 text-sm">{project.category}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MediaCard;
