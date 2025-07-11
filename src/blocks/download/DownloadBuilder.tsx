import React from 'react';
import { BlockConfig } from '../../types/content';

interface DownloadBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const DownloadBuilder: React.FC<DownloadBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
        <textarea
          value={block.content.description || ''}
          onChange={(e) => updateContent('description', e.target.value)}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Archivos</label>
        <p className="text-sm text-gray-500 mb-2">
          Funcionalidad de archivos pendiente de implementar
        </p>
      </div>
    </div>
  );
};

export default DownloadBuilder;