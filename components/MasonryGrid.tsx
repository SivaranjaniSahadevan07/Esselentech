'use client';

import Masonry from 'react-masonry-css';
import MediaCard from './MediaCard';
import { Project } from '@/types/project';
import { motion } from 'framer-motion';

interface MasonryGridProps {
  projects: Project[];
}

const MasonryGrid = ({ projects }: MasonryGridProps) => {
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-4"
        >
          <MediaCard project={project} />
        </motion.div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
