import { BlockDefinition } from '../../types/content';
import ImageExecutor from './ImageExecutor';
import ImageBuilder from './ImageBuilder';

export const imageBlockDefinition: BlockDefinition = {
  type: 'image',
  name: 'Imagen',
  description: 'Imagen con caption',
  icon: 'ImageIcon',
  category: 'multimedia',
  defaultContent: {
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    alt: 'Imagen descriptiva',
    caption: 'Caption de la imagen',
    size: 'large'
  },
  defaultParams: {},
  executor: ImageExecutor,
  builder: ImageBuilder
};