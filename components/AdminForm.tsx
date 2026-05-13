'use client';

import { useState } from 'react';
import { Project, Media } from '@/types/project';
import { Upload, X, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';

interface AdminFormProps {
  project?: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminForm = ({ project, onSuccess, onCancel }: AdminFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'Design',
    tags: project?.tags.join(', ') || '',
    coverImage: project?.coverImage || '',
  });
  const [media, setMedia] = useState<Media[]>(project?.media || []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedMedia: Media[] = [...media];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();

        if (res.ok) {
          const newMedia: Media = {
            type: file.type.startsWith('video') ? 'video' : 'image',
            url: result.secure_url,
            thumbnail: result.thumbnail_url || result.secure_url,
            width: result.width,
            height: result.height,
          };
          uploadedMedia.push(newMedia);
          
          // Set first uploaded image as cover if none exists
          if (!formData.coverImage && newMedia.type === 'image') {
            setFormData(prev => ({ ...prev, coverImage: newMedia.url }));
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setMedia(uploadedMedia);
    setUploading(false);
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== ''),
      media,
    };

    try {
      const url = project?._id ? `/api/projects/${project._id}` : '/api/projects';
      const method = project?._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
              placeholder="Modern Brand Identity"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Design">Design</option>
              <option value="Photography">Photography</option>
              <option value="Illustration">Illustration</option>
              <option value="Motion">Motion</option>
              <option value="UI/UX">UI/UX</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
              placeholder="minimal, brand, typography"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
              placeholder="Describe the project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Project Media</label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {media.map((m, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                {m.type === 'image' ? (
                  <Image src={m.url} alt="Uploaded" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Video className="text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(i)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                {formData.coverImage === m.url && (
                  <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-bold">
                    Cover
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: m.url })}
                  className="absolute inset-0 z-10 hidden group-hover:block"
                />
              </div>
            ))}
            
            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-red-600 hover:bg-red-50 transition-all group">
              {uploading ? (
                <Loader2 className="animate-spin text-red-600" />
              ) : (
                <>
                  <Upload className="text-gray-400 group-hover:text-red-600 mb-1" />
                  <span className="text-xs font-bold text-gray-400 group-hover:text-red-600">Upload</span>
                </>
              )}
              <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image URL (Auto-set from first upload)</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20"
        >
          {submitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
