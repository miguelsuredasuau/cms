import { BlockDefinition } from '../../types/content';
import ButtonExecutor from './ButtonExecutor';
import ButtonBuilder from './ButtonBuilder';

export const buttonBlockDefinition: BlockDefinition = {
  type: 'button',
  name: 'Botón',
  description: 'Botón de acción',
  icon: 'MousePointer',
  category: 'interactive',
  defaultContent: {
    text: 'Botón de Acción',
    url: '#',
    style: 'primary',
    size: 'medium',
    alignment: 'center'
  },
  defaultParams: {},
  executor: ButtonExecutor,
  builder: ButtonBuilder
};