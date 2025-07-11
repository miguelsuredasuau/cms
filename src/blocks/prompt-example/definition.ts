import { BlockDefinition } from '../../types/content';
import PromptExampleExecutor from './PromptExampleExecutor';
import PromptExampleBuilder from './PromptExampleBuilder';

export const promptExampleBlockDefinition: BlockDefinition = {
  type: 'prompt-example',
  name: 'Ejemplo de Prompt',
  description: 'Caja destacada para ejemplos',
  icon: 'MessageSquare',
  category: 'content',
  defaultContent: {
    title: 'Ejemplo de Prompt:',
    text: 'Escribe aquí tu ejemplo...'
  },
  defaultParams: {},
  executor: PromptExampleExecutor,
  builder: PromptExampleBuilder
};