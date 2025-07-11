import React, { useState } from 'react';
import { BlockConfig } from '../../types/content';
import FileUploadZone from '../../components/builder/FileUploadZone';
import { UploadedFile } from '../../services/FileService';

interface FileUploadExecutorProps {
  config: BlockConfig;
}

const FileUploadExecutor: React.FC<FileUploadExecutorProps> = ({ config }) => {
  const { title, description, acceptedTypes, maxFiles, showPreview } = config.content;
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...files, ...prev]);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      {title && (
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      )}
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      
      <FileUploadZone
        articleId="demo" // En un caso real, esto vendría del contexto
        onFilesUploaded={handleFilesUploaded}
        acceptedTypes={acceptedTypes}
        maxFiles={maxFiles}
      />

      {showPreview && uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">Archivos subidos:</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm">{file.type === 'image' ? '🖼️' : '📄'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadExecutor;