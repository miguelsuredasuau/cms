import { BlockDefinition } from '../../types/content';
import GalleryExecutor from './GalleryExecutor';
import GalleryBuilder from './GalleryBuilder';

export const galleryBlockDefinition: BlockDefinition = {
  type: 'gallery',
  name: 'Galería',
  description: 'Galería de imágenes',
  icon: 'Images',
  category: 'multimedia',
  defaultContent: {
    images: [
      {
        url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        alt: 'Imagen 1',
        caption: 'Primera imagen'
      },
      {
        url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        alt: 'Imagen 2',
        caption: 'Segunda imagen'
      }
    ],
    columns: 2
  },
  defaultParams: {},
  executor: GalleryExecutor,
  builder: GalleryBuilder
};