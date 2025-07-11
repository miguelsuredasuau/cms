import { BlockDefinition } from '../../types/content';
import QuoteExecutor from './QuoteExecutor';
import QuoteBuilder from './QuoteBuilder';

export const quoteBlockDefinition: BlockDefinition = {
  type: 'quote',
  name: 'Cita',
  description: 'Cita destacada con autor',
  icon: 'Quote',
  category: 'text',
  defaultContent: {
    text: 'Esta es una cita inspiradora que destaca información importante.',
    author: 'Autor de la cita',
    style: 'modern'
  },
  defaultParams: {},
  executor: QuoteExecutor,
  builder: QuoteBuilder
};