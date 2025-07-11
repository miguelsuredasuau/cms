import { BlockDefinition } from '../../types/content';
import KeyComponentsExecutor from './KeyComponentsExecutor';
import KeyComponentsBuilder from './KeyComponentsBuilder';

export const keyComponentsBlockDefinition: BlockDefinition = {
  type: 'key-components',
  name: 'Componentes Clave',
  description: 'Lista de componentes importantes',
  icon: 'Package',
  category: 'content',
  defaultContent: {
    title: 'Componentes Clave',
    components: []
  },
  defaultParams: {},
  executor: KeyComponentsExecutor,
  builder: KeyComponentsBuilder
};