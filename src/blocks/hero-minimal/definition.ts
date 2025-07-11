import { BlockDefinition } from '../../types/content';
import HeroMinimalExecutor from './HeroMinimalExecutor';
import HeroMinimalBuilder from './HeroMinimalBuilder';

export const heroMinimalBlockDefinition: BlockDefinition = {
  type: 'hero-minimal',
  name: 'Hero Minimalista',
  description: 'Hero simple y limpio',
  icon: 'Minus',
  category: 'heroes',
  defaultContent: {
    title: 'Título Minimalista',
    subtitle: 'Subtítulo elegante',
    backgroundColor: 'bg-gray-50'
  },
  defaultParams: {},
  executor: HeroMinimalExecutor,
  builder: HeroMinimalBuilder
};