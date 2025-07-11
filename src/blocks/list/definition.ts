import { BlockDefinition } from '../../types/content';
import ListExecutor from './ListExecutor';
import ListBuilder from './ListBuilder';

export const listBlockDefinition: BlockDefinition = {
  type: 'list',
  name: 'Lista',
  description: 'Lista con bullets o números',
  icon: 'List',
  category: 'content',
  defaultContent: {
    items: ['Elemento 1', 'Elemento 2', 'Elemento 3']
  },
  defaultParams: {
    style: 'bullet',
    color: 'indigo'
  },
  executor: ListExecutor,
  builder: ListBuilder
};