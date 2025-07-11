import React from 'react';
import { BlockConfig } from '../../types/content';

interface Header2BuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const Header2Builder: React.FC<Header2BuilderProps> = ({ block, onUpdate, availableIds }) => {
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
    </div>
  );
};

export default Header2Builder;