import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const HeroBuilder: React.FC<HeroBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Gradiente</label>
        <select
          value={block.content.gradient || 'from-indigo-500 to-purple-500'}
          onChange={(e) => updateContent('gradient', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="from-indigo-500 to-purple-500">Indigo a Purple</option>
          <option value="from-blue-500 to-cyan-500">Blue a Cyan</option>
          <option value="from-purple-500 to-pink-500">Purple a Pink</option>
          <option value="from-green-500 to-blue-500">Green a Blue</option>
          <option value="from-yellow-500 to-red-500">Yellow a Red</option>
          <option value="from-pink-500 to-orange-500">Pink a Orange</option>
        </select>
      </div>
    </div>
  );
};

export default HeroBuilder;