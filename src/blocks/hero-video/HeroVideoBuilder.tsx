import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroVideoBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroVideoBuilder: React.FC<HeroVideoBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
        <input
          type="text"
          value={block.content.subtitle || ''}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL del Video</label>
        <input
          type="url"
          value={block.content.videoUrl || ''}
          onChange={(e) => updateContent('videoUrl', e.target.value)}
          placeholder="https://example.com/video.mp4"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={block.content.autoplay || false}
            onChange={(e) => updateContent('autoplay', e.target.checked)}
            className="mr-2"
          />
          Autoplay
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={block.content.muted || false}
            onChange={(e) => updateContent('muted', e.target.checked)}
            className="mr-2"
          />
          Silenciado
        </label>
      </div>
    </div>
  );
};

export default HeroVideoBuilder;