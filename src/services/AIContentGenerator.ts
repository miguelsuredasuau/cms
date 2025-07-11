import { PostData, Chapter, Page, BlockConfig, ContentGenerationRequest, AIGeneratorSettings } from '../types/content';
import { generateUUID } from '../utils/uuid';
import BlockRegistry from '../blocks/registry/BlockRegistry';

export class AIContentGenerator {
  private static readonly SETTINGS_KEY = 'ai-generator-settings';

  static async getSettings(): Promise<AIGeneratorSettings | null> {
    try {
      const settings = localStorage.getItem(this.SETTINGS_KEY);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error loading AI settings:', error);
      return null;
    }
  }

  static async saveSettings(settings: AIGeneratorSettings): Promise<void> {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving AI settings:', error);
      throw error;
    }
  }

  static async generateContent(request: ContentGenerationRequest): Promise<PostData> {
    const settings = await this.getSettings();
    if (!settings?.openaiApiKey) {
      throw new Error('API Key de OpenAI no configurada');
    }

    try {
      // Step 1: Generate article structure
      const structure = await this.generateStructure(request, settings);
      
      // Step 2: Generate detailed content for each section
      const content = await this.generateDetailedContent(structure, request, settings);
      
      // Step 3: Convert to PostData format
      const postData = await this.convertToPostData(content, request);
      
      return postData;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  private static async generateStructure(request: ContentGenerationRequest, settings: AIGeneratorSettings) {
    const prompt = this.buildStructurePrompt(request);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.openaiApiKey}`
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en creación de contenido estructurado. Genera estructuras detalladas en formato JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: settings.temperature,
        max_tokens: settings.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  private static async generateDetailedContent(structure: any, request: ContentGenerationRequest, settings: AIGeneratorSettings) {
    const detailedContent = { ...structure };
    
    // Generate content for each chapter/section
    if (request.includeChapters && structure.chapters) {
      for (let i = 0; i < structure.chapters.length; i++) {
        const chapter = structure.chapters[i];
        
        for (let j = 0; j < chapter.pages.length; j++) {
          const page = chapter.pages[j];
          const contentPrompt = this.buildContentPrompt(page, request);
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${settings.openaiApiKey}`
            },
            body: JSON.stringify({
              model: settings.model,
              messages: [
                {
                  role: 'system',
                  content: 'Eres un experto escritor de contenido técnico. Genera contenido detallado y bien estructurado.'
                },
                {
                  role: 'user',
                  content: contentPrompt
                }
              ],
              temperature: settings.temperature,
              max_tokens: settings.maxTokens
            })
          });

          if (response.ok) {
            const data = await response.json();
            const pageContent = JSON.parse(data.choices[0].message.content);
            detailedContent.chapters[i].pages[j] = { ...page, ...pageContent };
          }
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } else {
      // Generate content for single article
      const contentPrompt = this.buildContentPrompt(structure, request);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.openaiApiKey}`
        },
        body: JSON.stringify({
          model: settings.model,
          messages: [
            {
              role: 'system',
              content: 'Eres un experto escritor de contenido técnico. Genera contenido detallado con bloques específicos.'
            },
            {
              role: 'user',
              content: contentPrompt
            }
          ],
          temperature: settings.temperature,
          max_tokens: settings.maxTokens
        })
      });

      if (response.ok) {
        const data = await response.json();
        const articleContent = JSON.parse(data.choices[0].message.content);
        detailedContent.blocks = articleContent.blocks;
      }
    }

    return detailedContent;
  }

  private static buildStructurePrompt(request: ContentGenerationRequest): string {
    return `
Genera una estructura detallada para un ${request.contentType} sobre "${request.topic}".

Descripción: ${request.description || 'No especificada'}
Audiencia objetivo: ${request.targetAudience || 'General'}
Incluir capítulos: ${request.includeChapters ? 'Sí' : 'No'}
${request.includeChapters ? `Número de capítulos: ${request.chaptersCount || 3}` : ''}

Responde SOLO con un JSON válido con esta estructura:
${request.includeChapters ? `
{
  "title": "Título del contenido",
  "description": "Descripción breve",
  "chapters": [
    {
      "id": "uuid",
      "title": "Título del capítulo",
      "description": "Descripción del capítulo",
      "order": 1,
      "pages": [
        {
          "id": "uuid",
          "title": "Título de la página",
          "description": "Descripción de la página",
          "order": 1
        }
      ]
    }
  ]
}` : `
{
  "title": "Título del contenido",
  "description": "Descripción breve",
  "sections": [
    {
      "title": "Título de sección",
      "type": "hero|header1|text|list|code|image",
      "content": "Contenido específico"
    }
  ]
}`}

Asegúrate de que el contenido sea relevante, bien estructurado y apropiado para la audiencia objetivo.
    `;
  }

  private static buildContentPrompt(section: any, request: ContentGenerationRequest): string {
    return `
Genera contenido detallado para la sección "${section.title}" del ${request.contentType} sobre "${request.topic}".

Descripción de la sección: ${section.description || 'No especificada'}
Audiencia objetivo: ${request.targetAudience || 'General'}

Responde SOLO con un JSON válido con esta estructura:
{
  "blocks": [
    {
      "type": "header1|header2|text|list|code|image|quote|pro-tip",
      "content": {
        // Contenido específico según el tipo de bloque
        // Para text: { "text": "contenido del párrafo" }
        // Para list: { "items": ["item1", "item2"] }
        // Para code: { "code": "código", "language": "javascript", "title": "título" }
        // Para quote: { "text": "cita", "author": "autor" }
        // Para pro-tip: { "title": "Pro Tip:", "text": "consejo", "icon": "Lightbulb" }
      }
    }
  ]
}

Genera entre 3-8 bloques variados que cubran el tema de forma completa y educativa.
Incluye ejemplos prácticos, consejos y código cuando sea relevante.
    `;
  }

  private static async convertToPostData(content: any, request: ContentGenerationRequest): Promise<PostData> {
    const registry = BlockRegistry.getInstance();
    const now = new Date().toISOString();

    const postData: PostData = {
      id: generateUUID(),
      title: content.title,
      category: 'generated',
      metadata: {
        title: content.title,
        description: content.description || '',
        author: 'AI Generator',
        createdAt: now,
        updatedAt: now,
        tags: [request.contentType, 'ai-generated'],
        order: 1,
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
      blocks: [],
      chapters: []
    };

    if (request.includeChapters && content.chapters) {
      // Convert chapters structure
      postData.chapters = content.chapters.map((chapter: any) => ({
        id: generateUUID(),
        title: chapter.title,
        description: chapter.description,
        order: chapter.order,
        pages: chapter.pages.map((page: any) => ({
          id: generateUUID(),
          title: page.title,
          description: page.description,
          order: page.order,
          blocks: this.convertContentToBlocks(page.blocks || [], registry)
        }))
      }));
    } else {
      // Convert direct blocks
      postData.blocks = this.convertContentToBlocks(content.blocks || [], registry);
    }

    return postData;
  }

  private static convertContentToBlocks(blocks: any[], registry: BlockRegistry): BlockConfig[] {
    return blocks.map((block: any) => {
      const definition = registry.getDefinition(block.type as any);
      if (!definition) {
        console.warn(`Unknown block type: ${block.type}`);
        return null;
      }

      return {
        id: generateUUID(),
        type: block.type,
        content: { ...definition.defaultContent, ...block.content },
        params: definition.defaultParams || {}
      };
    }).filter(Boolean) as BlockConfig[];
  }
}