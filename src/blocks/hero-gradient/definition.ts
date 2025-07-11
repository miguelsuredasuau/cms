import { BlockDefinition } from '../../types/content';
import HeroGradientExecutor from './HeroGradientExecutor';
import HeroGradientBuilder from './HeroGradientBuilder';

export const heroGradientBlockDefinition: BlockDefinition = {
  type: 'hero-gradient',
  name: 'Hero Gradiente',
  description: 'Hero con gradiente personalizable',
  icon: 'Palette',
  category: 'heroes',
  defaultContent: {
    title: 'Título Hero',
    subtitle: 'Subtítulo descriptivo',
    gradient: 'from-blue-600 to-purple-600'
  },
  defaultParams: {},
  executor: HeroGradientExecutor,
  builder: HeroGradientBuilder
};