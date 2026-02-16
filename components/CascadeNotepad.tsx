
import React from 'react';
import RetroWindow from './RetroWindow';

interface CascadeNotepadProps {
  onClose: () => void;
}

const CascadeNotepad: React.FC<CascadeNotepadProps> = ({ onClose }) => {
  // Define positions and contents for the cascading windows to mimic the visual reference
  const windows = [
    { id: 1, top: '10%', left: '15%', title: 'loveyou.com', content: 'You are special! ✨' },
    { id: 2, top: '12%', left: '18%', title: 'loveyou.com', content: 'Stay cute! (◕‿◕)' },
    { id: 3, top: '14%', left: '21%', title: 'loveyou.com', content: 'Heart reconstructed.' },
    { id: 4, top: '16%', left: '24%', title: 'loveyou.com', content: 'System: 100% Love' },
    { id: 5, top: '18%', left: '27%', title: 'loveyou.com', content: 'Processing feelings...' },
    { id: 6, top: '20%', left: '30%', title: 'loveyou.com', content: 'Fragment detected.' },
    { id: 7, top: '22%', left: '33%', title: 'loveyou.com', content: 'Kha is here for you.' },
    { id: 8, top: '24%', left: '36%', title: 'loveyou.com', content: 'Connection stable.' },
    { id: 9, top: '26%', left: '39%', title: 'loveyou.com', content: '❤ ❤ ❤ ❤ ❤' },
    { id: 10, top: '28%', left: '42%', title: 'loveyou.com', content: 'From Kha with love.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        {/* Backdrop to close the cascade */}
        <div 
          className="absolute inset-0 bg-black/10 cursor-alias" 
          onClick={onClose}
        />
        
        {windows.map((win, index) => (
          <div 
            key={win.id}
            className="absolute transition-all duration-300"
            style={{ top: win.top, left: win.left, zIndex: 100 + index }}
          >
            <RetroWindow 
              title={win.title} 
              width="w-64" 
              onClose={index === windows.length - 1 ? onClose : undefined}
            >
              <div className="h-24 bg-white border border-black p-2 flex items-center justify-center text-black font-serif italic text-sm text-center">
                {win.content}
              </div>
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-[10px] text-gray-500">KhaOS v8.1</span>
                {index === windows.length - 1 && (
                   <button 
                    onClick={onClose}
                    className="px-2 py-[1px] border border-black text-[10px] bg-[#cecece]"
                   >
                     Close All
                   </button>
                )}
              </div>
            </RetroWindow>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CascadeNotepad;
