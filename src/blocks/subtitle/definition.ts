import { BlockDefinition } from '../../types/content';
import SubtitleExecutor from './SubtitleExecutor';
import SubtitleBuilder from './SubtitleBuilder';

export const subtitleBlockDefinition: BlockDefinition = {
  type: 'subtitle',
  name: 'Subtítulo',
  description: 'Subtítulo descriptivo',
  icon: 'Heading2',
  category: 'headers',
  defaultContent: {
    text: 'Subtítulo',
    size: 'text-xl',
    color: 'text-gray-600'
  },
  defaultParams: {},
  executor: SubtitleExecutor,
  builder: SubtitleBuilder
};