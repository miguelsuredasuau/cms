import React from 'react';
import { BlockConfig } from '../../types/content';

interface Header1ExecutorProps {
  config: BlockConfig;
}

const Header1Executor: React.FC<Header1ExecutorProps> = ({ config }) => {
  const { text } = config.content;

  return (
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      {text}
    </h1>
  );
};

export default Header1Executor;