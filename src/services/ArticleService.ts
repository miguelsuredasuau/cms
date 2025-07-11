import { PostData, ArticleMetadata } from '../types/content';
import { generateUUID } from '../utils/uuid';

export class ArticleService {
  private static readonly STORAGE_PREFIX = 'mastering-lovable-';
  private static readonly ARTICLES_INDEX_KEY = 'articles-index';

  static async getAllArticles(): Promise<ArticleMetadata[]> {
    try {
      // Cargar artículo de muestra si no hay artículos
      await this.loadSampleArticleIfNeeded();
      
      const indexData = localStorage.getItem(this.STORAGE_PREFIX + this.ARTICLES_INDEX_KEY);
      if (!indexData) return [];
      
      const articles: ArticleMetadata[] = JSON.parse(indexData);
      return articles.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error loading articles index:', error);
      return [];
    }
  }

  private static async loadSampleArticleIfNeeded(): Promise<void> {
    try {
      const indexData = localStorage.getItem(this.STORAGE_PREFIX + this.ARTICLES_INDEX_KEY);
      if (indexData) {
        const articles = JSON.parse(indexData);
        if (articles.length > 0) return; // Ya hay artículos
      }

      // Cargar artículo de muestra
      const response = await fetch('/src/data/sample-article.json');
      if (response.ok) {
        const sampleArticle = await response.json();
        await this.saveArticle(sampleArticle);
      }
    } catch (error) {
      console.log('No se pudo cargar el artículo de muestra:', error);
    }
  }

  static async getArticle(id: string): Promise<PostData | null> {
    try {
      const articleData = localStorage.getItem(this.STORAGE_PREFIX + id);
      if (!articleData) return null;
      
      return JSON.parse(articleData);
    } catch (error) {
      console.error('Error loading article:', error);
      return null;
    }
  }

  static async saveArticle(article: PostData): Promise<void> {
    try {
      // Actualizar timestamp
      article.metadata.updatedAt = new Date().toISOString();
      
      // Guardar el artículo
      localStorage.setItem(this.STORAGE_PREFIX + article.id, JSON.stringify(article));
      
      // Actualizar índice
      await this.updateArticleIndex(article);
    } catch (error) {
      console.error('Error saving article:', error);
      throw error;
    }
  }

  static async createNewArticle(title: string): Promise<PostData> {
    const id = generateUUID();
    const now = new Date().toISOString();
    
    const newArticle: PostData = {
      id,
      title,
      category: 'general',
      metadata: {
        title,
        description: '',
        author: 'Usuario',
        createdAt: now,
        updatedAt: now,
        tags: [],
        order: await this.getNextOrder(),
        published: false
      },
      branding: {
        accentColor: '#f59e0b',
        theme: 'modern'
      },
      globalBranding: {
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Inter'
      },
      blocks: []
    };

    await this.saveArticle(newArticle);
    return newArticle;
  }

  static async deleteArticle(id: string): Promise<void> {
    try {
      // Eliminar el artículo
      localStorage.removeItem(this.STORAGE_PREFIX + id);
      
      // Actualizar índice
      const articles = await this.getAllArticles();
      const updatedArticles = articles.filter(a => a.id !== id);
      localStorage.setItem(
        this.STORAGE_PREFIX + this.ARTICLES_INDEX_KEY, 
        JSON.stringify(updatedArticles)
      );
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  private static async updateArticleIndex(article: PostData): Promise<void> {
    const articles = await this.getAllArticles();
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    const metadata: ArticleMetadata = {
      id: article.id,
      title: article.metadata.title,
      description: article.metadata.description,
      author: article.metadata.author,
      createdAt: article.metadata.createdAt,
      updatedAt: article.metadata.updatedAt,
      tags: article.metadata.tags,
      order: article.metadata.order,
      published: article.metadata.published,
      filename: `${article.id}.json`
    };

    if (existingIndex >= 0) {
      articles[existingIndex] = metadata;
    } else {
      articles.push(metadata);
    }

    localStorage.setItem(
      this.STORAGE_PREFIX + this.ARTICLES_INDEX_KEY, 
      JSON.stringify(articles)
    );
  }

  private static async getNextOrder(): Promise<number> {
    const articles = await this.getAllArticles();
    return articles.length > 0 ? Math.max(...articles.map(a => a.order)) + 1 : 1;
  }

  static async exportToFile(article: PostData): Promise<void> {
    const dataStr = JSON.stringify(article, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  static async importFromFile(file: File): Promise<PostData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const article = JSON.parse(e.target?.result as string);
          
          // Validar estructura básica
          if (!article.id || !article.metadata || !article.blocks) {
            throw new Error('Estructura de archivo inválida');
          }
          
          // Generar nuevo ID si es necesario
          article.id = generateUUID();
          article.metadata.updatedAt = new Date().toISOString();
          
          resolve(article);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }
}