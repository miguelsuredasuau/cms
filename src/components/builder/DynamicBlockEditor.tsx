import React, { useState } from 'react';
import { BlockConfig } from '../../types/content';
import { Settings, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import BlockRegistry from '../../blocks/registry/BlockRegistry';

interface DynamicBlockEditorProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
  onChangeBlockType?: (newType: string) => void;
}

const DynamicBlockEditor: React.FC<DynamicBlockEditorProps> = ({ 
  block, 
  onUpdate, 
  availableIds,
  onChangeBlockType
}) => {
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const registry = BlockRegistry.getInstance();
  const definition = registry.getDefinition(block.type);
  const allDefinitions = registry.getAllDefinitions();

  if (!definition) {
    return (
      <div className="text-red-500 text-sm">
        Editor no disponible para el tipo de bloque: {block.type}
      </div>
    );
  }

  const BuilderComponent = definition.builder;

  const handleIdChange = (newId: string) => {
    onUpdate({ id: newId });
  };

  const handleTypeChange = (newType: string) => {
    if (onChangeBlockType) {
      onChangeBlockType(newType);
      setShowTypeSelector(false);
    }
  };

  // Agrupar definiciones por categoría
  const groupedDefinitions = allDefinitions.reduce((acc, def) => {
    if (!acc[def.category]) {
      acc[def.category] = [];
    }
    acc[def.category].push(def);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Editar {definition.name}
        </h3>
      </div>

      {/* ID del Bloque */}
      <div className="border-b border-gray-200 pb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ID del Bloque
        </label>
        <div className="relative">
          <input
            type="text"
            value={block.id}
            onChange={(e) => handleIdChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-20"
            placeholder="Ingresa un ID único"
          />
          <button
            onClick={() => {
              const newId = crypto.randomUUID();
              handleIdChange(newId);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
          >
            Nuevo
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Identificador único del bloque (UUID recomendado)
        </p>
      </div>

      {/* Block Type Selector with Enhanced UI */}
      <div className="border-b border-gray-200 pb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Bloque
        </label>
        
        <div className="relative">
          <button
            onClick={() => setShowTypeSelector(!showTypeSelector)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 text-sm">
                  {definition.icon === 'Type' ? '📝' : 
                   definition.icon === 'ImageIcon' ? '🖼️' : 
                   definition.icon === 'Video' ? '🎬' : 
                   definition.icon === 'Palette' ? '🎨' : '📦'}
                </span>
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{definition.name}</div>
                <div className="text-xs text-gray-500">{definition.description}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                {block.type}
              </span>
              {showTypeSelector ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </button>

          {showTypeSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {Object.entries(groupedDefinitions).map(([category, categoryDefinitions]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-200 sticky top-0">
                    {category}
                  </div>
                  {categoryDefinitions.map((def) => (
                    <button
                      key={def.type}
                      onClick={() => handleTypeChange(def.type)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        def.type === block.type ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs">
                              {def.icon === 'Type' ? '📝' : 
                               def.icon === 'ImageIcon' ? '🖼️' : 
                               def.icon === 'Video' ? '🎬' : 
                               def.icon === 'Palette' ? '🎨' : '📦'}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{def.name}</div>
                            <div className="text-xs text-gray-500">{def.description}</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                          {def.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <RefreshCw className="w-3 h-3 mr-1" />
          Cambiar el tipo convertirá el bloque usando la configuración por defecto
        </p>
      </div>

      {/* Editor específico del bloque */}
      <BuilderComponent 
        block={block}
        onUpdate={onUpdate}
        availableIds={availableIds}
      />
    </div>
  );
};

export default DynamicBlockEditor;