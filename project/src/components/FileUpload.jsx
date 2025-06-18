import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = [], 
  maxSize = 10, 
  icon: Icon = Upload,
  title = "Upload File",
  description = "Drag and drop or click to select files"
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    setError('');

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type if specified
    if (acceptedTypes.length > 0) {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileName.endsWith(type.toLowerCase());
        }
        return fileType.match(type.replace('*', '.*'));
      });

      if (!isValidType) {
        setError(`Please select a valid file type: ${acceptedTypes.join(', ')}`);
        return false;
      }
    }

    return true;
  };

  const handleFileSelection = (file) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          accept={acceptedTypes.join(',')}
          className="hidden"
        />
        
        <div className="flex flex-col items-center">
          <Icon className={`h-12 w-12 mb-4 ${error ? 'text-red-500' : 'text-gray-400'}`} />
          <h3 className={`text-lg font-medium mb-2 ${error ? 'text-red-700' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm mb-4 ${error ? 'text-red-600' : 'text-gray-600'}`}>
            {description}
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Max size: {maxSize}MB</span>
            {acceptedTypes.length > 0 && (
              <>
                <span>•</span>
                <span>Types: {acceptedTypes.join(', ')}</span>
              </>
            )}
          </div>
        </div>

        {isDragOver && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <div className="text-blue-600 font-medium">Drop your file here</div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;