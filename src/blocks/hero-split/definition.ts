import { BlockDefinition } from '../../types/content';
import HeroSplitExecutor from './HeroSplitExecutor';
import HeroSplitBuilder from './HeroSplitBuilder';

export const heroSplitBlockDefinition: BlockDefinition = {
  type: 'hero-split',
  name: 'Hero Dividido',
  description: 'Hero con contenido dividido en dos columnas',
  icon: 'Columns',
  category: 'heroes',
  defaultContent: {
    title: 'Título Principal',
    subtitle: 'Subtítulo descriptivo',
    description: 'Descripción más detallada del contenido',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    buttonText: 'Comenzar',
    buttonUrl: '#'
  },
  defaultParams: {},
  executor: HeroSplitExecutor,
  builder: HeroSplitBuilder
};