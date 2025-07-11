import React from 'react';
import { PostData } from '../types/content';
import BlockRenderer from './blocks/BlockRenderer';

interface PostRendererProps {
  post: PostData;
  selectedBlockId?: string | null;
}

const PostRenderer: React.FC<PostRendererProps> = ({ post, selectedBlockId }) => {
  return (
    <div className="post-container" data-post-id={post.id}>
      <div className="space-y-6">
        {post.blocks.map((block) => (
          <div
            key={block.id}
            data-block-id={block.id}
            className={`transition-all duration-200 ${
              selectedBlockId === block.id 
                ? 'ring-2 ring-indigo-500 ring-opacity-50 rounded-lg' 
                : ''
            }`}
          >
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostRenderer;