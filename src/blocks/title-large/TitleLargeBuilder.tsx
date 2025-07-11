import React from 'react';
import { BlockConfig } from '../../types/content';

interface TitleLargeBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const TitleLargeBuilder: React.FC<TitleLargeBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Alineación</label>
        <select
          value={block.content.alignment || 'center'}
          onChange={(e) => updateContent('alignment', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={block.content.color || 'text-gray-900'}
          onChange={(e) => updateContent('color', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="text-gray-900">Negro</option>
          <option value="text-blue-600">Azul</option>
          <option value="text-purple-600">Púrpura</option>
          <option value="text-green-600">Verde</option>
          <option value="text-red-600">Rojo</option>
        </select>
      </div>
    </div>
  );
};

export default TitleLargeBuilder;