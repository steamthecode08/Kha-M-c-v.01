
import React from 'react';

interface StickyNoteProps {
  content: string;
  color?: string;
  className?: string;
  rotation?: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({ 
  content, 
  color = 'bg-[#fef08a]', // Default yellow
  className = '',
  rotation = 'rotate-0'
}) => {
  return (
    <div className={`absolute p-3 w-64 shadow-lg border border-black/20 ${color} ${rotation} ${className} transition-transform hover:scale-105 hover:z-50 cursor-default select-none`}>
      <div className="font-serif text-black text-sm leading-snug">
        {content}
      </div>
      {/* Tape-like decoration at the top if desired, but reference shows plain notes */}
    </div>
  );
};

export default StickyNote;
