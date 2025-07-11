export interface BlockConfig {
  id: string;
  type: BlockType;
  content: any;
  params?: Record<string, any>;
}

export type BlockType = 
  | 'header1'
  | 'header2' 
  | 'header3'
  | 'text'
  | 'list'
  | 'prompt-example'
  | 'pro-tip'
  | 'code'
  | 'download'
  | 'key-components'
  | 'feature-cards'
  | 'hero'
  | 'hero-gradient'
  | 'hero-image'
  | 'hero-video'
  | 'hero-split'
  | 'hero-minimal'
  | 'title-large'
  | 'subtitle'
  | 'text-highlight'
  | 'quote'
  | 'image'
  | 'video-embed'
  | 'gallery'
  | 'button'
  | 'card'
  | 'divider'
  | 'spacer'
  | 'file-download'
  | 'file-upload';

export interface BlockDefinition {
  type: BlockType;
  name: string;
  description: string;
  icon: string;
  category: string;
  defaultContent: any;
  defaultParams?: Record<string, any>;
  executor: React.ComponentType<{ config: BlockConfig }>;
  builder: React.ComponentType<{ 
    block: BlockConfig; 
    onUpdate: (updates: Partial<BlockConfig>) => void;
    availableIds: string[];
  }>;
}

export interface PostData {
  id: string;
  title: string;
  category: string;
  chapters?: Chapter[];
  metadata: {
    title: string;
    description: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    order: number;
    published: boolean;
  };
  branding?: {
    accentColor?: string;
    headerImage?: string;
    theme?: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant';
  };
  globalBranding?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  blocks: BlockConfig[];
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  order: number;
  pages: Page[];
}

export interface Page {
  id: string;
  title: string;
  description?: string;
  order: number;
  blocks: BlockConfig[];
}

export interface NavigationItem {
  id: string;
  title: string;
  isActive?: boolean;
  isPhase?: boolean;
  phaseNumber?: number;
  isChapter?: boolean;
  isPage?: boolean;
  chapterId?: string;
  pageId?: string;
}

export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  order: number;
  published: boolean;
  filename: string;
}

export interface AIGeneratorSettings {
  openaiApiKey: string;
  model: 'gpt-4' | 'gpt-3.5-turbo';
  temperature: number;
  maxTokens: number;
}

export interface ContentGenerationRequest {
  topic: string;
  description?: string;
  files?: File[];
  targetAudience?: string;
  contentType: 'article' | 'tutorial' | 'guide' | 'documentation';
  includeChapters: boolean;
  chaptersCount?: number;
}