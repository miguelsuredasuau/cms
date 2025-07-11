import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroMinimalExecutorProps {
  config: BlockConfig;
}

const HeroMinimalExecutor: React.FC<HeroMinimalExecutorProps> = ({ config }) => {
  const { title, subtitle, backgroundColor } = config.content;

  return (
    <div className={`${backgroundColor} rounded-2xl mx-6 mt-6 mb-8 py-20`}>
      <div className="text-center px-8">
        <h1 className="text-5xl font-light text-gray-900 mb-6">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-600 font-light">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default HeroMinimalExecutor;