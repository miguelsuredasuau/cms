import React from 'react';
import { BlockConfig } from '../../types/content';
import BlockRegistry from '../../blocks/registry/BlockRegistry';

interface BlockRendererProps {
  block: BlockConfig;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const registry = BlockRegistry.getInstance();
  const definition = registry.getDefinition(block.type);

  if (!definition) {
    console.warn(`No definition found for block type: ${block.type}`);
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded-lg">
        Error: Bloque de tipo "{block.type}" no encontrado.
      </div>
    );
  }

  const ExecutorComponent = definition.executor;

  return <ExecutorComponent config={block} />;
};

export default BlockRenderer;