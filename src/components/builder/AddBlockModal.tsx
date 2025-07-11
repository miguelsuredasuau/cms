import React from 'react';
import { BlockType, BlockDefinition } from '../../types/content';
import BlockRegistry from '../../blocks/registry/BlockRegistry';
import { Type, AlignLeft, List, MessageSquare, Lightbulb, Code, Download, Package, Grid3X3, ImageIcon, Palette, Video, Columns, Minus, Heading1, Heading2, Highlighter, Quote, Images, MousePointer, CreditCard, Space, Star, Zap, Heart, Users, Calendar, Clock, MapPin, Phone, Mail, Globe, Shield, Award, Target, TrendingUp, BarChart, PieChart, Activity, Briefcase, Building, Home, Car, Plane, Camera, Music, Gamepad2, Coffee, Pizza, ShoppingCart, CreditCard as CreditCardIcon, Wallet, Gift, Tag, Bookmark, Flag, Bell, Settings, Lock, Key, Eye, EyeOff, Search, Filter, SortAsc as Sort, RefreshCw as Refresh, Upload, Download as DownloadIcon, Share, Link, Copy, Scissors, Clipboard, FileText, Folder, Archive, Trash, Edit, Save, Plus, X, Check, AlertTriangle, Info, HelpCircle, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Maximize, Minimize, RotateCcw, RotateCw, ZoomIn, ZoomOut, Move, Layers, Layout, Grid, Sidebar, Menu, MoreHorizontal, MoreVertical, Sun, Moon, Cloud, CloudRain, Umbrella, Thermometer, Wind, Snowflake, Sunrise, Sunset } from 'lucide-react';

interface BlockSubtype {
  type: BlockType;
  name: string;
  description: string;
  icon: string;
  category: string;
  subtype?: string;
}

interface AddBlockModalProps {
  onAdd: (type: BlockType) => void;
  onClose: () => void;
}

const AddBlockModal: React.FC<AddBlockModalProps> = ({ onAdd, onClose }) => {
  const registry = BlockRegistry.getInstance();
  const definitions = registry.getAllDefinitions();

  // Enhanced block definitions with subtypes and better descriptions
  const enhancedDefinitions: BlockSubtype[] = definitions.map(def => ({
    ...def,
    description: getEnhancedDescription(def.type, def.description)
  }));

  function getEnhancedDescription(type: BlockType, originalDesc: string): string {
    const descriptions: Record<string, string> = {
      // Heroes
      'hero': 'Sección principal con título y gradiente personalizable para crear impacto visual',
      'hero-gradient': 'Hero con gradientes dinámicos y efectos visuales modernos',
      'hero-image': 'Hero con imagen de fondo y overlay configurable para máximo impacto',
      'hero-video': 'Hero con video de fondo autoplay y controles avanzados',
      'hero-split': 'Hero dividido en dos columnas con imagen y contenido balanceado',
      'hero-minimal': 'Hero limpio y minimalista para diseños elegantes y sofisticados',
      
      // Headers
      'header1': 'Título principal para secciones importantes con jerarquía visual clara',
      'header2': 'Subtítulo para organizar contenido jerárquicamente',
      'title-large': 'Título de gran impacto visual con múltiples estilos y efectos',
      'subtitle': 'Subtítulo descriptivo con opciones de tamaño y color personalizables',
      
      // Text
      'text': 'Párrafo de texto estándar para contenido principal con formato rico',
      'text-highlight': 'Texto destacado con fondos de colores llamativos y efectos',
      'quote': 'Citas inspiradoras con autor y estilos personalizables elegantes',
      'list': 'Listas con bullets o números y colores customizables avanzados',
      
      // Multimedia
      'image': 'Imágenes con caption, tamaños y efectos visuales profesionales',
      'video-embed': 'Videos de YouTube/Vimeo responsive y configurables',
      'gallery': 'Galería de imágenes con grid personalizable y efectos hover',
      
      // Interactive
      'button': 'Botones de acción con múltiples estilos, tamaños y animaciones',
      'card': 'Tarjetas con imagen, contenido y botón de acción elegantes',
      
      // Layout
      'divider': 'Separadores visuales con estilos y colores personalizables',
      'spacer': 'Espacios en blanco para mejorar el layout y respiración visual',
      
      // Content
      'code': 'Bloques de código con sintaxis highlighting y temas',
      'prompt-example': 'Ejemplos destacados para tutoriales y documentación',
      'pro-tip': 'Consejos importantes con iconos y colores llamativos',
      'download': 'Sección de archivos descargables múltiples organizados',
      'file-download': 'Archivo individual descargable con icono y metadatos',
      'key-components': 'Lista de componentes técnicos importantes estructurados',
      'feature-cards': 'Grid de características con iconos y descripciones atractivas'
    };
    return descriptions[type] || originalDesc;
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      Type, AlignLeft, List, MessageSquare, Lightbulb, Code, Download, Package, Grid3X3,
      ImageIcon, Palette, Video, Columns, Minus, Heading1, Heading2, Highlighter, Quote,
      Images, MousePointer, CreditCard, Space, Star, Zap, Heart, Users, Calendar, Clock,
      MapPin, Phone, Mail, Globe, Shield, Award, Target, TrendingUp, BarChart, PieChart,
      Activity, Briefcase, Building, Home, Car, Plane, Camera, Music, Gamepad2, Coffee,
      Pizza, ShoppingCart, CreditCardIcon, Wallet, Gift, Tag, Bookmark, Flag, Bell,
      Settings, Lock, Key, Eye, EyeOff, Search, Filter, Sort, Refresh, Upload,
      DownloadIcon, Share, Link, Copy, Scissors, Clipboard, FileText, Folder, Archive,
      Trash, Edit, Save, Plus, X, Check, AlertTriangle, Info, HelpCircle, ChevronRight,
      ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
      ExternalLink, Maximize, Minimize, RotateCcw, RotateCw, ZoomIn, ZoomOut, Move,
      Layers, Layout, Grid, Sidebar, Menu, MoreHorizontal, MoreVertical, Sun, Moon,
      Cloud, CloudRain, Umbrella, Thermometer, Wind, Snowflake, Sunrise, Sunset
    };
    return iconMap[iconName] || Type;
  };

  // Agrupar por categoría
  const groupedDefinitions = enhancedDefinitions.reduce((acc, def) => {
    if (!acc[def.category]) {
      acc[def.category] = [];
    }
    acc[def.category].push(def);
    return acc;
  }, {} as Record<string, BlockSubtype[]>);

  // Category display names and descriptions with better organization
  const categoryInfo: Record<string, { name: string; description: string; icon: string; order: number }> = {
    heroes: { 
      name: 'Heroes & Banners', 
      description: 'Secciones principales de gran impacto visual para captar atención',
      icon: '🎯',
      order: 1
    },
    headers: { 
      name: 'Títulos & Headers', 
      description: 'Títulos y subtítulos para organizar y estructurar contenido',
      icon: '📝',
      order: 2
    },
    text: { 
      name: 'Contenido Textual', 
      description: 'Elementos de texto, párrafos y contenido escrito',
      icon: '✍️',
      order: 3
    },
    multimedia: { 
      name: 'Multimedia & Visual', 
      description: 'Imágenes, videos y contenido visual interactivo',
      icon: '🎬',
      order: 4
    },
    interactive: { 
      name: 'Elementos Interactivos', 
      description: 'Botones, enlaces y elementos con los que el usuario interactúa',
      icon: '🔗',
      order: 5
    },
    layout: { 
      name: 'Layout & Estructura', 
      description: 'Elementos de diseño, separadores y estructura visual',
      icon: '🎨',
      order: 6
    },
    content: { 
      name: 'Contenido Especializado', 
      description: 'Bloques especializados para contenido técnico y educativo',
      icon: '🛠️',
      order: 7
    },
    files: { 
      name: 'Archivos & Descargas', 
      description: 'Gestión y descarga de archivos y documentos',
      icon: '📁',
      order: 8
    }
  };

  // Sort categories by order
  const sortedCategories = Object.entries(groupedDefinitions).sort(([a], [b]) => {
    const orderA = categoryInfo[a]?.order || 999;
    const orderB = categoryInfo[b]?.order || 999;
    return orderA - orderB;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agregar Nuevo Bloque</h2>
            <p className="text-gray-600">Elige el tipo de contenido que quieres añadir a tu artículo</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-8">
          {sortedCategories.map(([category, categoryDefinitions]) => (
            <div key={category}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
                  <span className="text-2xl">{categoryInfo[category]?.icon || '📦'}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {categoryInfo[category]?.name || category}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {categoryInfo[category]?.description || 'Elementos de esta categoría'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {categoryDefinitions.map((definition) => {
                  const Icon = getIconComponent(definition.icon);
                  return (
                    <button
                      key={definition.type}
                      onClick={() => onAdd(definition.type)}
                      className="group p-5 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 text-left hover:shadow-lg hover:scale-105 transform"
                    >
                      <div className="flex items-start mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mr-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                          <Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-900 transition-colors">
                            {definition.name}
                          </h4>
                          <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                            {definition.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {definition.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-3">💡 Consejos para crear contenido excepcional:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-blue-800">
                <div>
                  <p className="font-semibold mb-1">🎯 <strong>Heroes:</strong></p>
                  <p>Úsalos para crear impacto visual al inicio de secciones importantes</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">📝 <strong>Headers:</strong></p>
                  <p>Organiza tu contenido jerárquicamente para mejor legibilidad</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🎨 <strong>Layout:</strong></p>
                  <p>Usa separadores y espaciadores para mejorar la respiración visual</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🎬 <strong>Multimedia:</strong></p>
                  <p>Combina texto con imágenes y videos para mayor engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlockModal;