import { BlockType, BlockConfig, BlockDefinition } from '../../types/content';

// Import all block definitions
import { heroBlockDefinition } from '../hero/definition';
import { heroGradientBlockDefinition } from '../hero-gradient/definition';
import { heroImageBlockDefinition } from '../hero-image/definition';
import { heroVideoBlockDefinition } from '../hero-video/definition';
import { heroSplitBlockDefinition } from '../hero-split/definition';
import { heroMinimalBlockDefinition } from '../hero-minimal/definition';
import { header1BlockDefinition } from '../header1/definition';
import { header2BlockDefinition } from '../header2/definition';
import { titleLargeBlockDefinition } from '../title-large/definition';
import { subtitleBlockDefinition } from '../subtitle/definition';
import { textBlockDefinition } from '../text/definition';
import { textHighlightBlockDefinition } from '../text-highlight/definition';
import { quoteBlockDefinition } from '../quote/definition';
import { listBlockDefinition } from '../list/definition';
import { promptExampleBlockDefinition } from '../prompt-example/definition';
import { proTipBlockDefinition } from '../pro-tip/definition';
import { codeBlockDefinition } from '../code/definition';
import { imageBlockDefinition } from '../image/definition';
import { videoEmbedBlockDefinition } from '../video-embed/definition';
import { galleryBlockDefinition } from '../gallery/definition';
import { buttonBlockDefinition } from '../button/definition';
import { cardBlockDefinition } from '../card/definition';
import { dividerBlockDefinition } from '../divider/definition';
import { spacerBlockDefinition } from '../spacer/definition';
import { downloadBlockDefinition } from '../download/definition';
import { fileDownloadBlockDefinition } from '../file-download/definition';
import { fileUploadBlockDefinition } from '../file-upload/definition';
import { keyComponentsBlockDefinition } from '../key-components/definition';
import { featureCardsBlockDefinition } from '../feature-cards/definition';

class BlockRegistry {
  private static instance: BlockRegistry;
  private definitions: Map<BlockType, BlockDefinition> = new Map();

  private constructor() {
    this.registerBlocks();
  }

  public static getInstance(): BlockRegistry {
    if (!BlockRegistry.instance) {
      BlockRegistry.instance = new BlockRegistry();
    }
    return BlockRegistry.instance;
  }

  private registerBlocks() {
    // Register all block definitions (cleaned up - no duplicates)
    this.definitions.set('hero', heroBlockDefinition);
    this.definitions.set('hero-gradient', heroGradientBlockDefinition);
    this.definitions.set('hero-image', heroImageBlockDefinition);
    this.definitions.set('hero-video', heroVideoBlockDefinition);
    this.definitions.set('hero-split', heroSplitBlockDefinition);
    this.definitions.set('hero-minimal', heroMinimalBlockDefinition);
    this.definitions.set('header1', header1BlockDefinition);
    this.definitions.set('header2', header2BlockDefinition);
    this.definitions.set('title-large', titleLargeBlockDefinition);
    this.definitions.set('subtitle', subtitleBlockDefinition);
    this.definitions.set('text', textBlockDefinition);
    this.definitions.set('text-highlight', textHighlightBlockDefinition);
    this.definitions.set('quote', quoteBlockDefinition);
    this.definitions.set('list', listBlockDefinition);
    this.definitions.set('prompt-example', promptExampleBlockDefinition);
    this.definitions.set('pro-tip', proTipBlockDefinition);
    this.definitions.set('code', codeBlockDefinition);
    this.definitions.set('image', imageBlockDefinition);
    this.definitions.set('video-embed', videoEmbedBlockDefinition);
    this.definitions.set('gallery', galleryBlockDefinition);
    this.definitions.set('button', buttonBlockDefinition);
    this.definitions.set('card', cardBlockDefinition);
    this.definitions.set('divider', dividerBlockDefinition);
    this.definitions.set('spacer', spacerBlockDefinition);
    this.definitions.set('download', downloadBlockDefinition);
    this.definitions.set('file-download', fileDownloadBlockDefinition);
    this.definitions.set('file-upload', fileUploadBlockDefinition);
    this.definitions.set('key-components', keyComponentsBlockDefinition);
    this.definitions.set('feature-cards', featureCardsBlockDefinition);
  }

  public getDefinition(type: BlockType): BlockDefinition | undefined {
    return this.definitions.get(type);
  }

  public getAllDefinitions(): BlockDefinition[] {
    return Array.from(this.definitions.values());
  }

  public getAvailableTypes(): BlockType[] {
    return Array.from(this.definitions.keys());
  }

  public createDefaultBlock(type: BlockType): BlockConfig | null {
    const definition = this.getDefinition(type);
    if (!definition) return null;

    return {
      id: '', // Se asignará un UUID desde fuera
      type,
      content: definition.defaultContent,
      params: definition.defaultParams
    };
  }

}

export default BlockRegistry;