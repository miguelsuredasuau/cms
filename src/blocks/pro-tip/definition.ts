import { BlockDefinition } from '../../types/content';
import ProTipExecutor from './ProTipExecutor';
import ProTipBuilder from './ProTipBuilder';

export const proTipBlockDefinition: BlockDefinition = {
  type: 'pro-tip',
  name: 'Pro Tip',
  description: 'Consejo destacado con icono',
  icon: 'Lightbulb',
  category: 'content',
  defaultContent: {
    title: 'Pro Tip:',
    text: 'Escribe aquí tu consejo...',
    icon: 'Lightbulb'
  },
  defaultParams: {
    color: 'yellow'
  },
  executor: ProTipExecutor,
  builder: ProTipBuilder
};