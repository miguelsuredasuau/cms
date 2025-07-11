import React from 'react';
import { BlockConfig } from '../../types/content';

interface SpacerExecutorProps {
  config: BlockConfig;
}

const SpacerExecutor: React.FC<SpacerExecutorProps> = ({ config }) => {
  const { height } = config.content;

  const heightClass = height === 'small' ? 'h-4' :
                     height === 'large' ? 'h-24' :
                     height === 'xlarge' ? 'h-32' :
                     'h-12';

  return <div className={heightClass}></div>;
};

export default SpacerExecutor;