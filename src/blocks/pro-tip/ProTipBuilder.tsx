import React from 'react';
import { BlockConfig } from '../../types/content';

interface ProTipBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const ProTipBuilder: React.FC<ProTipBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  const updateParams = (key: string, value: any) => {
    onUpdate({
      params: { ...block.params, [key]: value }
    });
  };

  const updateId = (newId: string) => {
    onUpdate({ id: newId });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ID del Bloque</label>
        <select
          value={block.id}
          onChange={(e) => updateId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value={block.id}>{block.id} (actual)</option>
          {availableIds
            .filter(id => id !== block.id)
            .map(id => (
              <option key={id} value={id}>{id}</option>
            ))
          }
        </select>
      </div>

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
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
        <textarea
          value={block.content.text || ''}
          onChange={(e) => updateContent('text', e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Icono</label>
        <select
          value={block.content.icon || 'Lightbulb'}
          onChange={(e) => updateContent('icon', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Lightbulb">Lightbulb</option>
          <option value="Eye">Eye</option>
          <option value="Star">Star</option>
          <option value="Zap">Zap</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={block.params?.color || 'yellow'}
          onChange={(e) => updateParams('color', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
    </div>
  );
};

export default ProTipBuilder;