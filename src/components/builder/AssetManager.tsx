import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image, Video, FileText, Trash2, Copy, ExternalLink, Search, Filter, Grid, List, Download, Edit3, Eye, Music, Archive, File, Plus, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { FileService, UploadedFile, FileUploadProgress } from '../../services/FileService';

interface AssetManagerProps {
  articleId: string;
  onAssetSelect: (url: string) => void;
}

const AssetManager: React.FC<AssetManagerProps> = ({ articleId, onAssetSelect }) => {
  const [assets, setAssets] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, FileUploadProgress>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | UploadedFile['type']>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
  const [editingAsset, setEditingAsset] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAssets();
  }, [articleId]);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const files = await FileService.getFilesByArticle(articleId);
      setAssets(files);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadedFiles = await FileService.uploadMultipleFiles(
        files,
        articleId,
        (fileId, progress) => {
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
      );

      setAssets(prev => [...uploadedFiles, ...prev]);
      
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteAsset = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este archivo?')) return;
    
    try {
      await FileService.deleteFile(id);
      setAssets(prev => prev.filter(asset => asset.id !== id));
      setSelectedAssets(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const updateAssetMetadata = async (assetId: string, metadata: any) => {
    try {
      await FileService.updateFileMetadata(assetId, metadata);
      setAssets(prev => prev.map(asset => 
        asset.id === assetId 
          ? { ...asset, metadata: { ...asset.metadata, ...metadata } }
          : asset
      ));
      setEditingAsset(null);
    } catch (error) {
      console.error('Error updating asset metadata:', error);
    }
  };

  const getAssetIcon = (type: UploadedFile['type'], size: 'small' | 'large' = 'small') => {
    const iconSize = size === 'small' ? 'w-4 h-4' : 'w-6 h-6';
    
    switch (type) {
      case 'image':
        return <Image className={`${iconSize} text-green-500`} />;
      case 'video':
        return <Video className={`${iconSize} text-blue-500`} />;
      case 'audio':
        return <Music className={`${iconSize} text-purple-500`} />;
      case 'document':
        return <FileText className={`${iconSize} text-red-500`} />;
      case 'archive':
        return <Archive className={`${iconSize} text-yellow-500`} />;
      default:
        return <File className={`${iconSize} text-gray-500`} />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.metadata?.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        newSet.add(assetId);
      }
      return newSet;
    });
  };

  const deleteSelectedAssets = async () => {
    if (selectedAssets.size === 0) return;
    if (!window.confirm(`¿Estás seguro de que quieres eliminar ${selectedAssets.size} archivo(s)?`)) return;

    try {
      for (const assetId of selectedAssets) {
        await FileService.deleteFile(assetId);
      }
      setAssets(prev => prev.filter(asset => !selectedAssets.has(asset.id)));
      setSelectedAssets(new Set());
    } catch (error) {
      console.error('Error deleting selected assets:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gestor de Assets</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={`Cambiar a vista ${viewMode === 'grid' ? 'lista' : 'grid'}`}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
            <button
              onClick={() => FileService.exportFilesData()}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Exportar datos de archivos"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {uploading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivos
            </>
          )}
        </button>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="document">Documentos</option>
              <option value="archive">Archivos</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedAssets.size > 0 && (
          <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">
                {selectedAssets.size} archivo(s) seleccionado(s)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={deleteSelectedAssets}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setSelectedAssets(new Set())}
                  className="text-gray-600 hover:text-gray-700 text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Subiendo archivos...</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="mb-2">
              <div className="flex items-center justify-between text-xs text-blue-700 mb-1">
                <span>Archivo {fileId.substring(0, 8)}...</span>
                <span>{progress.progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {assets.length === 0 ? (
              <>
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No hay assets subidos</p>
                <p className="text-xs">Sube archivos para comenzar</p>
              </>
            ) : (
              <>
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No se encontraron archivos</p>
                <p className="text-xs">Intenta con otros términos de búsqueda</p>
              </>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className={`border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
                  selectedAssets.has(asset.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
                onClick={() => toggleAssetSelection(asset.id)}
              >
                <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden relative">
                  {asset.type === 'image' && asset.thumbnailUrl ? (
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.originalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getAssetIcon(asset.type, 'large')}
                    </div>
                  )}
                  
                  {selectedAssets.has(asset.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-900 truncate" title={asset.originalName}>
                    {asset.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {FileService.formatFileSize(asset.size)}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssetSelect(asset.url);
                      }}
                      className="text-indigo-600 hover:text-indigo-700 text-xs"
                    >
                      Usar
                    </button>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(asset.url);
                        }}
                        className="p-1 text-gray-600 hover:text-gray-700"
                        title="Copiar URL"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAsset(asset.id);
                        }}
                        className="p-1 text-gray-600 hover:text-gray-700"
                        title="Editar"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAsset(asset.id);
                        }}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className={`border rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer ${
                  selectedAssets.has(asset.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
                onClick={() => toggleAssetSelection(asset.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getAssetIcon(asset.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {asset.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {FileService.formatFileSize(asset.size)} • {new Date(asset.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {selectedAssets.has(asset.id) && (
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssetSelect(asset.url);
                      }}
                      className="p-1 text-indigo-600 hover:text-indigo-700"
                      title="Usar asset"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(asset.url);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-700"
                      title="Copiar URL"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAsset(asset.id);
                      }}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Editar Asset</h4>
              <button
                onClick={() => setEditingAsset(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {(() => {
              const asset = assets.find(a => a.id === editingAsset);
              if (!asset) return null;
              
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    updateAssetMetadata(asset.id, {
                      description: formData.get('description'),
                      alt: formData.get('alt')
                    });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      defaultValue={asset.metadata?.description || ''}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  {asset.type === 'image' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texto Alternativo
                      </label>
                      <input
                        type="text"
                        name="alt"
                        defaultValue={asset.metadata?.alt || ''}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditingAsset(null)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Total archivos:</span>
            <span className="font-medium">{assets.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Mostrando:</span>
            <span className="font-medium">{filteredAssets.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Tamaño total:</span>
            <span className="font-medium">
              {FileService.formatFileSize(assets.reduce((sum, asset) => sum + asset.size, 0))}
            </span>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            <strong>✨ Características:</strong>
          </p>
          <ul className="text-xs text-green-700 mt-1 space-y-1">
            <li>• Subida múltiple con progreso en tiempo real</li>
            <li>• Miniaturas automáticas para imágenes</li>
            <li>• Metadatos de archivos multimedia</li>
            <li>• Búsqueda y filtrado avanzado</li>
            <li>• Gestión por lotes y exportación</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssetManager;