import { BlockDefinition } from '../../types/content';
import VideoEmbedExecutor from './VideoEmbedExecutor';
import VideoEmbedBuilder from './VideoEmbedBuilder';

export const videoEmbedBlockDefinition: BlockDefinition = {
  type: 'video-embed',
  name: 'Video Embebido',
  description: 'Video de YouTube o Vimeo',
  icon: 'Video',
  category: 'multimedia',
  defaultContent: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Video embebido',
    aspectRatio: '16:9'
  },
  defaultParams: {},
  executor: VideoEmbedExecutor,
  builder: VideoEmbedBuilder
};