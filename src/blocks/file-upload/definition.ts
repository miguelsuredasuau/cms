import { BlockDefinition } from '../../types/content';
import FileUploadExecutor from './FileUploadExecutor';
import FileUploadBuilder from './FileUploadBuilder';

export const fileUploadBlockDefinition: BlockDefinition = {
  type: 'file-upload',
  name: 'Zona de Subida',
  description: 'Zona de arrastrar y soltar para subir archivos',
  icon: 'Upload',
  category: 'files',
  defaultContent: {
    title: 'Subir Archivos',
    description: 'Arrastra y suelta tus archivos aquí',
    acceptedTypes: 'image/*,video/*,audio/*,.pdf,.doc,.docx',
    maxFiles: 5,
    showPreview: true
  },
  defaultParams: {},
  executor: FileUploadExecutor,
  builder: FileUploadBuilder
};