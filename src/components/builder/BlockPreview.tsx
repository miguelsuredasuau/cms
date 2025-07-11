import React from 'react';
import { BlockConfig } from '../../types/content';
import BlockRenderer from '../blocks/BlockRenderer';

interface BlockPreviewProps {
  block: BlockConfig;
}

const BlockPreview: React.FC<BlockPreviewProps> = ({ block }) => {
  return (
    <div className="p-4">
      <BlockRenderer block={block} />
    </div>
  );
};

export default BlockPreview;