import React from 'react';
import { BlockConfig } from '../../types/content';

interface TextExecutorProps {
  config: BlockConfig;
}

const TextExecutor: React.FC<TextExecutorProps> = ({ config }) => {
  const { text } = config.content;

  return (
    <p className="text-gray-700 leading-relaxed mb-6">
      {text}
    </p>
  );
};

export default TextExecutor;