
import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
  className?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick, className = '' }) => {
  return (
    <div 
      className={`flex flex-col items-center gap-1 cursor-pointer group w-20 ${className}`}
      onClick={onClick}
    >
      <div className="text-4xl filter group-hover:brightness-110 transition-all drop-shadow-sm select-none">
        {icon}
      </div>
      <span className="bg-white px-2 border border-black text-[11px] text-black text-center break-words max-w-full font-bold shadow-[1px_1px_0_rgba(0,0,0,0.5)] group-active:bg-blue-700 group-active:text-white select-none">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
