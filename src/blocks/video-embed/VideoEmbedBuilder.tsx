import React from 'react';
import { BlockConfig } from '../../types/content';

interface VideoEmbedBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const VideoEmbedBuilder: React.FC<VideoEmbedBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL del Video</label>
        <input
          type="url"
          value={block.content.url || ''}
          onChange={(e) => updateContent('url', e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">
          Soporta YouTube y Vimeo
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
        <input
          type="text"
          value={block.content.title || ''}
          onChange={(e) => updateContent('title', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Proporción</label>
        <select
          value={block.content.aspectRatio || '16:9'}
          onChange={(e) => updateContent('aspectRatio', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="16:9">16:9 (Widescreen)</option>
          <option value="4:3">4:3 (Estándar)</option>
        </select>
      </div>
    </div>
  );
};

export default VideoEmbedBuilder;