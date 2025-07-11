import React from 'react';
import { BlockConfig } from '../../types/content';

interface ImageExecutorProps {
  config: BlockConfig;
}

const ImageExecutor: React.FC<ImageExecutorProps> = ({ config }) => {
  const { url, alt, caption, size } = config.content;

  const sizeClass = size === 'small' ? 'max-w-md' : 
                   size === 'medium' ? 'max-w-2xl' : 'max-w-4xl';

  return (
    <div className={`${sizeClass} mx-auto mb-6`}>
      <img
        src={url}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-md"
      />
      {caption && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">{caption}</p>
      )}
    </div>
  );
};

export default ImageExecutor;