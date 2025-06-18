import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check } from 'lucide-react';

const TextTranslation = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('sw');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate API call to translation service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock translation result
    const mockTranslations = {
      'en-sw': 'Habari za haraka: Uchaguzi mkuu umefanyika leo na matokeo yanatarajiwa mapema.',
      'sw-en': 'Breaking news: The general election took place today and results are expected soon.',
      'en-fr': 'Nouvelles de dernière minute: L\'élection générale a eu lieu aujourd\'hui et les résultats sont attendus bientôt.',
      'sw-fr': 'Dernières nouvelles: L\'élection générale a eu lieu aujourd\'hui et les résultats sont attendus bientôt.'
    };
    
    const key = `${sourceLang === 'auto' ? 'en' : sourceLang}-${targetLang}`;
    setTranslatedText(mockTranslations[key] || `Translated text from ${sourceLang} to ${targetLang}: ${sourceText}`);
    setIsTranslating(false);
  };

  const swapLanguages = () => {
    if (sourceLang === 'auto') return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Text Translation</h2>
        <p className="text-gray-600">Translate text between multiple languages instantly</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Language Selection */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapLanguages}
            disabled={sourceLang === 'auto'}
            className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowRightLeft className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.filter(lang => lang.code !== 'auto').map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Text</label>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">{sourceText.length} characters</span>
              <button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTranslating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4 mr-2" />
                    Translate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Translated Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
            <div className="relative">
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              />
              {translatedText && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            {translatedText && (
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">{translatedText.length} characters</span>
                {copied && (
                  <span className="text-sm text-green-600">Copied to clipboard!</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Translation Tips */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Translation Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use "Auto-detect" to automatically identify the source language</li>
            <li>• For better accuracy, provide context and complete sentences</li>
            <li>• Technical terms may need manual verification</li>
            <li>• Consider cultural nuances when translating for different audiences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextTranslation;