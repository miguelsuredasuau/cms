import React from 'react';
import { PostData } from '../../types/content';
import { Save, ArrowLeft } from 'lucide-react';

interface MetadataEditorProps {
  article: PostData;
  onUpdate: (updates: Partial<PostData>) => void;
  onSave: () => void;
  onBack: () => void;
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({ 
  article, 
  onUpdate, 
  onSave, 
  onBack 
}) => {
  const updateMetadata = (key: string, value: any) => {
    onUpdate({
      metadata: { ...article.metadata, [key]: value }
    });
  };

  const updateTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    updateMetadata('tags', tags);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Volver
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Metadatos del Artículo</h1>
          </div>
          <button
            onClick={onSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={article.metadata.title}
                onChange={(e) => updateMetadata('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={article.metadata.description}
                onChange={(e) => updateMetadata('description', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                value={article.metadata.author}
                onChange={(e) => updateMetadata('author', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (separados por comas)
              </label>
              <input
                type="text"
                value={article.metadata.tags.join(', ')}
                onChange={(e) => updateTags(e.target.value)}
                placeholder="react, tutorial, desarrollo"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orden
              </label>
              <input
                type="number"
                value={article.metadata.order}
                onChange={(e) => updateMetadata('order', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={article.metadata.published}
                onChange={(e) => updateMetadata('published', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publicado
              </label>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>ID:</strong> {article.id}</p>
              <p><strong>Creado:</strong> {new Date(article.metadata.createdAt).toLocaleString('es-ES')}</p>
              <p><strong>Actualizado:</strong> {new Date(article.metadata.updatedAt).toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataEditor;