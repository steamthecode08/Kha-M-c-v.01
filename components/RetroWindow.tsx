
import React from 'react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  onClose?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, width = 'w-96', onClose }) => {
  return (
    <div className={`${width} mac-window flex flex-col`}>
      <div className="mac-titlebar h-[22px] flex items-center justify-between px-1 select-none">
        <div className="flex items-center w-full relative h-full">
            {/* Close Box on the Left with "x" */}
            <button 
                onClick={onClose}
                className="w-4 h-4 bg-[#cecece] border border-black flex items-center justify-center z-10 hover:bg-gray-400 font-bold text-[10px] text-black pb-[1px]"
            >
              x
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-[#cecece] px-2 text-[12px] font-bold text-black border-l border-r border-black">{title}</span>
            </div>
            {/* Window control boxes on right */}
            <div className="ml-auto flex gap-1 z-10">
                <div className="w-4 h-4 bg-[#cecece] border border-black"></div>
                <div className="w-4 h-4 bg-[#cecece] border border-black flex flex-col gap-[2px] p-[2px] items-center">
                    <div className="w-full h-[1px] bg-black"></div>
                    <div className="w-full h-[1px] bg-black"></div>
                </div>
            </div>
        </div>
      </div>
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;
