import React from 'react';
import { BlockConfig } from '../../types/content';

interface VideoEmbedExecutorProps {
  config: BlockConfig;
}

const VideoEmbedExecutor: React.FC<VideoEmbedExecutorProps> = ({ config }) => {
  const { url, title, aspectRatio } = config.content;

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const aspectClass = aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video';

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className={`${aspectClass} rounded-lg overflow-hidden shadow-md`}>
        <iframe
          src={getEmbedUrl(url)}
          title={title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      {title && (
        <p className="text-sm text-gray-600 text-center mt-2">{title}</p>
      )}
    </div>
  );
};

export default VideoEmbedExecutor;