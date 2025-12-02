import { Video, Clock, MessageSquare } from 'lucide-react';
import type { Person } from '../App';

type PersonListProps = {
  persons: Person[];
  onStartCall: (person: Person) => void;
  onStartChat: (person: Person) => void;
};

export function PersonList({ persons, onStartCall, onStartChat }: PersonListProps) {
  return (
    <div className="h-full flex flex-col bg-[var(--app-bg)]">
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[var(--panel-border)]">
        <h1 className="text-lg md:text-xl">Fila de Atendimento</h1>
        <p className="text-xs md:text-sm text-[var(--muted-text)] mt-1">{persons.length} pessoas aguardando</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-2 md:p-4 space-y-2">
          {persons.map((person) => (
            <div
              key={person.id}
              className="bg-[var(--card-bg)] rounded-lg p-3 md:p-4 hover:bg-[var(--hover-bg)] transition-colors border border-[var(--panel-border)]"
            >
              <div className="flex items-start md:items-center gap-3 md:gap-4 flex-col md:flex-row">
                <div className="flex items-center gap-3 flex-1 w-full">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-sm md:text-base truncate">{person.name}</h3>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--muted-text)]">
                      <Clock size={12} className="md:w-3.5 md:h-3.5 flex-shrink-0" />
                      <span>Aguardando há {person.waitTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => onStartChat(person)}
                    className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[var(--hover-bg)] hover:opacity-80 rounded-lg transition-colors text-sm"
                    title="Conversar no chat"
                  >
                    <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="md:inline">Chat</span>
                  </button>
                  
                  <button
                    onClick={() => onStartCall(person)}
                    className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[var(--primary-btn)] hover:bg-[var(--primary-btn-hover)] rounded-lg transition-colors text-sm text-white"
                  >
                    <Video size={16} className="md:w-[18px] md:h-[18px]" />
                    <span>Chamada</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}