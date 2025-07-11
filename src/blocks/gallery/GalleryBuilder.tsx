import React from 'react';
import { BlockConfig } from '../../types/content';

interface GalleryBuilderProps {
  block: BlockConfig;
  onUpdate: (updates: Partial<BlockConfig>) => void;
  availableIds: string[];
}

const GalleryBuilder: React.FC<GalleryBuilderProps> = ({ block, onUpdate, availableIds }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  const addImage = () => {
    const newImages = [...(block.content.images || []), {
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      alt: 'Nueva imagen',
      caption: 'Caption de la imagen'
    }];
    updateContent('images', newImages);
  };

  const removeImage = (index: number) => {
    const newImages = block.content.images.filter((_: any, i: number) => i !== index);
    updateContent('images', newImages);
  };

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...block.content.images];
    newImages[index] = { ...newImages[index], [field]: value };
    updateContent('images', newImages);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Columnas</label>
        <select
          value={block.content.columns || 2}
          onChange={(e) => updateContent('columns', parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value={1}>1 Columna</option>
          <option value={2}>2 Columnas</option>
          <option value={3}>3 Columnas</option>
          <option value={4}>4 Columnas</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
        {(block.content.images || []).map((image: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Imagen {index + 1}</span>
              <button
                onClick={() => removeImage(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Eliminar
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="url"
                value={image.url}
                onChange={(e) => updateImage(index, 'url', e.target.value)}
                placeholder="URL de la imagen"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                value={image.alt}
                onChange={(e) => updateImage(index, 'alt', e.target.value)}
                placeholder="Texto alternativo"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                value={image.caption}
                onChange={(e) => updateImage(index, 'caption', e.target.value)}
                placeholder="Caption"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addImage}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          + Agregar Imagen
        </button>
      </div>
    </div>
  );
};

export default GalleryBuilder;