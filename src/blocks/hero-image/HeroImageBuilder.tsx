import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroImageBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroImageBuilder: React.FC<HeroImageBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
        <input
          type="url"
          value={block.content.imageUrl || ''}
          onChange={(e) => updateContent('imageUrl', e.target.value)}
          placeholder="https://images.pexels.com/..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Overlay</label>
        <select
          value={block.content.overlay || 'dark'}
          onChange={(e) => updateContent('overlay', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="dark">Oscuro</option>
          <option value="light">Claro</option>
          <option value="gradient">Gradiente</option>
        </select>
      </div>
    </div>
  );
};

export default HeroImageBuilder;