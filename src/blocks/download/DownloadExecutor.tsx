import React from 'react';
import { BlockConfig } from '../../types/content';
import { Download } from 'lucide-react';

interface DownloadExecutorProps {
  config: BlockConfig;
}

const DownloadExecutor: React.FC<DownloadExecutorProps> = ({ config }) => {
  const { title, description, files } = config.content;

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Download className="w-6 h-6 text-indigo-600 mr-3" />
        <h4 className="font-semibold text-indigo-900">{title}</h4>
      </div>
      {description && (
        <p className="text-indigo-700 mb-4">{description}</p>
      )}
      <div className="space-y-2">
        {files.map((file: any, index: number) => (
          <a
            key={index}
            href={file.url}
            download={file.name}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-2 mb-2"
          >
            <Download className="w-4 h-4 mr-2" />
            {file.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadExecutor;