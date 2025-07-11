import { BlockDefinition } from '../../types/content';
import HeroImageExecutor from './HeroImageExecutor';
import HeroImageBuilder from './HeroImageBuilder';

export const heroImageBlockDefinition: BlockDefinition = {
  type: 'hero-image',
  name: 'Hero con Imagen',
  description: 'Hero con imagen de fondo',
  icon: 'ImageIcon',
  category: 'heroes',
  defaultContent: {
    title: 'Título Hero',
    subtitle: 'Subtítulo descriptivo',
    imageUrl: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    overlay: 'dark'
  },
  defaultParams: {},
  executor: HeroImageExecutor,
  builder: HeroImageBuilder
};