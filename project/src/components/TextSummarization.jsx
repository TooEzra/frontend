import React, { useState } from 'react';
import { FileText, Upload, Zap, Copy, Check, Download } from 'lucide-react';
import FileUpload from './FileUpload';

const TextSummarization = () => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [summaryLanguage, setSummaryLanguage] = useState('en');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'ar', name: 'Arabic' },
  ];

  const lengthOptions = [
    { value: 'short', name: 'Short (1-2 sentences)', ratio: '10%' },
    { value: 'medium', name: 'Medium (3-5 sentences)', ratio: '25%' },
    { value: 'long', name: 'Long (6-10 sentences)', ratio: '40%' },
  ];

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    
    if (selectedFile.type === 'text/plain') {
      const text = await selectedFile.text();
      setInputText(text);
    }
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock summaries based on language and length
    const mockSummaries = {
      'en-short': 'The city council approved a new infrastructure development plan focusing on road improvements and public transportation.',
      'en-medium': 'The city council approved a comprehensive infrastructure development plan that includes major road improvements, construction of a new community center, and enhanced public transportation options. The budget allocation of $2.5 million has been secured for these projects. Citizens expressed support for the initiatives while raising concerns about construction timelines.',
      'en-long': 'During today\'s city council meeting, officials approved a comprehensive infrastructure development plan that will significantly impact the community over the next two years. The plan includes major road improvements on Main Street and Oak Avenue, construction of a state-of-the-art community center with recreational facilities, and the introduction of enhanced public transportation options including new bus routes. The total budget allocation of $2.5 million has been secured through a combination of federal grants and local funding. While citizens expressed strong support for these initiatives, they also raised important concerns about construction timelines and potential traffic disruptions. The mayor assured residents that all projects will be completed with minimal impact on daily life.',
      'sw-short': 'Baraza la jiji limeidhinisha mpango wa maendeleo ya miundombinu unaoonyesha uboreshaji wa barabara na usafiri wa umma.',
      'sw-medium': 'Baraza la jiji limeidhinisha mpango mkubwa wa maendeleo ya miundombinu unaojumuisha uboreshaji wa barabara, ujenzi wa kituo kipya cha kijamii, na uboreshaji wa huduma za usafiri wa umma. Mgao wa bajeti ya dola milioni 2.5 umehakikishwa kwa miradi hii. Wananchi walionyesha uunga mkono kwa miradi hii lakini pia walitoa wasiwasi kuhusu ratiba za ujenzi.',
      'sw-long': 'Katika mkutano wa leo wa baraza la jiji, maafisa walidhinisha mpango mkubwa wa maendeleo ya miundombinu ambao utaathiri jamii kwa kipindi cha miaka miwili ijayo. Mpango huu unajumuisha uboreshaji mkubwa wa barabara za Main Street na Oak Avenue, ujenzi wa kituo cha kijamii cha kisasa chenye vifaa vya burudani, na kuanzishwa kwa huduma bora za usafiri wa umma ikiwa ni pamoja na njia mpya za mabasi. Jumla ya mgao wa bajeti ya dola milioni 2.5 umehakikishwa kupitia mchanganyiko wa misaada ya shirikisho na ufupi wa ndani. Ingawa wananchi walionyesha uunga mkono mkubwa kwa miradi hii, pia walitoa wasiwasi muhimu kuhusu ratiba za ujenzi na uwezekano wa usumbufu wa magari.'
    };

    const key = `${summaryLanguage}-${summaryLength}`;
    setSummary(mockSummaries[key] || `Summary in ${summaryLanguage} (${summaryLength} length): ${inputText.substring(0, 200)}...`);
    setIsProcessing(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const downloadSummary = () => {
    const content = `ORIGINAL TEXT\n\n${inputText}\n\n\nSUMMARY (${languages.find(l => l.code === summaryLanguage)?.name} - ${lengthOptions.find(l => l.value === summaryLength)?.name})\n\n${summary}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Text Summarization</h2>
        <p className="text-gray-600">Upload documents or paste text to get AI-powered summaries</p>
      </div>

      <div className="space-y-8">
        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document (Optional)</h3>
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedTypes={['.txt', '.docx', '.pdf']}
            maxSize={10}
            icon={FileText}
            title="Upload Text Document"
            description="Drag and drop or click to select text files (TXT, DOCX, PDF)"
          />
          
          {file && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">{file.name}</p>
                  <p className="text-sm text-green-700">
                    File loaded successfully • {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Text to Summarize</h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type your text here..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {inputText.length} characters • {inputText.split(' ').filter(word => word.length > 0).length} words
            </span>
          </div>
        </div>

        {/* Summarization Settings */}
        {inputText && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary Language
                </label>
                <select
                  value={summaryLanguage}
                  onChange={(e) => setSummaryLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary Length
                </label>
                <select
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {lengthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSummarize}
              disabled={!inputText.trim() || isProcessing}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Summary
                </>
              )}
            </button>
          </div>
        )}

        {/* Summary Results */}
        {summary && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadSummary}
                  className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {languages.find(l => l.code === summaryLanguage)?.name} • {lengthOptions.find(l => l.value === summaryLength)?.name}
                </span>
              </div>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{summary}</p>
            </div>

            {/* Summary Statistics */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{summary.length}</p>
                <p className="text-sm text-gray-600">Characters</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {summary.split(' ').filter(word => word.length > 0).length}
                </p>
                <p className="text-sm text-gray-600">Words</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((summary.length / inputText.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Compression</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.ceil(summary.split(' ').length / 200)}
                </p>
                <p className="text-sm text-gray-600">Min Read</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummarization;