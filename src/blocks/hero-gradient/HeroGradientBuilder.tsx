import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroGradientBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroGradientBuilder: React.FC<HeroGradientBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Gradiente</label>
        <select
          value={block.content.gradient || 'from-blue-600 to-purple-600'}
          onChange={(e) => updateContent('gradient', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="from-blue-600 to-purple-600">Azul a Púrpura</option>
          <option value="from-purple-600 to-pink-600">Púrpura a Rosa</option>
          <option value="from-green-600 to-blue-600">Verde a Azul</option>
          <option value="from-yellow-600 to-red-600">Amarillo a Rojo</option>
          <option value="from-indigo-600 to-cyan-600">Índigo a Cian</option>
          <option value="from-gray-900 to-gray-600">Gris Oscuro</option>
        </select>
      </div>
    </div>
  );
};

export default HeroGradientBuilder;