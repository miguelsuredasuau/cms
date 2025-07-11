import React, { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';
import AIContentGeneratorModal from './AIContentGeneratorModal';
import { PostData } from '../../types/content';

interface FloatingAIButtonProps {
  onContentGenerated: (post: PostData) => void;
}

const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onContentGenerated }) => {
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerate = (post: PostData) => {
    onContentGenerated(post);
    setShowModal(false);
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Main Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
              isExpanded ? 'rotate-45' : 'hover:scale-110'
            }`}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
            )}
          </button>

          {/* Expanded Menu */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 transform transition-all duration-300 animate-in slide-in-from-bottom-2">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Generador IA</h3>
                <p className="text-sm text-gray-600">Crea contenido automáticamente con inteligencia artificial</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setIsExpanded(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Generar Contenido
                </button>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-xs text-purple-800 font-medium mb-2">✨ Características:</p>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• Genera artículos completos</li>
                    <li>• Crea capítulos y páginas</li>
                    <li>• Usa archivos de referencia</li>
                    <li>• Optimiza para tu audiencia</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Generator Modal */}
      {showModal && (
        <AIContentGeneratorModal
          onGenerate={handleGenerate}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default FloatingAIButton;