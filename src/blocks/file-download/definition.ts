import { BlockDefinition } from '../../types/content';
import FileDownloadExecutor from './FileDownloadExecutor';
import FileDownloadBuilder from './FileDownloadBuilder';

export const fileDownloadBlockDefinition: BlockDefinition = {
  type: 'file-download',
  name: 'Descarga de Archivo',
  description: 'Archivo descargable',
  icon: 'Download',
  category: 'files',
  defaultContent: {
    fileName: 'documento.pdf',
    fileSize: '2.5 MB',
    description: 'Documento importante para descargar',
    fileType: 'pdf'
  },
  defaultParams: {},
  executor: FileDownloadExecutor,
  builder: FileDownloadBuilder
};