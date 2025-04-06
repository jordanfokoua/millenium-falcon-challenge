import { FileUploader } from 'react-drag-drop-files';

interface FileUploadProps {
  uploadedFile: File | null;
  fileContent: any | null;
  onFileChange: (file: File) => Promise<void>;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const FileUpload = ({ uploadedFile, fileContent, onFileChange }: FileUploadProps) => {
  return (
    <div className="flex flex-col items-center m-4">
      <div className="space-y-4 w-full max-w-2xl justify-center">
        <div className="flex flex-col items-center">
          <FileUploader
            handleChange={onFileChange}
            name="empire-file"
            types={['json']}
            label={uploadedFile ? 'Upload another empire.json' : 'Drag and drop empire.json here, or click to select'}
            hoverTitle="Drop here"
            classes={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              uploadedFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onTypeError={() => console.error('Invalid file type')}
            onSizeError={() => console.error('File too large')}
            maxSize={MAX_FILE_SIZE}
          />
        </div>

        {uploadedFile && (
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-600">✓</span>
              <span>File: {uploadedFile.name}</span>
            </div>
            {fileContent && (
              <div className="mt-2">
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono text-left whitespace-pre-wrap">{JSON.stringify(fileContent, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
