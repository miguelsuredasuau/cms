import { BlockDefinition } from '../../types/content';
import HeroVideoExecutor from './HeroVideoExecutor';
import HeroVideoBuilder from './HeroVideoBuilder';

export const heroVideoBlockDefinition: BlockDefinition = {
  type: 'hero-video',
  name: 'Hero con Video',
  description: 'Hero con video de fondo',
  icon: 'Video',
  category: 'heroes',
  defaultContent: {
    title: 'Título Hero',
    subtitle: 'Subtítulo descriptivo',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    autoplay: true,
    muted: true
  },
  defaultParams: {},
  executor: HeroVideoExecutor,
  builder: HeroVideoBuilder
};