import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroMinimalBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroMinimalBuilder: React.FC<HeroMinimalBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Color de Fondo</label>
        <select
          value={block.content.backgroundColor || 'bg-gray-50'}
          onChange={(e) => updateContent('backgroundColor', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="bg-gray-50">Gris Claro</option>
          <option value="bg-white">Blanco</option>
          <option value="bg-blue-50">Azul Claro</option>
          <option value="bg-green-50">Verde Claro</option>
          <option value="bg-purple-50">Púrpura Claro</option>
          <option value="bg-yellow-50">Amarillo Claro</option>
        </select>
      </div>
    </div>
  );
};

export default HeroMinimalBuilder;