import React from 'react';
import { BlockConfig } from '../../types/content';

interface ButtonExecutorProps {
  config: BlockConfig;
}

const ButtonExecutor: React.FC<ButtonExecutorProps> = ({ config }) => {
  const { text, url, style, size, alignment } = config.content;

  const styleClass = style === 'primary' ? 'bg-indigo-600 text-white hover:bg-indigo-700' :
                    style === 'secondary' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' :
                    'border border-indigo-600 text-indigo-600 hover:bg-indigo-50';

  const sizeClass = size === 'small' ? 'px-4 py-2 text-sm' :
                   size === 'large' ? 'px-8 py-4 text-lg' :
                   'px-6 py-3';

  const alignmentClass = alignment === 'left' ? 'text-left' :
                        alignment === 'right' ? 'text-right' :
                        'text-center';

  return (
    <div className={`${alignmentClass} mb-6`}>
      <a
        href={url}
        className={`inline-block ${styleClass} ${sizeClass} rounded-lg font-medium transition-colors`}
      >
        {text}
      </a>
    </div>
  );
};

export default ButtonExecutor;