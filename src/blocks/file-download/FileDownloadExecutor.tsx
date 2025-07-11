import React from 'react';
import { BlockConfig } from '../../types/content';
import { Download, FileText, Image, Video, Music, Archive } from 'lucide-react';

interface FileDownloadExecutorProps {
  config: BlockConfig;
}

const FileDownloadExecutor: React.FC<FileDownloadExecutorProps> = ({ config }) => {
  const { fileName, fileSize, description, fileType } = config.content;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <Image className="w-8 h-8 text-green-500" />;
      case 'mp4':
      case 'avi':
        return <Video className="w-8 h-8 text-blue-500" />;
      case 'mp3':
      case 'wav':
        return <Music className="w-8 h-8 text-purple-500" />;
      case 'zip':
      case 'rar':
        return <Archive className="w-8 h-8 text-yellow-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getFileIcon(fileType)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{fileName}</h4>
          {description && (
            <p className="text-gray-600 text-sm mb-2">{description}</p>
          )}
          <p className="text-gray-500 text-xs">{fileSize}</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Descargar
        </button>
      </div>
    </div>
  );
};

export default FileDownloadExecutor;