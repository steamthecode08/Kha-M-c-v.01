
import React from 'react';
import RetroWindow from './RetroWindow';

interface NotepadProps {
  title?: string;
  date?: string;
  content: string;
  onClose: () => void;
  width?: string;
}

const Notepad: React.FC<NotepadProps> = ({ 
  title = "Note Pad", 
  date, 
  content, 
  onClose,
  width = "w-[550px]"
}) => {
  // Helper to render text with upright emojis
  const renderFormattedText = (text: string) => {
    const emojiRegex = /([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}])/gu;
    return text.split(emojiRegex).map((part, index) => {
      if (emojiRegex.test(part)) {
        return (
          <span 
            key={index} 
            className="not-italic inline-block" 
            style={{ fontStyle: 'normal' }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <RetroWindow title={title} width={width} onClose={onClose}>
      <div className="flex flex-col h-[550px] bg-white border border-black relative">
        {/* Note paper lines simulation */}
        <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-red-200 pointer-events-none"></div>
        <div className="flex-grow p-4 pl-12 overflow-y-auto font-serif text-black whitespace-pre-wrap text-base leading-relaxed italic">
          {date && (
            <div className="mb-4 font-bold not-italic border-b border-gray-200 pb-1">
              {date}
            </div>
          )}
          
          {renderFormattedText(content)}
          
          <div className="mt-8 pt-4 border-t border-gray-100 not-italic">
            <span className="opacity-50">----------------------------</span><br/>
            <span className="font-bold">From Kha iu của chị</span>
          </div>
        </div>
        
        {/* Mac Note Pad page corner decoration */}
        <div className="absolute right-0 bottom-0 w-8 h-8 border-l border-t border-black bg-[#cecece] shadow-[-2px_-2px_0_rgba(0,0,0,0.1)] flex items-center justify-center font-bold text-xs pointer-events-none">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-white absolute top-0 left-0"></div>
        </div>
        
        <div className="p-2 border-t border-black flex justify-between bg-[#cecece]">
            <span className="text-xs self-center">Page 1</span>
            <button 
              onClick={onClose}
              className="px-8 py-1 border border-black shadow-[1px_1px_0_#fff] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] bg-[#cecece] text-sm font-bold"
            >
              Close
            </button>
        </div>
      </div>
    </RetroWindow>
  );
};

export default Notepad;
