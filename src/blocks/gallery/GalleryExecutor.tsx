import React from 'react';
import { BlockConfig } from '../../types/content';

interface GalleryExecutorProps {
  config: BlockConfig;
}

const GalleryExecutor: React.FC<GalleryExecutorProps> = ({ config }) => {
  const { images, columns } = config.content;

  const gridClass = columns === 1 ? 'grid-cols-1' :
                   columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
                   columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                   'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${gridClass} gap-4 mb-6`}>
      {images.map((image: any, index: number) => (
        <div key={index} className="group">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
          />
          {image.caption && (
            <p className="text-sm text-gray-600 text-center mt-2">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryExecutor;