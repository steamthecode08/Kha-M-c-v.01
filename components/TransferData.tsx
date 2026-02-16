
import React, { useState, useEffect } from 'react';
import RetroWindow from './RetroWindow';

interface TransferDataProps {
  onComplete: () => void;
}

const TransferData: React.FC<TransferDataProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <RetroWindow title="System File Transfer">
      <div className="flex flex-col gap-4 p-2 text-black text-sm">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center text-4xl">📁</div>
            <div className="flex flex-col">
                <span className="font-bold">Transferring "HEART_FRAGMENTS"...</span>
                <span>Items remaining: {Math.max(0, 10 - Math.floor(progress/10))}</span>
            </div>
        </div>

        <div className="w-full bg-white border border-black h-5 relative overflow-hidden shadow-inner">
          <div 
            className="h-full bg-blue-700 transition-all duration-200" 
            style={{ width: `${progress}%` }}
          >
             {/* Mac OS 8 progress bar stripes */}
             <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)' }}></div>
          </div>
        </div>

        <div className="flex justify-end mt-2">
           <button className="px-6 py-1 border border-black shadow-[1px_1px_0_0_#fff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-[#cecece]">
             Cancel
           </button>
        </div>
      </div>
    </RetroWindow>
  );
};

export default TransferData;
