import React from 'react';
import { BlockConfig } from '../../types/content';

interface TitleLargeExecutorProps {
  config: BlockConfig;
}

const TitleLargeExecutor: React.FC<TitleLargeExecutorProps> = ({ config }) => {
  const { text, alignment, color } = config.content;

  const alignmentClass = alignment === 'center' ? 'text-center' : 
                        alignment === 'right' ? 'text-right' : 'text-left';

  return (
    <h1 className={`text-6xl font-bold ${color} ${alignmentClass} mb-8`}>
      {text}
    </h1>
  );
};

export default TitleLargeExecutor;