import { BlockDefinition } from '../../types/content';
import FeatureCardsExecutor from './FeatureCardsExecutor';
import FeatureCardsBuilder from './FeatureCardsBuilder';

export const featureCardsBlockDefinition: BlockDefinition = {
  type: 'feature-cards',
  name: 'Cards de Características',
  description: 'Grid de cards con iconos',
  icon: 'Grid3X3',
  category: 'content',
  defaultContent: {
    cards: []
  },
  defaultParams: {},
  executor: FeatureCardsExecutor,
  builder: FeatureCardsBuilder
};