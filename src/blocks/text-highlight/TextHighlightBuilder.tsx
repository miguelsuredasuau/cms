import React from 'react';
import { BlockConfig } from '../../types/content';

interface TextHighlightBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const TextHighlightBuilder: React.FC<TextHighlightBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
        <select
          onChange={(e) => {
            const style = e.target.value;
            const styles = {
              yellow: {
                backgroundColor: 'bg-yellow-100',
                textColor: 'text-yellow-800',
                borderColor: 'border-yellow-200'
              },
              blue: {
                backgroundColor: 'bg-blue-100',
                textColor: 'text-blue-800',
                borderColor: 'border-blue-200'
              },
              green: {
                backgroundColor: 'bg-green-100',
                textColor: 'text-green-800',
                borderColor: 'border-green-200'
              },
              red: {
                backgroundColor: 'bg-red-100',
                textColor: 'text-red-800',
                borderColor: 'border-red-200'
              }
            };
            const selectedStyle = styles[style as keyof typeof styles];
            if (selectedStyle) {
              onUpdate({ content: { ...block.content, ...selectedStyle } });
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="yellow">Amarillo</option>
          <option value="blue">Azul</option>
          <option value="green">Verde</option>
          <option value="red">Rojo</option>
        </select>
      </div>
    </div>
  );
};

export default TextHighlightBuilder;