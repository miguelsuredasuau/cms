import { BlockDefinition } from '../../types/content';
import CardExecutor from './CardExecutor';
import CardBuilder from './CardBuilder';

export const cardBlockDefinition: BlockDefinition = {
  type: 'card',
  name: 'Tarjeta',
  description: 'Tarjeta con contenido',
  icon: 'CreditCard',
  category: 'layout',
  defaultContent: {
    title: 'Título de la Tarjeta',
    description: 'Descripción de la tarjeta con información relevante.',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    buttonText: 'Leer más',
    buttonUrl: '#'
  },
  defaultParams: {},
  executor: CardExecutor,
  builder: CardBuilder
};