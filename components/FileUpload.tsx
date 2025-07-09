import React, { useState, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      // Avoid adding duplicate files
      const uniqueNewFiles = Array.from(newFiles).filter(
        newFile => !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
      );
      setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    if(e.target) e.target.value = '';
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'fa-file-image';
    if (fileType === 'application/pdf') return 'fa-file-pdf';
    if (fileType.includes('word')) return 'fa-file-word';
    return 'fa-file-alt';
  };

  return (
    <div>
        <div 
          role="button"
          aria-label="File upload drop zone"
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input 
            ref={inputRef} 
            type="file" 
            multiple 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
          <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 dark:text-gray-500 mb-3"></i>
          <p className="text-gray-600 dark:text-gray-300 font-semibold">{t('fileUpload.dropzone')}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('fileUpload.supported')}</p>
        </div>
        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{t('fileUpload.selected', files.length)}</h4>
            <ul className="space-y-3">
              {files.map(file => (
                <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 animate-fade-in">
                  <div className="flex items-center overflow-hidden mr-2">
                    <i className={`fas ${getFileIcon(file.type)} text-xl text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0`}></i>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={file.name}>{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(file.name)} 
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 flex-shrink-0"
                    aria-label={`Remove ${file.name}`}
                  >
                    <i className="fas fa-times-circle"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default FileUpload;