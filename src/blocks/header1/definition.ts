import { BlockDefinition } from '../../types/content';
import Header1Executor from './Header1Executor';
import Header1Builder from './Header1Builder';

export const header1BlockDefinition: BlockDefinition = {
  type: 'header1',
  name: 'Título Principal',
  description: 'Título de nivel 1',
  icon: 'Type',
  category: 'text',
  defaultContent: {
    text: 'Nuevo Título Principal'
  },
  defaultParams: {},
  executor: Header1Executor,
  builder: Header1Builder
};