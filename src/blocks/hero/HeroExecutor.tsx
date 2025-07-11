import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroExecutorProps {
  config: BlockConfig;
}

const HeroExecutor: React.FC<HeroExecutorProps> = ({ config }) => {
  const { title, gradient } = config.content;

  return (
    <div className="relative mb-8">
      <div className={`h-64 bg-gradient-to-br ${gradient} rounded-2xl mx-6 mt-6`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        {title && (
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroExecutor;