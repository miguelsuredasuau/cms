import React from 'react';
import { BlockConfig } from '../../types/content';

interface Header2ExecutorProps {
  config: BlockConfig;
}

const Header2Executor: React.FC<Header2ExecutorProps> = ({ config }) => {
  const { text } = config.content;

  return (
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
      {text}
    </h2>
  );
};

export default Header2Executor;