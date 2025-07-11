import { BlockDefinition } from '../../types/content';
import TextHighlightExecutor from './TextHighlightExecutor';
import TextHighlightBuilder from './TextHighlightBuilder';

export const textHighlightBlockDefinition: BlockDefinition = {
  type: 'text-highlight',
  name: 'Texto Destacado',
  description: 'Texto con fondo destacado',
  icon: 'Highlighter',
  category: 'text',
  defaultContent: {
    text: 'Texto destacado importante',
    backgroundColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200'
  },
  defaultParams: {},
  executor: TextHighlightExecutor,
  builder: TextHighlightBuilder
};