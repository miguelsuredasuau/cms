import React from 'react';
import { BlockConfig } from '../../types/content';

interface ImageBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const ImageBuilder: React.FC<ImageBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen</label>
        <input
          type="url"
          value={block.content.url || ''}
          onChange={(e) => updateContent('url', e.target.value)}
          placeholder="https://images.pexels.com/..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto Alternativo</label>
        <input
          type="text"
          value={block.content.alt || ''}
          onChange={(e) => updateContent('alt', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
        <input
          type="text"
          value={block.content.caption || ''}
          onChange={(e) => updateContent('caption', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
        <select
          value={block.content.size || 'large'}
          onChange={(e) => updateContent('size', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
      </div>
    </div>
  );
};

export default ImageBuilder;