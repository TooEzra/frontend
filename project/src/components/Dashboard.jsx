import React from 'react';
import { FileText, Languages, Mic, Camera, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Reports Submitted', value: '24', icon: FileText, color: 'bg-blue-500' },
    { name: 'Translations', value: '156', icon: Languages, color: 'bg-emerald-500' },
    { name: 'Transcriptions', value: '89', icon: Mic, color: 'bg-purple-500' },
    { name: 'OCR Extractions', value: '67', icon: Camera, color: 'bg-amber-500' },
  ];

  const recentActivities = [
    { id: 1, type: 'report', title: 'Breaking News: Local Election Results', time: '2 hours ago' },
    { id: 2, type: 'translation', title: 'Interview Translated to Kiswahili', time: '4 hours ago' },
    { id: 3, type: 'transcription', title: 'Press Conference Audio Transcribed', time: '6 hours ago' },
    { id: 4, type: 'ocr', title: 'Document Text Extracted', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your AI-powered journalism workspace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-white p-8">
        <h3 className="text-2xl font-bold mb-4">Quick Start</h3>
        <p className="text-blue-100 mb-6">
          Get started with AI-powered journalism tools. Upload content, translate languages, 
          or transcribe audio to enhance your reporting workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <FileText className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Submit Report</h4>
            <p className="text-sm text-blue-100">Create timestamped reports</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <Languages className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Translate</h4>
            <p className="text-sm text-blue-100">Multi-language translation</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <Mic className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Transcribe</h4>
            <p className="text-sm text-blue-100">Audio to text conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;