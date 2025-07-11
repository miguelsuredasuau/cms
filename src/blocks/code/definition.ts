import { BlockDefinition } from '../../types/content';
import CodeExecutor from './CodeExecutor';
import CodeBuilder from './CodeBuilder';

export const codeBlockDefinition: BlockDefinition = {
  type: 'code',
  name: 'Código',
  description: 'Bloque de código con sintaxis',
  icon: 'Code',
  category: 'content',
  defaultContent: {
    code: 'console.log("Hello World");',
    language: 'javascript',
    title: 'Código de ejemplo'
  },
  defaultParams: {},
  executor: CodeExecutor,
  builder: CodeBuilder
};