import React from 'react';
import { BlockConfig } from '../../types/content';
import { Package } from 'lucide-react';

interface KeyComponentsExecutorProps {
  config: BlockConfig;
}

const KeyComponentsExecutor: React.FC<KeyComponentsExecutorProps> = ({ config }) => {
  const { title, components } = config.content;

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Package className="w-6 h-6 text-purple-600 mr-3" />
        <h4 className="font-semibold text-purple-900">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component: any, index: number) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
            <h5 className="font-medium text-gray-900 mb-2">{component.name}</h5>
            <p className="text-gray-600 text-sm mb-3">{component.description}</p>
            {component.props && (
              <div className="text-xs text-gray-500">
                <strong>Props:</strong> {component.props.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyComponentsExecutor;