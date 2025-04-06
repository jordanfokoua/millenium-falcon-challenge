import { Empire } from './types';
import { FileUpload } from './components/FileUpload';
import { Header } from './components/Header';
import { ResultDisplay } from './components/ResultDisplay';
import { calculateOdds } from './services/api';
import { useState } from 'react';

// Custom error class for better error handling
class AppError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AppError';
  }
}

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<Empire | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [odds, setOdds] = useState<number | null>(null);

  const readFileContent = (file: File): Promise<Empire> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        try {
          const content = JSON.parse(event.target?.result as string) as Empire;
          
          // Validate Empire data structure
          if (!content.countdown || !Array.isArray(content.bounty_hunters)) {
            throw new AppError('Invalid Empire data structure', 'INVALID_STRUCTURE');
          }
          
          resolve(content);
        } catch (error) {
          if (error instanceof AppError) {
            reject(error);
          } else {
            reject(new AppError('Invalid JSON file', 'INVALID_JSON'));
          }
        }
      };
      reader.onerror = () => reject(new AppError('Failed to read file', 'FILE_READ_ERROR'));
      reader.readAsText(file);
    });
  };

  const handleFileChange = async (file: File) => {
    try {
      setError(null);
      setOdds(null);
      const content = await readFileContent(file);
      setFileContent(content);
      setUploadedFile(file);
    } catch (error) {
      if (error instanceof AppError) {
        setError(error);
      } else {
        setError(new AppError('An unexpected error occurred', 'UNKNOWN_ERROR'));
      }
      setFileContent(null);
      setUploadedFile(null);
    }
  };

  const handleCalculateOdds = async () => {
    if (!fileContent) {
      setError(new AppError('Please upload the Empire file before calculating odds', 'MISSING_FILE'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setOdds(null);

    try {
      const calculatedOdds = await calculateOdds(fileContent);
      setOdds(calculatedOdds);
    } catch (error) {
      setError(new AppError(
        'Failed to calculate odds. Please try again.',
        'CALCULATION_ERROR'
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setError(null);
    setOdds(null);
    setFileContent(null);
    setUploadedFile(null);
  };

  return (
    <main className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl">
        <Header />

        <div className="space-y-6">
          {odds === null && (
            <>
              <p className="text-center text-gray-500 m-2">
                Upload your empire.json file to calculate the odds of the Millennium Falcon completing its mission.
              </p>
              <FileUpload 
                uploadedFile={uploadedFile} 
                fileContent={fileContent} 
                onFileChange={handleFileChange} 
              />
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCalculateOdds}
                  disabled={isLoading || !fileContent}
                  className={`px-10 py-4 rounded-lg font-medium text-black cursor-pointer ${
                    isLoading || !fileContent 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#FFE81F] hover:bg-[#FFE81F]'
                  }`}
                >
                  {isLoading ? 'Calculating...' : 'Calculate Odds'}
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
              <p className="font-medium">{error.message}</p>
              {error.code === 'INVALID_STRUCTURE' && (
                <p className="text-sm mt-2">
                  The file should contain a 'countdown' number and a 'bounty_hunters' array.
                </p>
              )}
            </div>
          )}

          {odds !== null && <ResultDisplay odds={odds} onRestart={handleRestart} />}
        </div>
      </div>
    </main>
  );
}

export default App;
