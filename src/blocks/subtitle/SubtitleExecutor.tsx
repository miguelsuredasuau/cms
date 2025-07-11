import React from 'react';
import { BlockConfig } from '../../types/content';

interface SubtitleExecutorProps {
  config: BlockConfig;
}

const SubtitleExecutor: React.FC<SubtitleExecutorProps> = ({ config }) => {
  const { text, size, color } = config.content;

  return (
    <p className={`${size} ${color} mb-6`}>
      {text}
    </p>
  );
};

export default SubtitleExecutor;