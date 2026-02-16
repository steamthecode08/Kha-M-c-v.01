
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
            setTimeout(onComplete, 800);
            return 100;
          }
          const jump = Math.random() * 8 + 2;
          return Math.min(100, prev + jump);
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#7d88c2]">
      {/* Retro dithered background simulation */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.2px, transparent 0)', backgroundSize: '2.5px 2.5px' }}></div>
      
      <div className="w-[480px] bg-white border-[2px] border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] flex flex-col font-sans text-black">
        {/* Title Bar - Classic Mac OS Horizontal Stripes */}
        <div className="h-[28px] border-b-[2px] border-black flex items-center px-1" style={{ background: 'repeating-linear-gradient(0deg, #fff, #fff 1px, #000 1.5px, #000 2.5px, #fff 3px)' }}>
          <div className="w-5 h-5 border border-black bg-white flex items-center justify-center shadow-sm">
             <div className="w-3 h-[2px] bg-black"></div>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <span className="bg-white px-6 text-[14px] font-bold border-x-[2px] border-black tracking-tight">Kha Mác Ó v.01</span>
          </div>
          <div className="w-5 h-5 border border-black bg-white shadow-sm flex items-center justify-center">
             <div className="w-3 h-3 border border-black"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 flex flex-col items-center gap-8 bg-[#fff]">
          <div className="text-center font-bold text-xl tracking-tight">Installing</div>
          
          <div className="w-full border-[2px] border-black p-8 flex flex-col items-center gap-6 shadow-sm">
            <div className="text-center font-bold px-4 leading-tight text-lg">
              {phase === 'prompt' 
                ? "Are you sure you want to install Kha Mác Ó on your system?"
                : "Installation in progress..."}
            </div>
            
            <div className="w-full relative mt-2">
              <div className="w-full h-7 border-[2px] border-black bg-white relative overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-black transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    backgroundImage: 'repeating-linear-gradient(45deg, #444, #444 3px, #000 3px, #000 6px)' 
                  }}
                />
              </div>
              <div className="absolute right-0 -top-7 text-[14px] font-bold">
                {Math.floor(progress)} %
              </div>
            </div>
          </div>

          {/* Buttons - Rounded Rectangles like the visual reference */}
          <div className="flex gap-6 mt-2">
            <button 
              onClick={() => setPhase('installing')}
              disabled={phase === 'installing'}
              className={`min-w-[120px] py-1.5 border-[2px] border-black rounded-xl font-bold text-lg shadow-[3px_3px_0_0_#000] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all ${phase === 'installing' ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-100'}`}
            >
              OK
            </button>
            <button 
              className="min-w-[120px] py-1.5 border-[2px] border-black rounded-xl font-bold text-lg shadow-[3px_3px_0_0_#000] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all bg-white hover:bg-gray-100"
              onClick={() => phase !== 'installing' && alert('Installation required to proceed!')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        body { background-color: #7d88c2 !important; }
        @font-face {
          font-family: 'Chicago';
          src: local('Chicago'), local('Arial');
        }
        * { font-family: 'Chicago', sans-serif; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
