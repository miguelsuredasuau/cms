import { BlockDefinition } from '../../types/content';
import SpacerExecutor from './SpacerExecutor';
import SpacerBuilder from './SpacerBuilder';

export const spacerBlockDefinition: BlockDefinition = {
  type: 'spacer',
  name: 'Espaciador',
  description: 'Espacio en blanco',
  icon: 'Space',
  category: 'layout',
  defaultContent: {
    height: 'medium'
  },
  defaultParams: {},
  executor: SpacerExecutor,
  builder: SpacerBuilder
};