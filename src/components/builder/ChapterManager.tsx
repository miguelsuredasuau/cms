import React, { useState } from 'react';
import { Chapter, Page, PostData } from '../../types/content';
import { Plus, Edit, Trash2, GripVertical, BookOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { generateUUID } from '../../utils/uuid';

interface ChapterManagerProps {
  article: PostData;
  onUpdate: (updates: Partial<PostData>) => void;
  onSelectPage: (chapterId: string, pageId: string) => void;
  selectedChapterId?: string;
  selectedPageId?: string;
}

const ChapterManager: React.FC<ChapterManagerProps> = ({
  article,
  onUpdate,
  onSelectPage,
  selectedChapterId,
  selectedPageId
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: generateUUID(),
      title: 'Nuevo Capítulo',
      description: '',
      order: (article.chapters?.length || 0) + 1,
      pages: []
    };

    onUpdate({
      chapters: [...(article.chapters || []), newChapter]
    });
    setExpandedChapters(prev => new Set([...prev, newChapter.id]));
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    const updatedChapters = (article.chapters || []).map(chapter =>
      chapter.id === chapterId ? { ...chapter, ...updates } : chapter
    );
    onUpdate({ chapters: updatedChapters });
  };

  const deleteChapter = (chapterId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este capítulo?')) return;
    
    const updatedChapters = (article.chapters || []).filter(chapter => chapter.id !== chapterId);
    onUpdate({ chapters: updatedChapters });
  };

  const addPage = (chapterId: string) => {
    const chapter = article.chapters?.find(c => c.id === chapterId);
    if (!chapter) return;

    const newPage: Page = {
      id: generateUUID(),
      title: 'Nueva Página',
      description: '',
      order: chapter.pages.length + 1,
      blocks: []
    };

    updateChapter(chapterId, {
      pages: [...chapter.pages, newPage]
    });
  };

  const updatePage = (chapterId: string, pageId: string, updates: Partial<Page>) => {
    const chapter = article.chapters?.find(c => c.id === chapterId);
    if (!chapter) return;

    const updatedPages = chapter.pages.map(page =>
      page.id === pageId ? { ...page, ...updates } : page
    );

    updateChapter(chapterId, { pages: updatedPages });
  };

  const deletePage = (chapterId: string, pageId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta página?')) return;
    
    const chapter = article.chapters?.find(c => c.id === chapterId);
    if (!chapter) return;

    const updatedPages = chapter.pages.filter(page => page.id !== pageId);
    updateChapter(chapterId, { pages: updatedPages });
  };

  const moveChapter = (chapterId: string, direction: 'up' | 'down') => {
    const chapters = [...(article.chapters || [])];
    const index = chapters.findIndex(c => c.id === chapterId);
    
    if (direction === 'up' && index > 0) {
      [chapters[index], chapters[index - 1]] = [chapters[index - 1], chapters[index]];
    } else if (direction === 'down' && index < chapters.length - 1) {
      [chapters[index], chapters[index + 1]] = [chapters[index + 1], chapters[index]];
    }
    
    // Update order
    chapters.forEach((chapter, idx) => {
      chapter.order = idx + 1;
    });
    
    onUpdate({ chapters });
  };

  const movePage = (chapterId: string, pageId: string, direction: 'up' | 'down') => {
    const chapter = article.chapters?.find(c => c.id === chapterId);
    if (!chapter) return;

    const pages = [...chapter.pages];
    const index = pages.findIndex(p => p.id === pageId);
    
    if (direction === 'up' && index > 0) {
      [pages[index], pages[index - 1]] = [pages[index - 1], pages[index]];
    } else if (direction === 'down' && index < pages.length - 1) {
      [pages[index], pages[index + 1]] = [pages[index + 1], pages[index]];
    }
    
    // Update order
    pages.forEach((page, idx) => {
      page.order = idx + 1;
    });
    
    updateChapter(chapterId, { pages });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Capítulos y Páginas
          </h3>
          <button
            onClick={addChapter}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
            title="Agregar capítulo"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="font-medium mb-1">📚 Estructura de contenido:</p>
          <ul className="text-xs space-y-1">
            <li>• <strong>Capítulos:</strong> Agrupan contenido relacionado</li>
            <li>• <strong>Páginas:</strong> Contienen los bloques de contenido</li>
            <li>• Arrastra para reordenar elementos</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!article.chapters || article.chapters.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No hay capítulos</p>
            <p className="text-xs">Agrega tu primer capítulo para comenzar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {article.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="border border-gray-200 rounded-lg">
                {/* Chapter Header */}
                <div className={`p-3 bg-gray-50 rounded-t-lg ${
                  selectedChapterId === chapter.id ? 'bg-indigo-50 border-indigo-200' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="flex items-center space-x-2"
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                      </button>
                      
                      {editingChapter === chapter.id ? (
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                          onBlur={() => setEditingChapter(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingChapter(null);
                          }}
                          className="flex-1 p-1 border border-gray-300 rounded text-sm"
                          autoFocus
                        />
                      ) : (
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {chapter.title}
                          </div>
                          {chapter.description && (
                            <div className="text-xs text-gray-500 mt-1">
                              {chapter.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => addPage(chapter.id)}
                        className="p-1 text-indigo-600 hover:text-indigo-700 transition-colors"
                        title="Agregar página"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setEditingChapter(chapter.id)}
                        className="p-1 text-gray-600 hover:text-gray-700 transition-colors"
                        title="Editar capítulo"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <div className="flex flex-col">
                        <button
                          onClick={() => moveChapter(chapter.id, 'up')}
                          disabled={chapterIndex === 0}
                          className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Mover arriba"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveChapter(chapter.id, 'down')}
                          disabled={chapterIndex === (article.chapters?.length || 0) - 1}
                          className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Mover abajo"
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        onClick={() => deleteChapter(chapter.id)}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                        title="Eliminar capítulo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pages */}
                {expandedChapters.has(chapter.id) && (
                  <div className="p-3 space-y-2">
                    {chapter.pages.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-xs">No hay páginas en este capítulo</p>
                        <button
                          onClick={() => addPage(chapter.id)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 mt-1"
                        >
                          Agregar primera página
                        </button>
                      </div>
                    ) : (
                      chapter.pages.map((page, pageIndex) => (
                        <div
                          key={page.id}
                          className={`border border-gray-200 rounded p-2 cursor-pointer transition-colors ${
                            selectedPageId === page.id 
                              ? 'border-indigo-500 bg-indigo-50' 
                              : 'hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => onSelectPage(chapter.id, page.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <GripVertical className="w-3 h-3 text-gray-400 cursor-move" />
                              <FileText className="w-3 h-3 text-gray-600" />
                              
                              {editingPage === page.id ? (
                                <input
                                  type="text"
                                  value={page.title}
                                  onChange={(e) => updatePage(chapter.id, page.id, { title: e.target.value })}
                                  onBlur={() => setEditingPage(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') setEditingPage(null);
                                  }}
                                  className="flex-1 p-1 border border-gray-300 rounded text-xs"
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                <div className="flex-1">
                                  <div className="text-xs font-medium text-gray-900">
                                    {page.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {page.blocks.length} bloque(s)
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => setEditingPage(page.id)}
                                className="p-1 text-gray-600 hover:text-gray-700 transition-colors"
                                title="Editar página"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <div className="flex flex-col">
                                <button
                                  onClick={() => movePage(chapter.id, page.id, 'up')}
                                  disabled={pageIndex === 0}
                                  className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                  title="Mover arriba"
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() => movePage(chapter.id, page.id, 'down')}
                                  disabled={pageIndex === chapter.pages.length - 1}
                                  className="p-0.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                  title="Mover abajo"
                                >
                                  ↓
                                </button>
                              </div>
                              <button
                                onClick={() => deletePage(chapter.id, page.id)}
                                className="p-1 text-red-600 hover:text-red-700 transition-colors"
                                title="Eliminar página"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="border-t border-gray-200 p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Estadísticas</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Capítulos</div>
            <div className="font-semibold text-gray-900">{article.chapters?.length || 0}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Páginas</div>
            <div className="font-semibold text-gray-900">
              {article.chapters?.reduce((sum, chapter) => sum + chapter.pages.length, 0) || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterManager;