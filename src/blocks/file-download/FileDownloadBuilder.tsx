import React from 'react';
import { BlockConfig } from '../../types/content';

interface FileDownloadBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const FileDownloadBuilder: React.FC<FileDownloadBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Archivo</label>
        <input
          type="text"
          value={block.content.fileName || ''}
          onChange={(e) => updateContent('fileName', e.target.value)}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño del Archivo</label>
        <input
          type="text"
          value={block.content.fileSize || ''}
          onChange={(e) => updateContent('fileSize', e.target.value)}
          placeholder="2.5 MB"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Archivo</label>
        <select
          value={block.content.fileType || 'pdf'}
          onChange={(e) => updateContent('fileType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="pdf">PDF</option>
          <option value="doc">Word</option>
          <option value="jpg">Imagen</option>
          <option value="mp4">Video</option>
          <option value="mp3">Audio</option>
          <option value="zip">Archivo</option>
        </select>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-yellow-800">
          <strong>Nota:</strong> La funcionalidad de subida de archivos se implementará próximamente.
        </p>
      </div>
    </div>
  );
};

export default FileDownloadBuilder;