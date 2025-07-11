import React from 'react';
import { BlockConfig } from '../../types/content';

interface DividerBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const DividerBuilder: React.FC<DividerBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
        <select
          value={block.content.style || 'solid'}
          onChange={(e) => updateContent('style', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="solid">Sólido</option>
          <option value="dashed">Discontinuo</option>
          <option value="dotted">Punteado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={block.content.color || 'gray'}
          onChange={(e) => updateContent('color', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="gray">Gris</option>
          <option value="blue">Azul</option>
          <option value="purple">Púrpura</option>
          <option value="green">Verde</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Grosor</label>
        <select
          value={block.content.thickness || 'thin'}
          onChange={(e) => updateContent('thickness', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="thin">Delgado</option>
          <option value="medium">Mediano</option>
          <option value="thick">Grueso</option>
        </select>
      </div>
    </div>
  );
};

export default DividerBuilder;