
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'prompt' | 'installing'>('prompt');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'installing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          const jump = Math.random() * 15;
          return Math.min(100, prev + jump);
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#7d88c2]">
      {/* Retro dithered background simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '2px 2px' }}></div>
      
      <div className="w-[450px] bg-white border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col font-mono text-black">
        {/* Title Bar */}
        <div className="h-[24px] border-b-[2px] border-black flex items-center px-1" style={{ background: 'repeating-linear-gradient(0deg, #fff, #fff 2px, #000 2px, #000 3px)' }}>
          <div className="w-4 h-4 border border-black bg-white flex items-center justify-center">
             <div className="w-2 h-[2px] bg-black"></div>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <span className="bg-white px-4 text-[14px] font-bold border-x-[2px] border-black">Kha Mác Ó v.01</span>
          </div>
          <div className="w-4 h-4 border border-black bg-white"></div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="text-center font-bold text-lg mb-2">Installing</div>
          
          <div className="w-full border-[1px] border-black p-6 flex flex-col items-center gap-4">
            <div className="text-center font-bold px-4 leading-tight">
              {phase === 'prompt' 
                ? "Are you sure you want to install Kha Mác Ó on your system?"
                : "Installation in progress..."}
            </div>
            
            <div className="w-full relative">
              <div className="w-full h-6 border-[1px] border-black bg-white relative overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    backgroundImage: 'repeating-linear-gradient(45deg, #444, #444 2px, #000 2px, #000 4px)' 
                  }}
                />
              </div>
              <div className="absolute right-0 -top-6 text-[12px] font-bold">
                {Math.floor(progress)} %
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button 
              onClick={() => setPhase('installing')}
              disabled={phase === 'installing'}
              className={`px-10 py-1 border-[2px] border-black rounded-full font-bold shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${phase === 'installing' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              OK
            </button>
            <button 
              className="px-8 py-1 border-[2px] border-black rounded-full font-bold shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        body { background-color: #7d88c2 !important; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
