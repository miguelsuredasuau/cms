import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroSplitBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroSplitBuilder: React.FC<HeroSplitBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
        <textarea
          value={block.content.description || ''}
          onChange={(e) => updateContent('description', e.target.value)}
          rows={3}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón</label>
        <input
          type="text"
          value={block.content.buttonText || ''}
          onChange={(e) => updateContent('buttonText', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL del Botón</label>
        <input
          type="url"
          value={block.content.buttonUrl || ''}
          onChange={(e) => updateContent('buttonUrl', e.target.value)}
          placeholder="#"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSplitBuilder;