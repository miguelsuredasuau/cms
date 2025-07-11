import React from 'react';
import { PostData } from '../../types/content';
import { Palette, Type, Image, Download, Key, Settings } from 'lucide-react';
import { AIContentGenerator, AIGeneratorSettings } from '../../services/AIContentGenerator';

interface BrandingEditorProps {
  article: PostData;
  onUpdate: (updates: Partial<PostData>) => void;
}

const BrandingEditor: React.FC<BrandingEditorProps> = ({ article, onUpdate }) => {
  const [aiSettings, setAiSettings] = React.useState<AIGeneratorSettings | null>(null);
  const [showAISettings, setShowAISettings] = React.useState(false);

  React.useEffect(() => {
    loadAISettings();
  }, []);

  const loadAISettings = async () => {
    try {
      const settings = await AIContentGenerator.getSettings();
      setAiSettings(settings);
    } catch (error) {
      console.error('Error loading AI settings:', error);
    }
  };

  const saveAISettings = async (settings: AIGeneratorSettings) => {
    try {
      await AIContentGenerator.saveSettings(settings);
      setAiSettings(settings);
      setShowAISettings(false);
    } catch (error) {
      console.error('Error saving AI settings:', error);
    }
  };

  const updateBranding = (key: string, value: any) => {
    onUpdate({
      branding: { ...article.branding, [key]: value }
    });
  };

  const updateGlobalBranding = (key: string, value: any) => {
    onUpdate({
      globalBranding: { ...article.globalBranding, [key]: value }
    });
  };

  const exportBrandingSchema = () => {
    const schema = {
      globalBranding: article.globalBranding,
      articleBranding: article.branding,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(schema, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `branding-${article.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
          <button
            onClick={exportBrandingSchema}
            className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center"
          >
            <Download className="w-3 h-3 mr-1" />
            Exportar
          </button>
        </div>
      </div>

      {/* AI Settings Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Key className="w-4 h-4 mr-2" />
          Credenciales de IA
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">OpenAI API Key</p>
              <p className="text-xs text-gray-500">
                {aiSettings?.openaiApiKey ? 'Configurada ✓' : 'No configurada'}
              </p>
            </div>
            <button
              onClick={() => setShowAISettings(true)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
            >
              <Settings className="w-3 h-3 mr-1" />
              {aiSettings?.openaiApiKey ? 'Editar' : 'Configurar'}
            </button>
          </div>
          
          {aiSettings && (
            <div className="text-xs text-gray-500 space-y-1">
              <div>Modelo: {aiSettings.model}</div>
              <div>Creatividad: {aiSettings.temperature}</div>
            </div>
          )}
        </div>
      </div>

      {/* Global Branding */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Branding Global
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              value={article.globalBranding?.logoUrl || ''}
              onChange={(e) => updateGlobalBranding('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={article.globalBranding?.primaryColor || '#6366f1'}
                onChange={(e) => updateGlobalBranding('primaryColor', e.target.value)}
                className="w-12 h-8 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={article.globalBranding?.primaryColor || '#6366f1'}
                onChange={(e) => updateGlobalBranding('primaryColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={article.globalBranding?.secondaryColor || '#8b5cf6'}
                onChange={(e) => updateGlobalBranding('secondaryColor', e.target.value)}
                className="w-12 h-8 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={article.globalBranding?.secondaryColor || '#8b5cf6'}
                onChange={(e) => updateGlobalBranding('secondaryColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuente Principal</label>
            <select
              value={article.globalBranding?.fontFamily || 'Inter'}
              onChange={(e) => updateGlobalBranding('fontFamily', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Article Branding */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Branding del Artículo
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color de Acento</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={article.branding?.accentColor || '#f59e0b'}
                onChange={(e) => updateBranding('accentColor', e.target.value)}
                className="w-12 h-8 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={article.branding?.accentColor || '#f59e0b'}
                onChange={(e) => updateBranding('accentColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Cabecera</label>
            <input
              type="url"
              value={article.branding?.headerImage || ''}
              onChange={(e) => updateBranding('headerImage', e.target.value)}
              placeholder="https://images.pexels.com/..."
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estilo de Tema</label>
            <select
              value={article.branding?.theme || 'modern'}
              onChange={(e) => updateBranding('theme', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="modern">Moderno</option>
              <option value="classic">Clásico</option>
              <option value="minimal">Minimalista</option>
              <option value="bold">Audaz</option>
              <option value="elegant">Elegante</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Vista Previa</h5>
        <div 
          className="p-4 rounded-lg"
          style={{
            backgroundColor: article.globalBranding?.primaryColor + '10' || '#6366f110',
            borderLeft: `4px solid ${article.globalBranding?.primaryColor || '#6366f1'}`
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            {article.globalBranding?.logoUrl && (
              <img 
                src={article.globalBranding.logoUrl} 
                alt="Logo" 
                className="w-6 h-6 object-contain"
              />
            )}
            <span 
              className="font-semibold"
              style={{ 
                color: article.globalBranding?.primaryColor || '#6366f1',
                fontFamily: article.globalBranding?.fontFamily || 'Inter'
              }}
            >
              {article.metadata.title}
            </span>
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: article.branding?.accentColor || '#f59e0b',
              fontFamily: article.globalBranding?.fontFamily || 'Inter'
            }}
          >
            Ejemplo de contenido con el branding aplicado
          </p>
        </div>
      </div>

      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>✨ Características:</strong>
        </p>
        <ul className="text-xs text-green-700 mt-1 space-y-1">
          <li>• Branding global para toda la plataforma</li>
          <li>• Branding específico por artículo</li>
          <li>• Vista previa en tiempo real</li>
          <li>• Exportación de esquemas de color</li>
        </ul>
      </div>

      {/* AI Settings Modal */}
      {showAISettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Configuración de IA</h4>
              <button
                onClick={() => setShowAISettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const settings: AIGeneratorSettings = {
                  openaiApiKey: formData.get('apiKey') as string,
                  model: formData.get('model') as any,
                  temperature: parseFloat(formData.get('temperature') as string),
                  maxTokens: parseInt(formData.get('maxTokens') as string)
                };
                saveAISettings(settings);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key de OpenAI
                </label>
                <input
                  type="password"
                  name="apiKey"
                  defaultValue={aiSettings?.openaiApiKey || ''}
                  placeholder="sk-..."
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modelo
                  </label>
                  <select
                    name="model"
                    defaultValue={aiSettings?.model || 'gpt-4'}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creatividad
                  </label>
                  <select
                    name="temperature"
                    defaultValue={aiSettings?.temperature || 0.7}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value={0.3}>Conservador</option>
                    <option value={0.7}>Balanceado</option>
                    <option value={1.0}>Creativo</option>
                  </select>
                </div>
              </div>
              
              <input type="hidden" name="maxTokens" value={aiSettings?.maxTokens || 2000} />
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAISettings(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingEditor;