import { BlockDefinition } from '../../types/content';
import DividerExecutor from './DividerExecutor';
import DividerBuilder from './DividerBuilder';

export const dividerBlockDefinition: BlockDefinition = {
  type: 'divider',
  name: 'Separador',
  description: 'Línea separadora',
  icon: 'Minus',
  category: 'layout',
  defaultContent: {
    style: 'solid',
    color: 'gray',
    thickness: 'thin'
  },
  defaultParams: {},
  executor: DividerExecutor,
  builder: DividerBuilder
};