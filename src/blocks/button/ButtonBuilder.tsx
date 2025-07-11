import React from 'react';
import { BlockConfig } from '../../types/content';

interface ButtonBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const ButtonBuilder: React.FC<ButtonBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón</label>
        <input
          type="text"
          value={block.content.text || ''}
          onChange={(e) => updateContent('text', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
        <input
          type="url"
          value={block.content.url || ''}
          onChange={(e) => updateContent('url', e.target.value)}
          placeholder="#"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
        <select
          value={block.content.style || 'primary'}
          onChange={(e) => updateContent('style', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="primary">Primario</option>
          <option value="secondary">Secundario</option>
          <option value="outline">Outline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
        <select
          value={block.content.size || 'medium'}
          onChange={(e) => updateContent('size', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
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
    </div>
  );
};

export default ButtonBuilder;