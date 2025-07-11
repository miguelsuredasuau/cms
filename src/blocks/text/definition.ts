import { BlockDefinition } from '../../types/content';
import TextExecutor from './TextExecutor';
import TextBuilder from './TextBuilder';

export const textBlockDefinition: BlockDefinition = {
  type: 'text',
  name: 'Texto',
  description: 'Párrafo de texto normal',
  icon: 'AlignLeft',
  category: 'text',
  defaultContent: {
    text: 'Nuevo párrafo de texto...'
  },
  defaultParams: {},
  executor: TextExecutor,
  builder: TextBuilder
};