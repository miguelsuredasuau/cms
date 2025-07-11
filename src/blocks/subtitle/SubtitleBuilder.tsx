import React from 'react';
import { BlockConfig } from '../../types/content';

interface SubtitleBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const SubtitleBuilder: React.FC<SubtitleBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
        <input
          type="text"
          value={block.content.text || ''}
          onChange={(e) => updateContent('text', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
        <select
          value={block.content.size || 'text-xl'}
          onChange={(e) => updateContent('size', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="text-lg">Grande</option>
          <option value="text-xl">Extra Grande</option>
          <option value="text-2xl">2X Grande</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={block.content.color || 'text-gray-600'}
          onChange={(e) => updateContent('color', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="text-gray-600">Gris</option>
          <option value="text-gray-900">Negro</option>
          <option value="text-blue-600">Azul</option>
          <option value="text-purple-600">Púrpura</option>
        </select>
      </div>
    </div>
  );
};

export default SubtitleBuilder;