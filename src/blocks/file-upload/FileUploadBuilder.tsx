import React from 'react';
import { BlockConfig } from '../../types/content';

interface FileUploadBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const FileUploadBuilder: React.FC<FileUploadBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipos Aceptados</label>
        <input
          type="text"
          value={block.content.acceptedTypes || ''}
          onChange={(e) => updateContent('acceptedTypes', e.target.value)}
          placeholder="image/*,video/*,.pdf"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">
          Tipos MIME separados por comas (ej: image/*, .pdf, .doc)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Máximo de Archivos</label>
        <input
          type="number"
          value={block.content.maxFiles || 5}
          onChange={(e) => updateContent('maxFiles', parseInt(e.target.value) || 5)}
          min="1"
          max="20"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showPreview"
          checked={block.content.showPreview || false}
          onChange={(e) => updateContent('showPreview', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="showPreview" className="ml-2 block text-sm text-gray-700">
          Mostrar vista previa de archivos subidos
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>💡 Funcionalidad:</strong>
        </p>
        <ul className="text-xs text-blue-700 mt-1 space-y-1">
          <li>• Arrastrar y soltar archivos</li>
          <li>• Progreso de subida en tiempo real</li>
          <li>• Validación de tipos de archivo</li>
          <li>• Vista previa opcional</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadBuilder;