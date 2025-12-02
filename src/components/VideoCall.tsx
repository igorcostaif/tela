import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor } from 'lucide-react';
import { useState } from 'react';
import type { Person } from '../App';

type VideoCallProps = {
  person: Person;
  onEndCall: () => void;
};

export function VideoCall({ person, onEndCall }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="h-full flex flex-col bg-[var(--app-bg)]">
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[var(--panel-border)] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-sm md:text-base">Chamada com {person.name}</h2>
        </div>
        <div className="text-xs md:text-sm text-[var(--muted-text)]">00:03:24</div>
      </div>

      <div className="flex-1 min-h-0 relative bg-[#000000] flex items-center justify-center overflow-hidden">
        {/* Vídeo principal */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--app-bg)] to-[var(--hover-bg)]">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 md:border-4 border-[var(--panel-border)]"
          />
        </div>

        {/* Vídeo local (miniatura) */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 w-20 h-16 sm:w-28 sm:h-20 md:w-40 md:h-32 bg-[var(--hover-bg)] rounded-lg border border-[var(--panel-border)] flex items-center justify-center">
          <div className="text-xs md:text-sm text-[var(--muted-text)]">Você</div>
        </div>

        {/* Controles da chamada */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-[var(--panel-bg)] px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full border border-[var(--panel-border)]">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-[var(--hover-bg)] hover:opacity-80'
            }`}
            title={isMuted ? 'Ativar microfone' : 'Desativar microfone'}
          >
            {isMuted ? <MicOff size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" /> : <Mic size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-[var(--hover-bg)] hover:opacity-80'
            }`}
            title={isVideoOn ? 'Desativar vídeo' : 'Ativar vídeo'}
          >
            {isVideoOn ? <Video size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" /> : <VideoOff size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />}
          </button>

          <button
            className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[var(--hover-bg)] hover:opacity-80 items-center justify-center transition-colors"
            title="Compartilhar tela"
          >
            <Monitor size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
          </button>

          <button
            onClick={onEndCall}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
            title="Encerrar chamada"
          >
            <PhoneOff size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
