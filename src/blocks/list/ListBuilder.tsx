import React from 'react';
import { BlockConfig } from '../../types/content';

interface ListBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const ListBuilder: React.FC<ListBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Elementos</label>
        {(block.content.items || []).map((item: string, index: number) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...block.content.items];
                newItems[index] = e.target.value;
                updateContent('items', newItems);
              }}
              className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
              onClick={() => {
                const newItems = block.content.items.filter((_: any, i: number) => i !== index);
                updateContent('items', newItems);
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => updateContent('items', [...(block.content.items || []), 'Nuevo elemento'])}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Agregar elemento
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
        <select
          value={block.params?.style || 'bullet'}
          onChange={(e) => updateParams('style', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="bullet">Bullets</option>
          <option value="number">Números</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={block.params?.color || 'indigo'}
          onChange={(e) => updateParams('color', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="indigo">Indigo</option>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="gray">Gray</option>
        </select>
      </div>
    </div>
  );
};

export default ListBuilder;