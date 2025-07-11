import React, { useState, useEffect } from 'react';
import { PostData, BlockConfig, BlockType } from '../../types/content';
import { Plus, Save, Eye, Code, Download, Upload, Trash2, Settings, ArrowLeft, Navigation, Menu, X, Palette, FileUp } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import DynamicBlockEditor from './DynamicBlockEditor';
import BlockPreview from './BlockPreview';
import AddBlockModal from './AddBlockModal';
import MetadataEditor from './MetadataEditor';
import NavigationEditor from './NavigationEditor';
import AssetManager from './AssetManager';
import BrandingEditor from './BrandingEditor';
import ChapterManager from './ChapterManager';
import FloatingAIButton from './FloatingAIButton';
import BlockRegistry from '../../blocks/registry/BlockRegistry';
import { generateUUID } from '../../utils/uuid';
import { ArticleService } from '../../services/ArticleService';

interface BuilderModeProps {
  initialPost: PostData;
  onSave: (post: PostData) => void;
  onExit: () => void;
}

const BuilderMode: React.FC<BuilderModeProps> = ({ initialPost, onSave, onExit }) => {
  const [post, setPost] = useState<PostData>(initialPost);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'json' | 'metadata'>('preview');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [leftSidebarContent, setLeftSidebarContent] = useState<'navigation' | 'chapters' | 'assets' | 'branding'>('navigation');
  const [jsonText, setJsonText] = useState('');
  const registry = BlockRegistry.getInstance();

  useEffect(() => {
    setJsonText(JSON.stringify(post, null, 2));
  }, [post]);

  // Smart UI coordination
  useEffect(() => {
    if (viewMode === 'preview') {
      // En preview mode, mostrar navegación por defecto
      if (!leftSidebarOpen && !rightSidebarOpen) {
        setLeftSidebarOpen(true);
        setLeftSidebarContent('navigation');
      }
      // Si hay un bloque seleccionado, mostrar editor
      if (selectedBlockId && !rightSidebarOpen) {
        setRightSidebarOpen(true);
      }
    } else if (viewMode === 'json') {
      // En JSON mode, ocultar sidebars para más espacio
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    } else if (viewMode === 'metadata') {
      // Metadata se maneja en su propio componente
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  }, [viewMode, selectedBlockId]);

  // Auto-show right sidebar when block is selected
  useEffect(() => {
    if (selectedBlockId && viewMode === 'preview') {
      setRightSidebarOpen(true);
    }
  }, [selectedBlockId, viewMode]);

  const addBlock = (type: BlockType, afterBlockId?: string) => {
    const existingIds = post.blocks.map(b => b.id);
    let newBlock = registry.createDefaultBlock(type);
    
    if (!newBlock) return;
    
    // Generate UUID
    newBlock.id = generateUUID();

    const newBlocks = [...post.blocks];
    if (afterBlockId) {
      const index = newBlocks.findIndex(b => b.id === afterBlockId);
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }

    setPost({ ...post, blocks: newBlocks });
    setSelectedBlockId(newBlock.id);
    setShowAddModal(false);
  };

  const updateBlock = (blockId: string, updates: Partial<BlockConfig>) => {
    // Si se está cambiando el contenido, preservar el ID
    if (updates.content && !updates.id) {
      updates.id = blockId;
    }
    
    setPost({
      ...post,
      blocks: post.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    });
  };

  const deleteBlock = (blockId: string) => {
    setPost({
      ...post,
      blocks: post.blocks.filter(block => block.id !== blockId)
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = [...post.blocks];
    const index = blocks.findIndex(b => b.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    
    setPost({ ...post, blocks });
  };

  const changeBlockType = (blockId: string, newType: string) => {
    const existingIds = post.blocks.map(b => b.id);
    let newBlock = registry.createDefaultBlock(newType as any);
    
    if (!newBlock) return;
    
    // Mantener el ID original
    const currentBlock = post.blocks.find(b => b.id === blockId);
    if (currentBlock) {
      newBlock.id = blockId;
      
      setPost({
        ...post,
        blocks: post.blocks.map(block =>
          block.id === blockId ? newBlock : block
        )
      });
    }
  };

  const handleSave = async () => {
    try {
      await ArticleService.saveArticle(post);
      onSave(post);
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error al guardar el artículo');
    }
  };

  const saveToFile = () => {
    ArticleService.exportToFile(post);
  };

  const loadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    ArticleService.importFromFile(file)
      .then(loadedPost => {
        setPost(loadedPost);
        setSelectedBlockId(null);
      })
      .catch(error => {
        console.error('Error loading file:', error);
        alert('Error al cargar el archivo JSON');
      });
  };

  const updatePost = (updates: Partial<PostData>) => {
    setPost({ ...post, ...updates });
  };

  const updateFromJson = () => {
    try {
      const updatedPost = JSON.parse(jsonText);
      setPost(updatedPost);
      setSelectedBlockId(null);
    } catch (error) {
      alert('JSON inválido');
    }
  };

  // Generate available IDs for dropdowns
  const generateAvailableIds = (currentBlockId: string) => {
    // Con UUIDs, solo devolvemos el ID actual ya que son únicos
    return [currentBlockId];
  };

  const handleAIContentGenerated = (generatedPost: PostData) => {
    setPost(generatedPost);
    setSelectedBlockId(null);
    setViewMode('preview');
    setLeftSidebarOpen(true);
    setLeftSidebarContent(generatedPost.chapters && generatedPost.chapters.length > 0 ? 'chapters' : 'navigation');
  };

  if (viewMode === 'metadata') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MetadataEditor
          article={post}
          onUpdate={updatePost}
          onSave={handleSave}
          onBack={() => setViewMode('preview')}
        />
      </div>
    );
  }

  if (viewMode === 'navigation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('preview')}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Volver
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Editor de Navegación</h1>
            </div>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto p-6">
          <NavigationEditor
            article={post}
            onUpdate={updatePost}
            onSelectBlock={setSelectedBlockId}
            selectedBlockId={selectedBlockId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Builder Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Builder Mode</h1>
            {viewMode === 'preview' && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    leftSidebarOpen ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Toggle Navigation Panel"
                >
                  <Menu className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    rightSidebarOpen ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Toggle Block Editor"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              <button
                onClick={() => {
                  setViewMode('preview');
                  setLeftSidebarOpen(true);
                  setLeftSidebarContent('navigation');
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              <button
                onClick={() => {
                  setViewMode('json');
                  setSelectedBlockId(null);
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'json'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                JSON
              </button>
              <button
                onClick={() => {
                  setViewMode('metadata');
                  setSelectedBlockId(null);
                }}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4 inline mr-1" />
                Metadatos
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onExit}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Lista
            </button>
            
            <input
              type="file"
              accept=".json"
              onChange={loadFromFile}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Cargar
            </label>
            
            <button
              onClick={saveToFile}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </button>
            
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        {leftSidebarOpen && viewMode === 'preview' && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Panel Lateral</h3>
                <button
                  onClick={() => setLeftSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => setLeftSidebarContent(post.chapters && post.chapters.length > 0 ? 'chapters' : 'navigation')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    leftSidebarContent === 'navigation' || leftSidebarContent === 'chapters'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {post.chapters && post.chapters.length > 0 ? (
                    <>
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      Caps
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3 h-3 inline mr-1" />
                      Nav
                    </>
                  )}
                </button>
                <button
                  onClick={() => setLeftSidebarContent('assets')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    leftSidebarContent === 'assets'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileUp className="w-3 h-3 inline mr-1" />
                  Assets
                </button>
                <button
                  onClick={() => setLeftSidebarContent('branding')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    leftSidebarContent === 'branding'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Palette className="w-3 h-3 inline mr-1" />
                  Brand
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              {leftSidebarContent === 'navigation' && (!post.chapters || post.chapters.length === 0) && (
                <NavigationEditor
                  article={post}
                  onUpdate={updatePost}
                  onSelectBlock={setSelectedBlockId}
                  selectedBlockId={selectedBlockId}
                />
              )}
              {leftSidebarContent === 'chapters' && (
                <ChapterManager
                  article={post}
                  onUpdate={updatePost}
                  onSelectPage={(chapterId, pageId) => {
                    // TODO: Implement page selection logic
                    console.log('Selected page:', chapterId, pageId);
                  }}
                />
              )}
              {leftSidebarContent === 'assets' && (
                <AssetManager
                  articleId={post.id}
                  onAssetSelect={(url) => {
                    // Auto-insert URL into selected block if it's an image/video block
                    if (selectedBlockId) {
                      const selectedBlock = post.blocks.find(b => b.id === selectedBlockId);
                      if (selectedBlock) {
                        if (selectedBlock.type === 'image') {
                          updateBlock(selectedBlockId, {
                            content: { ...selectedBlock.content, url }
                          });
                        } else if (selectedBlock.type === 'video-embed') {
                          updateBlock(selectedBlockId, {
                            content: { ...selectedBlock.content, url }
                          });
                        } else if (selectedBlock.type === 'hero-image') {
                          updateBlock(selectedBlockId, {
                            content: { ...selectedBlock.content, imageUrl: url }
                          });
                        }
                      }
                    }
                  }}
                />
              )}
              {leftSidebarContent === 'branding' && (
                <BrandingEditor
                  article={post}
                  onUpdate={updatePost}
                />
              )}
            </div>
          </div>
        )}
        {/* Content Area */}
        <div className={`flex-1 p-6 transition-all duration-200 ${
          viewMode === 'json' ? 'max-w-none' : ''
        }`}>
          {viewMode === 'preview' ? (
            <div className="space-y-4">
              {post.blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`relative group border-2 border-dashed transition-colors ${
                    selectedBlockId === block.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBlockId(block.id)}
                >
                  {/* Block Controls */}
                  <div className="absolute -top-3 left-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      {block.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, 'up');
                      }}
                      disabled={index === 0}
                      className="bg-gray-600 text-white p-1 rounded text-xs disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, 'down');
                      }}
                      disabled={index === post.blocks.length - 1}
                      className="bg-gray-600 text-white p-1 rounded text-xs disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      className="bg-red-600 text-white p-1 rounded text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <BlockPreview block={block} />

                  {/* Add Block Button */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddModal(true);
                        (window as any).addAfterBlockId = block.id;
                      }}
                      className="bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add First Block */}
              {post.blocks.length === 0 && (
                <div className="text-center py-12">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Agregar primer bloque
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Editor JSON</h3>
                <button
                  onClick={updateFromJson}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Aplicar cambios
                </button>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="JSON del post..."
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        {viewMode === 'preview' && rightSidebarOpen && selectedBlockId && (
          <div className="w-80 bg-white border-l border-gray-200">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Editor de Bloque
              </h3>
              <button
                onClick={() => setRightSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const selectedBlock = post.blocks.find(b => b.id === selectedBlockId);
                return selectedBlock ? (
                  <DynamicBlockEditor
                    block={selectedBlock}
                    onUpdate={(updates) => updateBlock(selectedBlockId, updates)}
                    availableIds={generateAvailableIds(selectedBlockId)}
                    onChangeBlockType={(newType) => changeBlockType(selectedBlockId, newType)}
                  />
                ) : null;
              })()}
            </div>
          </div>
        )}
        
        {/* Floating Help Button */}
        {viewMode === 'preview' && !selectedBlockId && !rightSidebarOpen && (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
              <p className="text-sm text-gray-600 mb-2">💡 <strong>Consejo:</strong></p>
              <p className="text-xs text-gray-500">
                Haz clic en cualquier bloque para editarlo, o usa el panel de navegación para moverte por el artículo.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Button */}
      <FloatingAIButton onContentGenerated={handleAIContentGenerated} />

      {/* Add Block Modal */}
      {showAddModal && (
        <AddBlockModal
          onAdd={(type) => {
            const afterBlockId = (window as any).addAfterBlockId;
            addBlock(type, afterBlockId);
            (window as any).addAfterBlockId = undefined;
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default BuilderMode;