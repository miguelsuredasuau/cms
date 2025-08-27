import React, { useState } from 'react';
import { NavigationItem, PostData } from './types/content';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostRenderer from './components/PostRenderer';
import BuilderMode from './components/builder/BuilderMode';
import ArticleList from './components/ArticleList';
import { ArticleService } from './services/ArticleService';
import { generateUUID } from './utils/uuid';

function App() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'article' | 'builder'>('list');
  const [currentArticle, setCurrentArticle] = useState<PostData | null>(null);

  const handleSelectArticle = async (id: string) => {
    try {
      const article = await ArticleService.getArticle(id);
      if (article) {
        setCurrentArticle(article);
        setCurrentView('article');
      }
    } catch (error) {
      console.error('Error loading article:', error);
    }
  };

  const handleCreateNew = async () => {
    try {
      const title = prompt('Título del nuevo artículo:');
      if (!title) return;
      
      const newArticle = await ArticleService.createNewArticle(title);
      setCurrentArticle(newArticle);
      setCurrentView('builder');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleEnterBuilder = () => {
    if (currentArticle) {
      setCurrentView('builder');
    }
  };

  const handleSaveArticle = async (updatedArticle: PostData) => {
    try {
      await ArticleService.saveArticle(updatedArticle);
      setCurrentArticle(updatedArticle);
      setCurrentView('article');
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleExitBuilder = () => {
    if (currentArticle) {
      setCurrentView('article');
    } else {
      setCurrentView('list');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setCurrentArticle(null);
  };

  // Vista de lista de artículos
  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ArticleList 
          onSelectArticle={handleSelectArticle}
          onCreateNew={handleCreateNew}
        />
      </div>
    );
  }

  // Vista del builder
  if (currentView === 'builder' && currentArticle) {
    return (
      <BuilderMode
        initialPost={currentArticle}
        onSave={handleSaveArticle}
        onExit={handleExitBuilder}
      />
    );
  }

  // Vista del artículo
  if (currentView === 'article' && currentArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onEnterBuilder={handleEnterBuilder}
          onBackToList={handleBackToList}
          articleTitle={currentArticle.metadata.title}
          logoUrl={currentArticle.globalBranding?.logoUrl}
          primaryColor={currentArticle.globalBranding?.primaryColor}
        />
        
        <div className="flex max-w-7xl mx-auto">
          <Sidebar 
            article={currentArticle}
            selectedBlockId={selectedBlockId}
            onBlockSelect={setSelectedBlockId}
          />

          <main className="flex-1 min-h-screen">
            <div className="px-6 pb-12">
              <div className="max-w-4xl">
                <PostRenderer 
                  post={currentArticle} 
                  selectedBlockId={selectedBlockId}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Fallback - volver a la lista
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ArticleList 
        onSelectArticle={handleSelectArticle}
  )
  )
  const handleSelectArticle = async (id: string) => {
    try {
      const article = await ArticleService.getArticle(id);
      if (article) {
        setCurrentArticle(article);
        setCurrentView('article');
      }
    } catch (error) {
      console.error('Error loading article:', error);
    }
  };
}

  const handleCreateNew = async () => {
    try {
      const title = prompt('Título del nuevo artículo:');
      if (!title) return;
      
      const newArticle = await ArticleService.createNewArticle(title);
      setCurrentArticle(newArticle);
      setCurrentView('builder');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleEnterBuilder = () => {
    if (currentArticle) {
      setCurrentView('builder');
    }
  };

  const handleSaveArticle = async (updatedArticle: PostData) => {
    try {
      await ArticleService.saveArticle(updatedArticle);
      setCurrentArticle(updatedArticle);
      setCurrentView('article');
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleExitBuilder = () => {
    if (currentArticle) {
      setCurrentView('article');
    } else {
      setCurrentView('list');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setCurrentArticle(null);
  };

  // Vista de lista de artículos
  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ArticleList 
          onSelectArticle={handleSelectArticle}
          onCreateNew={handleCreateNew}
        />
      </div>
    );
  }

  // Vista del builder
  if (currentView === 'builder' && currentArticle) {
    return (
      <BuilderMode
        initialPost={currentArticle}
        onSave={handleSaveArticle}
        onExit={handleExitBuilder}
      />
    );
  }

  // Vista del artículo
  if (currentView === 'article' && currentArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onEnterBuilder={handleEnterBuilder}
          onBackToList={handleBackToList}
          articleTitle={currentArticle.metadata.title}
        />
        
        <div className="flex max-w-7xl mx-auto">
          <Sidebar 
            navigationItems={navigationItems}
            selectedItem={selectedItem}
            onItemSelect={setSelectedItem}
          />

          <main className="flex-1 min-h-screen">
            <div className="px-6 pb-12">
              <div className="max-w-4xl">
                <PostRenderer post={currentArticle} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Fallback - volver a la lista
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ArticleList 
        onSelectArticle={handleSelectArticle}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
}
}
}