import React from 'react';
import { BlockConfig } from '../../types/content';
import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteExecutorProps {
  config: BlockConfig;
}

const QuoteExecutor: React.FC<QuoteExecutorProps> = ({ config }) => {
  const { text, author, style } = config.content;

  if (style === 'modern') {
    return (
      <div className="bg-gray-50 border-l-4 border-indigo-500 p-6 mb-6">
        <div className="flex items-start">
          <QuoteIcon className="w-6 h-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <p className="text-lg text-gray-700 italic mb-3">{text}</p>
            {author && (
              <p className="text-sm text-gray-500 font-medium">— {author}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <blockquote className="border-l-4 border-gray-300 pl-6 py-4 mb-6">
      <p className="text-xl text-gray-700 italic mb-3">"{text}"</p>
      {author && (
        <cite className="text-gray-500 font-medium">— {author}</cite>
      )}
    </blockquote>
  );
};

export default QuoteExecutor;