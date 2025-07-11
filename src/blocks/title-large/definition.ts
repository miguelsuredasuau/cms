import { BlockDefinition } from '../../types/content';
import TitleLargeExecutor from './TitleLargeExecutor';
import TitleLargeBuilder from './TitleLargeBuilder';

export const titleLargeBlockDefinition: BlockDefinition = {
  type: 'title-large',
  name: 'Título Grande',
  description: 'Título de gran tamaño',
  icon: 'Heading1',
  category: 'headers',
  defaultContent: {
    text: 'Título Grande',
    alignment: 'center',
    color: 'text-gray-900'
  },
  defaultParams: {},
  executor: TitleLargeExecutor,
  builder: TitleLargeBuilder
};