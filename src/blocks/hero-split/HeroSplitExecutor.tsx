import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroSplitExecutorProps {
  config: BlockConfig;
}

const HeroSplitExecutor: React.FC<HeroSplitExecutorProps> = ({ config }) => {
  const { title, subtitle, description, imageUrl, buttonText, buttonUrl } = config.content;

  return (
    <div className="bg-white rounded-2xl mx-6 mt-6 mb-8 overflow-hidden shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <div className="flex items-center p-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            {subtitle && (
              <p className="text-xl text-gray-600 mb-6">{subtitle}</p>
            )}
            {description && (
              <p className="text-gray-600 mb-8">{description}</p>
            )}
            {buttonText && (
              <a
                href={buttonUrl}
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
        <div 
          className="bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeroSplitExecutor;