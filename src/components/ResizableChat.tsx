import { useState, useRef, useEffect } from 'react';
import { VideoCall } from './VideoCall';
import { Chat } from './Chat';
import type { Person } from '../App';

type ResizableChatProps = {
  person: Person;
  onEndCall: () => void;
  onOpenMedicalRecord: () => void;
};

export function ResizableChat({ person, onEndCall, onOpenMedicalRecord }: ResizableChatProps) {
  const [chatHeight, setChatHeight] = useState(256); // Altura padrão em pixels (16rem = 256px)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newHeight = containerRect.bottom - e.clientY;
      
      // Limitar altura mínima e máxima
      const minHeight = 150; // 150px mínimo
      const maxHeight = containerRect.height - 200; // Deixar pelo menos 200px para o vídeo
      
      if (newHeight >= minHeight && newHeight <= maxHeight) {
        setChatHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div 
        style={{ height: `calc(100% - ${chatHeight}px - 4px)` }} 
        className="min-h-0 flex flex-col"
      >
        <VideoCall person={person} onEndCall={onEndCall} />
      </div>
      
      {/* Resize handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-1 bg-[var(--panel-border)] hover:bg-[var(--primary-btn)] cursor-row-resize transition-colors relative group flex-shrink-0 ${
          isDragging ? 'bg-[var(--primary-btn)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-1 bg-[var(--muted-text)] rounded-full group-hover:bg-[var(--primary-btn)] transition-colors" />
        </div>
      </div>
      
      <div style={{ height: `${chatHeight}px` }} className="flex flex-col min-h-0 flex-shrink-0">
        <Chat 
          person={person} 
          onOpenMedicalRecord={onOpenMedicalRecord}
        />
      </div>
    </div>
  );
}
