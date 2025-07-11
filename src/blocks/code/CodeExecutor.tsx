import React from 'react';
import { BlockConfig } from '../../types/content';

interface CodeExecutorProps {
  config: BlockConfig;
}

const CodeExecutor: React.FC<CodeExecutorProps> = ({ config }) => {
  const { code, language = 'javascript', title } = config.content;

  return (
    <div className="mb-6">
      {title && (
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      )}
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-gray-100 text-sm">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExecutor;