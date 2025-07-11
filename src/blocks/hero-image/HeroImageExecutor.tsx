import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroImageExecutorProps {
  config: BlockConfig;
}

const HeroImageExecutor: React.FC<HeroImageExecutorProps> = ({ config }) => {
  const { title, subtitle, imageUrl, overlay } = config.content;

  const overlayClass = overlay === 'dark' 
    ? 'bg-black bg-opacity-50' 
    : overlay === 'light' 
    ? 'bg-white bg-opacity-30'
    : 'bg-gradient-to-t from-black/60 to-transparent';

  return (
    <div className="relative mb-8">
      <div 
        className="h-80 rounded-2xl mx-6 mt-6 flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`absolute inset-0 ${overlayClass}`}></div>
        <div className="relative text-center text-white px-8 z-10">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl opacity-90">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroImageExecutor;