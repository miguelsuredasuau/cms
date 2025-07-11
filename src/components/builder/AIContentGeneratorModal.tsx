import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Settings, FileText, Users, Target, Layers, Zap, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { AIContentGenerator } from '../../services/AIContentGenerator';
import { ContentGenerationRequest, AIGeneratorSettings, PostData } from '../../types/content';

interface AIContentGeneratorModalProps {
  onGenerate: (post: PostData) => void;
  onClose: () => void;
}

const AIContentGeneratorModal: React.FC<AIContentGeneratorModalProps> = ({ onGenerate, onClose }) => {
  const [step, setStep] = useState<'settings' | 'request' | 'generating' | 'complete'>('settings');
  const [settings, setSettings] = useState<AIGeneratorSettings>({
    openaiApiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  });
  const [request, setRequest] = useState<ContentGenerationRequest>({
    topic: '',
    description: '',
    targetAudience: '',
    contentType: 'article',
    includeChapters: false,
    chaptersCount: 3
  });
  const [files, setFiles] = useState<File[]>([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AIContentGenerator.getSettings();
      if (savedSettings) {
        setSettings(savedSettings);
        if (savedSettings.openaiApiKey) {
          setStep('request');
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AIContentGenerator.saveSettings(settings);
      setStep('request');
    } catch (error) {
      setError('Error al guardar la configuración');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateContent = async () => {
    if (!request.topic.trim()) {
      setError('El tema es obligatorio');
      return;
    }

    setGenerating(true);
    setProgress(0);
    setError(null);
    setStep('generating');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const generatedPost = await AIContentGenerator.generateContent({
        ...request,
        files
      });

      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        onGenerate(generatedPost);
        setStep('complete');
      }, 1000);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al generar contenido');
      setStep('request');
    } finally {
      setGenerating(false);
    }
  };

  const renderSettingsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Configuración de IA</h3>
        <p className="text-gray-600">Configura tu API key de OpenAI para generar contenido automáticamente</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key de OpenAI *
          </label>
          <input
            type="password"
            value={settings.openaiApiKey}
            onChange={(e) => setSettings(prev => ({ ...prev, openaiApiKey: e.target.value }))}
            placeholder="sk-..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Tu API key se guarda localmente y nunca se comparte
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
            <select
              value={settings.model}
              onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="gpt-4">GPT-4 (Recomendado)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Creatividad</label>
            <select
              value={settings.temperature}
              onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value={0.3}>Conservador (0.3)</option>
              <option value={0.7}>Balanceado (0.7)</option>
              <option value={1.0}>Creativo (1.0)</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Información importante:</p>
              <ul className="text-xs text-blue-800 mt-1 space-y-1">
                <li>• Necesitas una cuenta de OpenAI con créditos disponibles</li>
                <li>• El costo depende del modelo y longitud del contenido</li>
                <li>• GPT-4 genera mejor contenido pero es más costoso</li>
                <li>• Tu API key se almacena solo en tu navegador</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={saveSettings}
          disabled={!settings.openaiApiKey.trim()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );

  const renderRequestStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Generar Contenido con IA</h3>
        <p className="text-gray-600">Describe qué contenido quieres crear y la IA lo generará automáticamente</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Tema del contenido *
          </label>
          <input
            type="text"
            value={request.topic}
            onChange={(e) => setRequest(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="Ej: Cómo crear una aplicación React desde cero"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción adicional
          </label>
          <textarea
            value={request.description}
            onChange={(e) => setRequest(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Proporciona más contexto sobre lo que quieres cubrir..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Audiencia objetivo
            </label>
            <select
              value={request.targetAudience}
              onChange={(e) => setRequest(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccionar...</option>
              <option value="principiantes">Principiantes</option>
              <option value="intermedios">Nivel intermedio</option>
              <option value="avanzados">Nivel avanzado</option>
              <option value="desarrolladores">Desarrolladores</option>
              <option value="diseñadores">Diseñadores</option>
              <option value="general">Audiencia general</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-1" />
              Tipo de contenido
            </label>
            <select
              value={request.contentType}
              onChange={(e) => setRequest(prev => ({ ...prev, contentType: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="article">Artículo</option>
              <option value="tutorial">Tutorial</option>
              <option value="guide">Guía</option>
              <option value="documentation">Documentación</option>
            </select>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={request.includeChapters}
                onChange={(e) => setRequest(prev => ({ ...prev, includeChapters: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                <Layers className="w-4 h-4 inline mr-1" />
                Generar con capítulos y páginas
              </span>
            </label>
          </div>
          
          {request.includeChapters && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de capítulos
              </label>
              <input
                type="number"
                value={request.chaptersCount}
                onChange={(e) => setRequest(prev => ({ ...prev, chaptersCount: parseInt(e.target.value) || 3 }))}
                min="2"
                max="10"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Archivos de referencia (opcional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".txt,.pdf,.doc,.docx,.md"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
          >
            <Upload className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Subir archivos de referencia</span>
          </button>
          
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setStep('settings')}
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Configuración
        </button>
        <div className="space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={generateContent}
            disabled={!request.topic.trim() || generating}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generar Contenido
          </button>
        </div>
      </div>
    </div>
  );

  const renderGeneratingStep = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Loader className="w-10 h-10 text-white animate-spin" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Generando contenido...</h3>
      <p className="text-gray-600 mb-6">La IA está creando tu contenido personalizado</p>
      
      <div className="max-w-md mx-auto">
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">{progress}% completado</p>
      </div>

      <div className="mt-8 text-xs text-gray-500 space-y-1">
        <p>• Analizando el tema y contexto</p>
        <p>• Generando estructura del contenido</p>
        <p>• Creando bloques y secciones</p>
        <p>• Optimizando para tu audiencia</p>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">¡Contenido generado!</h3>
      <p className="text-gray-600 mb-6">Tu contenido ha sido creado exitosamente y está listo para editar</p>
      
      <button
        onClick={onClose}
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Ir al Editor
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Generador de Contenido IA</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'settings' && renderSettingsStep()}
          {step === 'request' && renderRequestStep()}
          {step === 'generating' && renderGeneratingStep()}
          {step === 'complete' && renderCompleteStep()}
        </div>
      </div>
    </div>
  );
};

export default AIContentGeneratorModal;