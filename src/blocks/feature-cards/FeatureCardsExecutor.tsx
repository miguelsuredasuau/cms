import React from 'react';
import { BlockConfig } from '../../types/content';
import { Sparkles, Eye, Users, Zap, Star, Heart } from 'lucide-react';

interface FeatureCardsExecutorProps {
  config: BlockConfig;
}

const FeatureCardsExecutor: React.FC<FeatureCardsExecutorProps> = ({ config }) => {
  const { cards } = config.content;

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Sparkles: <Sparkles className="w-6 h-6" />,
      Eye: <Eye className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      Zap: <Zap className="w-6 h-6" />,
      Star: <Star className="w-6 h-6" />,
      Heart: <Heart className="w-6 h-6" />
    };
    return iconMap[iconName] || iconMap.Sparkles;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
    };
    return colorMap[color] || colorMap.indigo;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card: any, index: number) => {
        const colors = getColorClasses(card.color);
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
              <span className={colors.text}>
                {getIcon(card.icon)}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{card.title}</h4>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCardsExecutor;