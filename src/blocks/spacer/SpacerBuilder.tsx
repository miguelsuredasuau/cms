import React from 'react';
import { BlockConfig } from '../../types/content';

interface SpacerBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const SpacerBuilder: React.FC<SpacerBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Altura</label>
        <select
          value={block.content.height || 'medium'}
          onChange={(e) => updateContent('height', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="small">Pequeño (16px)</option>
          <option value="medium">Mediano (48px)</option>
          <option value="large">Grande (96px)</option>
          <option value="xlarge">Extra Grande (128px)</option>
        </select>
      </div>
    </div>
  );
};

export default SpacerBuilder;