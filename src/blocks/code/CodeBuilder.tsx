import React from 'react';
import { BlockConfig } from '../../types/content';

interface CodeBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const CodeBuilder: React.FC<CodeBuilderProps> = ({ block, onUpdate, availableIds }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Lenguaje</label>
        <select
          value={block.content.language || 'javascript'}
          onChange={(e) => updateContent('language', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
        <textarea
          value={block.content.code || ''}
          onChange={(e) => updateContent('code', e.target.value)}
          rows={6}
          className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default CodeBuilder;