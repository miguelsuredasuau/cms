import React from 'react';
import { PostData, BlockConfig } from '../types/content';

interface SidebarProps {
  article: PostData | null;
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ article, selectedBlockId, onBlockSelect }) => {
  if (!article) {
    return (
      <aside className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <div className="text-center text-gray-500">
            No hay artículo seleccionado
          </div>
        </div>
      </aside>
    );
  }

  // Generar navegación basada en los bloques del artículo
  const generateNavigation = (blocks: BlockConfig[]) => {
    const navigation: Array<{
      id: string;
      title: string;
      type: 'phase' | 'item';
      level?: number;
    }> = [];

    let currentPhase = 0;
    let itemCounter = 1;

    blocks.forEach((block) => {
      if (block.type === 'hero') {
        currentPhase++;
        navigation.push({
          id: block.id,
          title: block.content.title || `Phase ${currentPhase}`,
          type: 'phase'
        });
        itemCounter = 1; // Reset counter for new phase
      } else if (block.type === 'header1') {
        navigation.push({
          id: block.id,
          title: block.content.text || `${itemCounter}. Untitled`,
          type: 'item',
          level: 1
        });
        itemCounter++;
      } else if (block.type === 'header2') {
        navigation.push({
          id: block.id,
          title: block.content.text || `${itemCounter}. Untitled`,
          type: 'item',
          level: 2
        });
        itemCounter++;
      }
    });

    return navigation;
  };

  const navigationItems = generateNavigation(article.blocks);

  const scrollToBlock = (blockId: string) => {
    onBlockSelect(blockId);
    
    // Scroll to the block in the main content
    setTimeout(() => {
      const element = document.querySelector(`[data-block-id="${blockId}"]`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {article.metadata.title}
          </h2>
          {article.metadata.description && (
            <p className="text-sm text-gray-600">
              {article.metadata.description}
            </p>
          )}
        </div>

        <nav className="space-y-2">
          {navigationItems.length === 0 ? (
            <div className="text-sm text-gray-500 italic">
              No hay elementos de navegación.
              <br />
              Agrega bloques Hero, Header1 o Header2 para crear la navegación.
            </div>
          ) : (
            navigationItems.map((item) => (
              <div key={item.id}>
                {item.type === 'phase' ? (
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-6 mb-3 first:mt-0">
                    {item.title}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToBlock(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                      selectedBlockId === item.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    } ${
                      item.level === 2 ? 'ml-4 text-xs' : ''
                    }`}
                  >
                    {item.title}
                  </button>
                )}
              </div>
            ))
          )}
        </nav>

        {/* Información adicional del artículo */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-2">
            <div>
              <span className="font-medium">Autor:</span> {article.metadata.author}
            </div>
            <div>
              <span className="font-medium">Bloques:</span> {article.blocks.length}
            </div>
            {article.metadata.tags.length > 0 && (
              <div>
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {article.metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="font-medium">Actualizado:</span>{' '}
              {new Date(article.metadata.updatedAt).toLocaleDateString('es-ES')}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;