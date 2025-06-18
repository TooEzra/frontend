import React, { useState, useRef } from 'react';
import { Mic, Upload, Play, Pause, FileAudio, Video, Download, Languages } from 'lucide-react';
import FileUpload from './FileUpload';

const AudioTranscription = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [summary, setSummary] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'ar', name: 'Arabic' },
  ];

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setTranscription('');
    setTranslation('');
    setSummary('');
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);

    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock transcription result
    const mockTranscription = `
Today's press conference addressed several key issues affecting our community. 
The mayor announced new infrastructure developments including road improvements 
and the construction of a new community center. The budget allocation for these 
projects has been approved by the city council. Citizens expressed concerns about 
traffic congestion and requested more public transportation options. The mayor 
assured residents that these concerns are being taken seriously and solutions 
are being developed. The meeting concluded with a Q&A session where local 
reporters asked about timeline and funding sources.
    `.trim();

    setTranscription(mockTranscription);

    // Mock translation based on target language
    if (targetLanguage === 'sw') {
      setTranslation(`
Mkutano wa waandishi wa habari wa leo ulijadili masuala kadhaa muhimu yanayoathiri jamii yetu. 
Meya alitangaza maendeleo mapya ya miundombinu ikiwa ni pamoja na uboreshaji wa barabara 
na ujenzi wa kituo kipya cha kijamii. Ugavi wa bajeti kwa miradi hii umepitishwa na baraza la jiji. 
Wananchi walionyesha wasiwasi kuhusu msongamano wa magari na kuomba zaidi ya vifaa vya usafiri wa umma. 
Meya aliwahakikishia wakazi kwamba wasiwasi huu unachukuliwa kwa uzito na suluhu zinajadiliwa.
      `.trim());
    }

    // Mock summary
    setSummary(`
Key Points Summary:
• Mayor announced new infrastructure projects (roads, community center)
• City council approved budget allocation
• Citizens raised traffic congestion concerns  
• Public transportation improvements requested
• Solutions being developed for community concerns
• Q&A session covered project timelines and funding
    `.trim());

    setIsProcessing(false);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadTranscription = () => {
    const content = `TRANSCRIPTION\n\n${transcription}\n\n${translation ? `TRANSLATION (${languages.find(l => l.code === targetLanguage)?.name})\n\n${translation}\n\n` : ''}${summary ? `SUMMARY\n\n${summary}` : ''}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Audio & Video Transcription</h2>
        <p className="text-gray-600">Upload audio or video files to get transcriptions, translations, and summaries</p>
      </div>

      <div className="space-y-8">
        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Media File</h3>
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedTypes={['audio/*', 'video/*']}
            maxSize={100}
            icon={FileAudio}
            title="Upload Audio or Video File"
            description="Drag and drop or click to select audio/video files (MP3, MP4, WAV, etc.)"
          />
          
          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {file.type.startsWith('video/') ? (
                    <Video className="h-8 w-8 text-blue-600 mr-3" />
                  ) : (
                    <FileAudio className="h-8 w-8 text-blue-600 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                {file.type.startsWith('audio/') && (
                  <button
                    onClick={togglePlayback}
                    className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 mr-1" />
                    ) : (
                      <Play className="h-5 w-5 mr-1" />
                    )}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                )}
              </div>
              
              {file.type.startsWith('audio/') && (
                <audio
                  ref={audioRef}
                  src={URL.createObjectURL(file)}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              )}
            </div>
          )}
        </div>

        {/* Processing Options */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Translation Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Transcription
                </>
              )}
            </button>
          </div>
        )}

        {/* Results */}
        {transcription && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Results</h3>
              <button
                onClick={downloadTranscription}
                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>

            <div className="space-y-6">
              {/* Transcription */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Transcription</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{transcription}</p>
                </div>
              </div>

              {/* Translation */}
              {translation && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Languages className="h-4 w-4 mr-2" />
                    Translation ({languages.find(l => l.code === targetLanguage)?.name})
                  </h4>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{translation}</p>
                  </div>
                </div>
              )}

              {/* Summary */}
              {summary && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioTranscription;