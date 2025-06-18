import React, { useState } from 'react';
import { Newspaper, Languages, FileText, Mic, Camera, Clock, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TextTranslation from './components/TextTranslation';
import AudioTranscription from './components/AudioTranscription';
import TextSummarization from './components/TextSummarization';
import ImageOCR from './components/ImageOCR';
import ReportSubmission from './components/ReportSubmission';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Newspaper },
    { id: 'reports', name: 'Submit Report', icon: FileText },
    { id: 'translate', name: 'Translate Text', icon: Languages },
    { id: 'transcribe', name: 'Audio/Video', icon: Mic },
    { id: 'summarize', name: 'Summarize', icon: FileText },
    { id: 'ocr', name: 'Image OCR', icon: Camera },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <ReportSubmission />;
      case 'translate':
        return <TextTranslation />;
      case 'transcribe':
        return <AudioTranscription />;
      case 'summarize':
        return <TextSummarization />;
      case 'ocr':
        return <ImageOCR />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Navigation 
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-64">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {renderActiveComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;