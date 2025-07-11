import React from 'react';
import { BlockConfig } from '../../types/content';

interface PromptExampleExecutorProps {
  config: BlockConfig;
}

const PromptExampleExecutor: React.FC<PromptExampleExecutorProps> = ({ config }) => {
  const { title, text } = config.content;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h4 className="font-semibold text-blue-900 mb-3">{title}</h4>
      <p className="text-blue-800 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default PromptExampleExecutor;