import React, { useState, useEffect } from 'react';
import { ArticleMetadata } from '../types/content';
import { ArticleService } from '../services/ArticleService';
import { Plus, Edit, Trash2, Eye, Calendar, Tag, User } from 'lucide-react';

interface ArticleListProps {
  onSelectArticle: (id: string) => void;
  onCreateNew: () => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle, onCreateNew }) => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const articlesList = await ArticleService.getAllArticles();
      setArticles(articlesList);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) {
      try {
        await ArticleService.deleteArticle(id);
        await loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Error al eliminar el artículo');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando artículos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Artículos</h1>
            <p className="text-gray-600 mt-2">Administra y edita tus artículos de Mastering Lovable</p>
          </div>
          <button
            onClick={onCreateNew}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Artículo
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay artículos</h3>
            <p className="text-gray-500 mb-6">Comienza creando tu primer artículo</p>
            <button
              onClick={onCreateNew}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Crear primer artículo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <span className={`w-2 h-2 rounded-full ${article.published ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                    </div>
                  </div>

                  {article.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(article.updatedAt)}
                    </div>
                    {article.tags.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Tag className="w-3 h-3 mr-1" />
                        {article.tags.slice(0, 2).join(', ')}
                        {article.tags.length > 2 && '...'}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => onSelectArticle(article.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectArticle(article.id)}
                        className="text-gray-600 hover:text-gray-700 p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;