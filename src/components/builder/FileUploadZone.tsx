import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, Music, FileText, Archive } from 'lucide-react';
import { FileService, UploadedFile, FileUploadProgress } from '../../services/FileService';

interface FileUploadZoneProps {
  articleId: string;
  onFilesUploaded: (files: UploadedFile[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  className?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  articleId,
  onFilesUploaded,
  acceptedTypes = "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar",
  maxFiles = 10,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, FileUploadProgress>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (files.length > maxFiles) {
      alert(`Solo puedes subir un máximo de ${maxFiles} archivos a la vez.`);
      return;
    }

    setUploading(true);
    
    try {
      const uploadedFiles = await FileService.uploadMultipleFiles(
        files as any,
        articleId,
        (fileId, progress) => {
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
      );

      onFilesUploaded(uploadedFiles);
      
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error al subir los archivos. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-6 h-6 text-green-500" />;
    if (file.type.startsWith('video/')) return <Video className="w-6 h-6 text-blue-500" />;
    if (file.type.startsWith('audio/')) return <Music className="w-6 h-6 text-purple-500" />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText className="w-6 h-6 text-red-500" />;
    if (file.type.includes('zip') || file.type.includes('rar')) return <Archive className="w-6 h-6 text-yellow-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDragOver ? 'bg-indigo-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-8 h-8 ${isDragOver ? 'text-indigo-600' : 'text-gray-400'}`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              {uploading ? 'Subiendo archivos...' : 'Arrastra archivos aquí'}
            </p>
            <p className="text-sm text-gray-500">
              o <span className="text-indigo-600 font-medium">haz clic para seleccionar</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Máximo {maxFiles} archivos • Imágenes, videos, documentos
            </p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Subiendo archivos...</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                    <File className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Archivo {fileId.substring(0, 8)}...
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {progress.status === 'completed' ? 'Completado' : `${progress.progress}%`}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    progress.status === 'completed' ? 'bg-green-500' : 
                    progress.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
              
              {progress.error && (
                <p className="text-xs text-red-600 mt-1">{progress.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;