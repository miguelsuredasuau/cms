import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroGradientExecutorProps {
  config: BlockConfig;
}

const HeroGradientExecutor: React.FC<HeroGradientExecutorProps> = ({ config }) => {
  const { title, subtitle, gradient } = config.content;

  return (
    <div className="relative mb-8">
      <div className={`h-80 bg-gradient-to-br ${gradient} rounded-2xl mx-6 mt-6 flex items-center justify-center`}>
        <div className="text-center text-white px-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl opacity-90">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroGradientExecutor;