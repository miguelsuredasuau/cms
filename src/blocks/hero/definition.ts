import { BlockDefinition } from '../../types/content';
import HeroExecutor from './HeroExecutor';
import HeroBuilder from './HeroBuilder';

export const heroBlockDefinition: BlockDefinition = {
  type: 'hero',
  name: 'Hero',
  description: 'Sección hero con gradiente y título',
  icon: 'Image',
  category: 'layout',
  defaultContent: {
    title: 'Nuevo Hero',
    gradient: 'from-indigo-500 to-purple-500'
  },
  defaultParams: {},
  executor: HeroExecutor,
  builder: HeroBuilder
};