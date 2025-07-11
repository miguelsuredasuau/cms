import React from 'react';
import { BlockConfig } from '../../types/content';

interface QuoteBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const QuoteBuilder: React.FC<QuoteBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texto de la Cita</label>
        <textarea
          value={block.content.text || ''}
          onChange={(e) => updateContent('text', e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
        <input
          type="text"
          value={block.content.author || ''}
          onChange={(e) => updateContent('author', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
        <select
          value={block.content.style || 'modern'}
          onChange={(e) => updateContent('style', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="modern">Moderno</option>
          <option value="classic">Clásico</option>
        </select>
      </div>
    </div>
  );
};

export default QuoteBuilder;