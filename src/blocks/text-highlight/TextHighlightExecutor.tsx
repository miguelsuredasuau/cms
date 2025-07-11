import React from 'react';
import { BlockConfig } from '../../types/content';

interface TextHighlightExecutorProps {
  config: BlockConfig;
}

const TextHighlightExecutor: React.FC<TextHighlightExecutorProps> = ({ config }) => {
  const { text, backgroundColor, textColor, borderColor } = config.content;

  return (
    <div className={`${backgroundColor} ${textColor} border ${borderColor} rounded-lg p-4 mb-6`}>
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default TextHighlightExecutor;