import React from 'react';
import { BlockConfig } from '../../types/content';
import { Eye, Lightbulb, Star, Zap } from 'lucide-react';

interface ProTipExecutorProps {
  config: BlockConfig;
}

const ProTipExecutor: React.FC<ProTipExecutorProps> = ({ config }) => {
  const { title, text, icon = 'Lightbulb' } = config.content;
  const { color = 'yellow' } = config.params || {};

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Eye: <Eye className="w-5 h-5" />,
      Lightbulb: <Lightbulb className="w-5 h-5" />,
      Star: <Star className="w-5 h-5" />,
      Zap: <Zap className="w-5 h-5" />
    };
    return iconMap[iconName] || iconMap.Lightbulb;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; icon: string; title: string; text: string }> = {
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-600',
        title: 'text-yellow-800',
        text: 'text-yellow-700'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-800',
        text: 'text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        title: 'text-green-800',
        text: 'text-green-700'
      }
    };
    return colorMap[color] || colorMap.yellow;
  };

  const colors = getColorClasses(color);

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 mb-6`}>
      <div className="flex items-center mb-3">
        <span className={colors.icon}>
          {getIcon(icon)}
        </span>
        <span className={`font-semibold ${colors.title} ml-2`}>{title}</span>
      </div>
      <p className={colors.text}>
        {text}
      </p>
    </div>
  );
};

export default ProTipExecutor;