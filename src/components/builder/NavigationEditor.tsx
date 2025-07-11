import React, { useState } from 'react';
import { PostData, BlockConfig } from '../../types/content';
import { Navigation, Plus, Edit, Trash2, GripVertical, Eye } from 'lucide-react';

interface NavigationEditorProps {
  article: PostData;
  onUpdate: (updates: Partial<PostData>) => void;
  onSelectBlock: (blockId: string) => void;
  selectedBlockId: string | null;
}

const NavigationEditor: React.FC<NavigationEditorProps> = ({ 
  article, 
  onUpdate, 
  onSelectBlock,
  selectedBlockId 
}) => {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // Obtener bloques que forman la navegación
  const getNavigationBlocks = () => {
    return article.blocks.filter(block => 
      block.type === 'hero' || block.type === 'header1' || block.type === 'header2'
    );
  };

  const updateBlockContent = (blockId: string, content: any) => {
    const updatedBlocks = article.blocks.map(block =>
      block.id === blockId ? { ...block, content: { ...block.content, ...content } } : block
    );
    onUpdate({ blocks: updatedBlocks });
    setEditingBlockId(null);
  };

  const deleteBlock = (blockId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento de navegación?')) {
      const updatedBlocks = article.blocks.filter(block => block.id !== blockId);
      onUpdate({ blocks: updatedBlocks });
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = [...article.blocks];
    const index = blocks.findIndex(b => b.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    
    onUpdate({ blocks });
  };

  const getBlockTitle = (block: BlockConfig) => {
    switch (block.type) {
      case 'hero':
        return block.content.title || 'Hero sin título';
      case 'header1':
      case 'header2':
        return block.content.text || 'Header sin título';
      default:
        return 'Bloque sin título';
    }
  };

  const getBlockIcon = (block: BlockConfig) => {
    switch (block.type) {
      case 'hero':
        return '🎯';
      case 'header1':
        return '1️⃣';
      case 'header2':
        return '2️⃣';
      default:
        return '📄';
    }
  };

  const navigationBlocks = getNavigationBlocks();

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Navigation className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Navegación
          </h3>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="font-medium mb-1">💡 Elementos de navegación:</p>
          <ul className="text-xs space-y-1">
            <li>• <strong>Hero:</strong> Crea títulos de fase</li>
            <li>• <strong>Header1:</strong> Elementos principales</li>
            <li>• <strong>Header2:</strong> Subelementos</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {navigationBlocks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Navigation className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No hay elementos de navegación</p>
            <p className="text-xs">Agrega bloques Hero, Header1 o Header2 para crear la navegación</p>
          </div>
        ) : (
          <div className="space-y-2">
            {navigationBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`border rounded-lg p-3 transition-colors ${
                  selectedBlockId === block.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    <span className="text-lg">{getBlockIcon(block)}</span>
                  
                    {editingBlockId === block.id ? (
                      <input
                        type="text"
                        value={getBlockTitle(block)}
                        onChange={(e) => {
                          const content = block.type === 'hero' 
                            ? { title: e.target.value }
                            : { text: e.target.value };
                          updateBlockContent(block.id, content);
                        }}
                        onBlur={() => setEditingBlockId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setEditingBlockId(null);
                          }
                        }}
                        className="flex-1 p-1 border border-gray-300 rounded text-sm"
                        autoFocus
                      />
                    ) : (
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">
                          {getBlockTitle(block)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {block.type} • {block.id.substring(0, 8)}...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onSelectBlock(block.id)}
                      className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      title="Ver en preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  
                    <button
                      onClick={() => setEditingBlockId(block.id)}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Editar título"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col">
                      <button
                        onClick={() => moveBlock(block.id, 'up')}
                        disabled={index === 0}
                        className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Mover arriba"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveBlock(block.id, 'down')}
                        disabled={index === navigationBlocks.length - 1}
                        className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Mover abajo"
                      >
                        ↓
                      </button>
                    </div>

                    <button
                      onClick={() => deleteBlock(block.id)}
                      className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Estadísticas</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Total bloques</div>
            <div className="font-semibold text-gray-900">{article.blocks.length}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Navegación</div>
            <div className="font-semibold text-gray-900">{navigationBlocks.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationEditor;