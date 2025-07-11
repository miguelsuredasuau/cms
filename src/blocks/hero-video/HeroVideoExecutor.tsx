import React from 'react';
import { BlockConfig } from '../../types/content';

interface HeroVideoExecutorProps {
  config: BlockConfig;
}

const HeroVideoExecutor: React.FC<HeroVideoExecutorProps> = ({ config }) => {
  const { title, subtitle, videoUrl, autoplay, muted } = config.content;

  return (
    <div className="relative mb-8">
      <div className="h-80 rounded-2xl mx-6 mt-6 flex items-center justify-center relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={autoplay}
          muted={muted}
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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

export default HeroVideoExecutor;