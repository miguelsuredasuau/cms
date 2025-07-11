import React from 'react';
import { Sparkles, Edit, ArrowLeft, Image, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  onEnterBuilder?: () => void;
  onBackToList?: () => void;
  articleTitle?: string;
  logoUrl?: string;
  primaryColor?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onEnterBuilder, 
  onBackToList, 
  articleTitle, 
  logoUrl, 
  primaryColor = '#6366f1' 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="text-gray-600 hover:text-gray-800 flex items-center mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ 
              background: logoUrl ? 'transparent' : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` 
            }}
          >
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="w-8 h-8 object-contain rounded-lg"
              />
            ) : (
              <BookOpen className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {articleTitle || 'Content Builder'}
            </h1>
            {articleTitle && (
              <p className="text-sm text-gray-500">Editor de Contenido Avanzado</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {onEnterBuilder && (
            <button 
              onClick={onEnterBuilder}
              className="text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center hover:opacity-90"
              style={{ 
                backgroundColor: primaryColor
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Builder Mode
            </button>
          )}
          <button 
            className="text-white px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            <Layers className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <button className="text-gray-500 hover:text-indigo-600 transition-colors">
            Compartir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;