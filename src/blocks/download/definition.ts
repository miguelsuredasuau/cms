import { BlockDefinition } from '../../types/content';
import DownloadExecutor from './DownloadExecutor';
import DownloadBuilder from './DownloadBuilder';

export const downloadBlockDefinition: BlockDefinition = {
  type: 'download',
  name: 'Descarga',
  description: 'Sección de archivos descargables',
  icon: 'Download',
  category: 'content',
  defaultContent: {
    title: 'Descargas',
    description: 'Archivos disponibles',
    files: []
  },
  defaultParams: {},
  executor: DownloadExecutor,
  builder: DownloadBuilder
};