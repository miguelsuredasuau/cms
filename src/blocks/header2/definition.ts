import { BlockDefinition } from '../../types/content';
import Header2Executor from './Header2Executor';
import Header2Builder from './Header2Builder';

export const header2BlockDefinition: BlockDefinition = {
  type: 'header2',
  name: 'Subtítulo',
  description: 'Título de nivel 2',
  icon: 'Type',
  category: 'text',
  defaultContent: {
    text: 'Nuevo Subtítulo'
  },
  defaultParams: {},
  executor: Header2Executor,
  builder: Header2Builder
};