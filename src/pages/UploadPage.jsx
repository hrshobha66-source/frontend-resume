import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileCheck,
  Info
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { formatBytes } from '../utils/formatters';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const UploadPage = () => {
  const navigate = useNavigate();
  const { uploadedFile, setUploadedFile } = useResume();

  const [selectedFile, setSelectedFile] = useState(uploadedFile || null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(selectedFile ? 100 : 0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStepMessage, setAnalyzeStepMessage] = useState('');

  const fileInputRef = useRef(null);

  const validateAndSetFile = (file) => {
    setErrorMessage('');

    if (!file) return;

    // Check file extension
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isExtensionValid = ALLOWED_EXTENSIONS.includes(fileExtension);
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isExtensionValid && !isMimeValid) {
      setErrorMessage(`Invalid file format "${file.name}". Please upload only PDF, DOC, or DOCX documents.`);
      return;
    }

    // Check size (5MB)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(`File is too large (${formatBytes(file.size)}). Maximum allowed size is 5 MB.`);
      return;
    }

    // Set valid file
    const fileObject = {
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      lastModifiedDate: new Date().toLocaleDateString()
    };

    setSelectedFile(fileObject);
    setUploadProgress(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadSimulate = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(selectedFile);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const handleAnalyzeResume = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalyzeStepMessage('Extracting candidate profile and contact coordinates...');

    setTimeout(() => {
      setAnalyzeStepMessage('Parsing academic credentials and GPA benchmark...');
    }, 700);

    setTimeout(() => {
      setAnalyzeStepMessage('Categorizing technical competencies and project entities...');
    }, 1400);

    setTimeout(() => {
      setUploadedFile(selectedFile);
      setIsAnalyzing(false);
      navigate('/analysis');
    }, 2100);
  };

  const loadSampleResume = () => {
    const sample = {
      name: 'Alex_Johnson_Fresher_Resume_2024.pdf',
      size: 1420500,
      type: 'application/pdf',
      lastModifiedDate: new Date().toLocaleDateString()
    };
    setSelectedFile(sample);
    setUploadedFile(sample);
    setUploadProgress(100);
    setErrorMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          Step 1: Ingestion
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Upload Your Fresher Resume
        </h1>
        <p className="text-sm text-slate-500">
          Upload your resume in PDF or Word format to extract skills, calculate job fit, and evaluate career readiness.
        </p>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-fadeIn"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-rose-900">Upload Restriction</h4>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Box Card */}
      <Card className="border-slate-200/90 shadow-soft">
        <CardContent className="p-6 sm:p-10 space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200
              flex flex-col items-center justify-center space-y-4
              ${isDragging
                ? 'border-indigo-600 bg-indigo-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-file-input"
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-bold text-slate-900">
                Drag and drop your resume file here
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                or <span className="text-indigo-600 font-semibold underline underline-offset-2">browse files</span> from your computer
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <span className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-600 font-semibold">PDF</span>
              <span className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-600 font-semibold">DOC</span>
              <span className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-600 font-semibold">DOCX</span>
              <span>• Max 5 MB</span>
            </div>
          </div>

          {/* Quick sample resume loader */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Want to test without a file?</span>
            <button
              type="button"
              onClick={loadSampleResume}
              className="font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use Pre-loaded Fresher Resume
            </button>
          </div>

          {/* Selected File Card */}
          {selectedFile && (
            <div className="p-4 sm:p-5 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatBytes(selectedFile.size)} • Ready for analysis
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isUploading || isAnalyzing}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove file"
                  aria-label="Remove uploaded file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar if uploading */}
              {(isUploading || uploadProgress > 0) && (
                <div className="space-y-1 pt-1">
                  <ProgressBar
                    value={uploadProgress}
                    size="sm"
                    label={uploadProgress === 100 ? 'File uploaded successfully' : 'Uploading resume document'}
                    color={uploadProgress === 100 ? 'emerald' : 'indigo'}
                  />
                </div>
              )}
            </div>
          )}

          {/* Analyzing loading notification */}
          {isAnalyzing && (
            <div className="p-4 rounded-xl bg-indigo-900 text-white space-y-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-300 animate-spin" />
                <div className="text-sm font-semibold">AI Parser in progress...</div>
              </div>
              <p className="text-xs text-indigo-200 font-mono">
                {analyzeStepMessage}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              disabled={!selectedFile || isUploading || isAnalyzing || uploadProgress === 100}
              onClick={handleUploadSimulate}
              isLoading={isUploading}
            >
              Simulate Upload
            </Button>

            <Button
              variant="primary"
              disabled={!selectedFile || isAnalyzing}
              onClick={handleAnalyzeResume}
              isLoading={isAnalyzing}
              icon={Sparkles}
              iconPosition="right"
              className="w-full sm:w-auto shadow-md shadow-indigo-600/20"
            >
              Analyze Resume
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Helpful Instructions Card */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-5 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-800">What happens after analysis?</span>
            <p>
              Our client-side parsing simulator extracts your technical competencies, academic benchmarks, projects, and certifications. On the next screen (/analysis), you will be able to review, add, or remove parsed items before mapping to job roles.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
