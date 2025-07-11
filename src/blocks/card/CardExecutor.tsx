import React from 'react';
import { BlockConfig } from '../../types/content';

interface CardExecutorProps {
  config: BlockConfig;
}

const CardExecutor: React.FC<CardExecutorProps> = ({ config }) => {
  const { title, description, imageUrl, buttonText, buttonUrl } = config.content;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        {buttonText && (
          <a
            href={buttonUrl}
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default CardExecutor;