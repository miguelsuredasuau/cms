import { generateUUID } from '../utils/uuid';

export interface UploadedFile {
  id: string;
  name: string;
  originalName: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  articleId: string;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    description?: string;
    alt?: string;
  };
}

export interface FileUploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export class FileService {
  private static readonly STORAGE_PREFIX = 'files-';
  private static readonly FILES_INDEX_KEY = 'files-index';

  // Simulate file upload with progress
  static async uploadFile(
    file: File, 
    articleId: string,
    onProgress?: (progress: FileUploadProgress) => void
  ): Promise<UploadedFile> {
    const fileId = generateUUID();
    const fileType = this.getFileType(file.type);
    
    // Simulate upload progress
    if (onProgress) {
      onProgress({ fileId, progress: 0, status: 'uploading' });
    }

    // Simulate upload delay
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (onProgress) {
        onProgress({ fileId, progress: i, status: 'uploading' });
      }
    }

    // Process file
    if (onProgress) {
      onProgress({ fileId, progress: 100, status: 'processing' });
    }

    const url = URL.createObjectURL(file);
    let thumbnailUrl: string | undefined;
    let metadata: any = {};

    // Generate thumbnail for images
    if (fileType === 'image') {
      thumbnailUrl = await this.generateImageThumbnail(file);
      const dimensions = await this.getImageDimensions(file);
      metadata = { ...dimensions };
    }

    // Get video metadata
    if (fileType === 'video') {
      metadata = await this.getVideoMetadata(file);
    }

    const uploadedFile: UploadedFile = {
      id: fileId,
      name: this.generateFileName(file.name),
      originalName: file.name,
      type: fileType,
      mimeType: file.type,
      size: file.size,
      url,
      thumbnailUrl,
      uploadedAt: new Date().toISOString(),
      articleId,
      metadata
    };

    // Save to storage
    await this.saveFileToStorage(uploadedFile);

    if (onProgress) {
      onProgress({ fileId, progress: 100, status: 'completed' });
    }

    return uploadedFile;
  }

  static async uploadMultipleFiles(
    files: FileList,
    articleId: string,
    onProgress?: (fileId: string, progress: FileUploadProgress) => void
  ): Promise<UploadedFile[]> {
    const uploadPromises = Array.from(files).map(file => 
      this.uploadFile(file, articleId, onProgress ? (progress) => onProgress(progress.fileId, progress) : undefined)
    );

    return Promise.all(uploadPromises);
  }

  static async getFilesByArticle(articleId: string): Promise<UploadedFile[]> {
    try {
      const allFiles = await this.getAllFiles();
      return allFiles.filter(file => file.articleId === articleId);
    } catch (error) {
      console.error('Error getting files by article:', error);
      return [];
    }
  }

  static async getAllFiles(): Promise<UploadedFile[]> {
    try {
      const indexData = localStorage.getItem(this.STORAGE_PREFIX + this.FILES_INDEX_KEY);
      if (!indexData) return [];
      
      const fileIds: string[] = JSON.parse(indexData);
      const files: UploadedFile[] = [];

      for (const fileId of fileIds) {
        const fileData = localStorage.getItem(this.STORAGE_PREFIX + fileId);
        if (fileData) {
          files.push(JSON.parse(fileData));
        }
      }

      return files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    } catch (error) {
      console.error('Error loading files:', error);
      return [];
    }
  }

  static async deleteFile(fileId: string): Promise<void> {
    try {
      // Remove from storage
      localStorage.removeItem(this.STORAGE_PREFIX + fileId);
      
      // Update index
      const indexData = localStorage.getItem(this.STORAGE_PREFIX + this.FILES_INDEX_KEY);
      if (indexData) {
        const fileIds: string[] = JSON.parse(indexData);
        const updatedIds = fileIds.filter(id => id !== fileId);
        localStorage.setItem(this.STORAGE_PREFIX + this.FILES_INDEX_KEY, JSON.stringify(updatedIds));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  static async updateFileMetadata(fileId: string, metadata: Partial<UploadedFile['metadata']>): Promise<void> {
    try {
      const fileData = localStorage.getItem(this.STORAGE_PREFIX + fileId);
      if (fileData) {
        const file: UploadedFile = JSON.parse(fileData);
        file.metadata = { ...file.metadata, ...metadata };
        localStorage.setItem(this.STORAGE_PREFIX + fileId, JSON.stringify(file));
      }
    } catch (error) {
      console.error('Error updating file metadata:', error);
      throw error;
    }
  }

  private static async saveFileToStorage(file: UploadedFile): Promise<void> {
    // Save file data
    localStorage.setItem(this.STORAGE_PREFIX + file.id, JSON.stringify(file));
    
    // Update index
    const indexData = localStorage.getItem(this.STORAGE_PREFIX + this.FILES_INDEX_KEY);
    const fileIds: string[] = indexData ? JSON.parse(indexData) : [];
    
    if (!fileIds.includes(file.id)) {
      fileIds.push(file.id);
      localStorage.setItem(this.STORAGE_PREFIX + this.FILES_INDEX_KEY, JSON.stringify(fileIds));
    }
  }

  private static getFileType(mimeType: string): UploadedFile['type'] {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return 'archive';
    return 'other';
  }

  private static generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    return `${cleanName}_${timestamp}.${extension}`;
  }

  private static async generateImageThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxSize = 200;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  private static async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  private static async getVideoMetadata(file: File): Promise<{ duration?: number; width?: number; height?: number }> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight
        });
      };
      video.src = URL.createObjectURL(file);
    });
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getFileIcon(type: UploadedFile['type']): string {
    const icons = {
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      document: '📄',
      archive: '📦',
      other: '📁'
    };
    return icons[type] || icons.other;
  }

  // Export files data for backup
  static async exportFilesData(): Promise<void> {
    const files = await this.getAllFiles();
    const exportData = {
      files,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `files_backup_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}