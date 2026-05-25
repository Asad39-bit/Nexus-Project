import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Save, Trash2, Download } from 'lucide-react';

export function Signature() {
  const sigCanvas = useRef<any>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    setImageURL(null);
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }
    const dataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    setImageURL(dataUrl);
  };

  const handleDownload = () => {
    if (!imageURL) return;
    const a = document.createElement('a');
    a.href = imageURL;
    a.download = 'signature.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Digital Signature</h1>
        <p className="text-slate-500 mt-1">Capture and save signatures securely.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <span className="font-medium text-slate-700">Draw Signature Here</span>
          <div className="flex gap-2">
            <button 
              onClick={clear}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            <button 
              onClick={save}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Signature
            </button>
          </div>
        </div>
        
        <div className="p-6 flex justify-center bg-slate-50/50">
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg overflow-hidden shadow-inner cursor-crosshair">
            <SignatureCanvas 
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 600, 
                height: 250, 
                className: 'sigCanvas'
              }} 
            />
          </div>
        </div>
      </div>

      {imageURL && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Saved Result</h2>
            <button 
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 flex justify-center">
            <img src={imageURL} alt="Saved Signature" className="max-w-full drop-shadow-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
