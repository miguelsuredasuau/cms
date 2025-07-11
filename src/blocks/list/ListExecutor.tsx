import React from 'react';
import { BlockConfig } from '../../types/content';

interface ListExecutorProps {
  config: BlockConfig;
}

const ListExecutor: React.FC<ListExecutorProps> = ({ config }) => {
  const { items } = config.content;
  const { style = 'bullet', color = 'gray' } = config.params || {};

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo-400',
      purple: 'bg-purple-400',
      blue: 'bg-blue-400',
      green: 'bg-green-400',
      yellow: 'bg-yellow-400',
      red: 'bg-red-400',
      gray: 'bg-gray-400'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <ul className="space-y-3">
        {items.map((item: string, index: number) => (
          <li key={index} className="flex items-start">
            {style === 'bullet' && (
              <div className={`w-2 h-2 ${getColorClass(color)} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
            )}
            {style === 'number' && (
              <span className="text-gray-600 font-medium mr-3">{index + 1}.</span>
            )}
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListExecutor;