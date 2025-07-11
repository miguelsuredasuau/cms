import React from 'react';
import { BlockConfig } from '../../types/content';

interface DividerExecutorProps {
  config: BlockConfig;
}

const DividerExecutor: React.FC<DividerExecutorProps> = ({ config }) => {
  const { style, color, thickness } = config.content;

  const styleClass = style === 'dashed' ? 'border-dashed' :
                    style === 'dotted' ? 'border-dotted' :
                    'border-solid';

  const colorClass = color === 'blue' ? 'border-blue-300' :
                    color === 'purple' ? 'border-purple-300' :
                    color === 'green' ? 'border-green-300' :
                    'border-gray-300';

  const thicknessClass = thickness === 'thick' ? 'border-t-4' :
                        thickness === 'medium' ? 'border-t-2' :
                        'border-t';

  return (
    <div className={`w-full ${styleClass} ${colorClass} ${thicknessClass} my-8`}></div>
  );
};

export default DividerExecutor;