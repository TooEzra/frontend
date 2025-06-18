import React, { useState } from 'react';
import { Camera, Upload, Eye, Languages, FileText, Download, Copy, Check } from 'lucide-react';
import FileUpload from './FileUpload';

const ImageOCR = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [summary, setSummary] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('sw');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('extract');
  const [copied, setCopied] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'ar', name: 'Arabic' },
  ];

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setExtractedText('');
    setTranslatedText('');
    setSummary('');

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleExtractText = async () => {
    if (!file) return;

    setIsProcessing(true);
    setActiveTab('extract');

    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock OCR result
    const mockOCRText = `
PRESS RELEASE
City Council Meeting Minutes
Date: December 15, 2024

AGENDA ITEMS DISCUSSED:

1. Infrastructure Development Plan
   - Road improvements on Main Street
   - New community center construction
   - Budget allocation: $2.5 million approved

2. Public Transportation Enhancement
   - Additional bus routes proposed
   - Citizens requested improved schedule
   - Implementation timeline: Q2 2025

3. Environmental Initiatives
   - Tree planting program expansion
   - Recycling center upgrades
   - Green energy transition planning

CITIZEN CONCERNS:
- Traffic congestion during construction
- Parking availability downtown
- Timeline transparency requested

NEXT MEETING: January 15, 2025, 7:00 PM
Location: City Hall Conference Room A

For more information, contact:
City Clerk Office
Phone: (555) 123-4567
Email: clerk@citycouncil.gov
    `.trim();

    setExtractedText(mockOCRText);
    setIsProcessing(false);
  };

  const handleTranslate = async () => {
    if (!extractedText) return;

    setIsProcessing(true);
    setActiveTab('translate');

    // Simulate translation processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock translation based on target language
    const mockTranslations = {
      'sw': `
TAARIFA ZA VYOMBO VYA HABARI
Muhtasari wa Mkutano wa Baraza la Jiji
Tarehe: Desemba 15, 2024

MAMBO YALIYOJADILIWA:

1. Mpango wa Maendeleo ya Miundombinu
   - Uboreshaji wa barabara za Main Street
   - Ujenzi wa kituo kipya cha kijamii
   - Mgao wa bajeti: Dola milioni 2.5 umeidhinishwa

2. Uboreshaji wa Usafiri wa Umma
   - Njia za ziada za mabasi zimependekezwa
   - Wananchi waliomba ratiba bora
   - Ratiba ya utekelezaji: Robo ya 2, 2025

3. Miradi ya Mazingira
   - Upanuzi wa mpango wa kupanda miti
   - Uboreshaji wa kituo cha uchakataji
   - Upangaji wa mpito wa nishati safi

WASIWASI WA WANANCHI:
- Msongamano wa magari wakati wa ujenzi
   - Upatikanaji wa maegesho ya magari mjini
   - Uwazi wa ratiba ulioombwa

MKUTANO UJAO: Januari 15, 2025, Saa 1:00 jioni
Mahali: Chumba cha Mikutano A, Jumba la Jiji

Kwa maelezo zaidi, wasiliana na:
Ofisi ya Katibu wa Jiji
Simu: (555) 123-4567
Barua pepe: clerk@citycouncil.gov
      `.trim(),
      'fr': `
COMMUNIQUÉ DE PRESSE
Procès-verbal de la Réunion du Conseil Municipal
Date: 15 décembre 2024

POINTS À L'ORDER DU JOUR DISCUTÉS:

1. Plan de Développement des Infrastructures
   - Améliorations routières sur Main Street
   - Construction d'un nouveau centre communautaire
   - Allocation budgétaire: 2,5 millions de dollars approuvés

2. Amélioration des Transports Publics
   - Lignes de bus supplémentaires proposées
   - Les citoyens ont demandé un meilleur horaire
   - Calendrier de mise en œuvre: T2 2025

3. Initiatives Environnementales
   - Expansion du programme de plantation d'arbres
   - Améliorations du centre de recyclage
   - Planification de la transition énergétique verte

PRÉOCCUPATIONS DES CITOYENS:
- Congestion routière pendant la construction
- Disponibilité du stationnement au centre-ville
- Transparence du calendrier demandée

PROCHAINE RÉUNION: 15 janvier 2025, 19h00
Lieu: Salle de conférence A de l'Hôtel de Ville
      `.trim()
    };

    setTranslatedText(mockTranslations[targetLanguage] || mockTranslations['sw']);
    setIsProcessing(false);
  };

  const handleSummarize = async () => {
    if (!extractedText) return;

    setIsProcessing(true);
    setActiveTab('summarize');

    // Simulate summarization processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock summary
    const mockSummary = `
KEY POINTS FROM CITY COUNCIL MEETING:

• Infrastructure Plan: $2.5M approved for road improvements and community center
• Public Transit: New bus routes proposed for Q2 2025 implementation  
• Environmental Focus: Tree planting expansion and recycling upgrades planned
• Citizen Concerns: Traffic congestion and parking availability during construction
• Next Meeting: January 15, 2025 at City Hall

IMPACT: Significant community improvements planned with citizen input considered.
    `.trim();

    setSummary(mockSummary);
    setIsProcessing(false);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const downloadResults = () => {
    const content = `IMAGE OCR RESULTS\n\nEXTRACTED TEXT:\n${extractedText}\n\n${translatedText ? `TRANSLATION (${languages.find(l => l.code === targetLanguage)?.name}):\n${translatedText}\n\n` : ''}${summary ? `SUMMARY:\n${summary}` : ''}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ocr-results-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Image OCR & Text Extraction</h2>
        <p className="text-gray-600">Upload images to extract text, translate, and summarize content</p>
      </div>

      <div className="space-y-8">
        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h3>
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedTypes={['image/*']}
            maxSize={10}
            icon={Camera}
            title="Upload Image File"
            description="Drag and drop or click to select images (JPG, PNG, PDF, etc.)"
          />
          
          {file && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Camera className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleExtractText}
                  disabled={isProcessing}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
                >
                  {isProcessing && activeTab === 'extract' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Extract Text
                    </>
                  )}
                </button>
              </div>
              
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    className="max-w-full h-auto max-h-96 rounded-lg border border-gray-200 object-contain mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {extractedText && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Results</h3>
              <button
                onClick={downloadResults}
                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('extract')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'extract'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Extracted Text
              </button>
              <button
                onClick={() => setActiveTab('translate')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'translate'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Languages className="h-4 w-4 mr-2" />
                Translation
              </button>
              <button
                onClick={() => setActiveTab('summarize')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'summarize'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Summary
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Extracted Text Tab */}
              {activeTab === 'extract' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Extracted Text</h4>
                    <button
                      onClick={() => copyToClipboard(extractedText, 'extract')}
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      {copied === 'extract' ? (
                        <Check className="h-4 w-4 mr-1 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      {copied === 'extract' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {extractedText}
                    </pre>
                  </div>
                </div>
              )}

              {/* Translation Tab */}
              {activeTab === 'translate' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-medium text-gray-900">Translation</h4>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleTranslate}
                        disabled={isProcessing}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        {isProcessing && activeTab === 'translate' ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages className="h-3 w-3 mr-2" />
                            Translate
                          </>
                        )}
                      </button>
                    </div>
                    {translatedText && (
                      <button
                        onClick={() => copyToClipboard(translatedText, 'translate')}
                        className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        {copied === 'translate' ? (
                          <Check className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        {copied === 'translate' ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                  {translatedText ? (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {translatedText}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <Languages className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Click "Translate" to translate the extracted text</p>
                    </div>
                  )}
                </div>
              )}

              {/* Summary Tab */}
              {activeTab === 'summarize' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-medium text-gray-900">Summary</h4>
                      <button
                        onClick={handleSummarize}
                        disabled={isProcessing}
                        className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        {isProcessing && activeTab === 'summarize' ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2" />
                            Summarizing...
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 mr-2" />
                            Summarize
                          </>
                        )}
                      </button>
                    </div>
                    {summary && (
                      <button
                        onClick={() => copyToClipboard(summary, 'summary')}
                        className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        {copied === 'summary' ? (
                          <Check className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        {copied === 'summary' ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                  {summary ? (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {summary}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Click "Summarize" to generate a summary of the extracted text</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageOCR;