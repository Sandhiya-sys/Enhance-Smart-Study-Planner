import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';

interface PDFViewerProps {
  pdfPath: string;
  title: string;
  onClose: () => void;
}

export function PDFViewer({ pdfPath, title, onClose }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState(false);

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `${title}.pdf`;
    link.click();
  };

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(false);
    // Force iframe reload by setting src again
    const iframe = document.getElementById('pdf-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = pdfPath;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-[20px] border-b border-white/10 p-4 relative z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-white/60 text-sm">PDF Study Material</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-[0_0_15px_rgba(91,46,255,0.3)] hover:shadow-[0_0_25px_rgba(91,46,255,0.5)]"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>

              <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <span className="text-white font-semibold">{zoom}%</span>
              </div>

              <button
                onClick={handleZoomIn}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-[0_0_15px_rgba(91,46,255,0.3)] hover:shadow-[0_0_25px_rgba(91,46,255,0.5)]"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* PDF Content */}
        <div className="h-[calc(100vh-80px)] w-full bg-[#0A0A0A] relative overflow-hidden">
          {isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mb-4"
              >
                <Loader2 className="w-12 h-12 text-[#00F5D4]" />
              </motion.div>
              <p className="text-white text-lg">Loading PDF...</p>
              <p className="text-white/60 text-sm mt-2">Please wait a moment</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <div className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-[#FF4D9D]/30 max-w-md text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-white text-xl font-bold mb-2">Unable to Load PDF</h3>
                <p className="text-white/60 mb-6">The PDF couldn't be loaded. Please try again.</p>
                <button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <div className="w-full h-full flex items-center justify-center p-4">
            <div
              className="bg-white rounded-lg shadow-2xl overflow-auto"
              style={{
                width: `${zoom}%`,
                height: `${zoom}%`,
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              <iframe
                id="pdf-iframe"
                src={pdfPath}
                className="w-full h-full"
                title={title}
                onLoad={handleLoad}
                onError={handleError}
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
