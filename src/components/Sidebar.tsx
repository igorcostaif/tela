import { Users, Clock, Settings } from 'lucide-react';

type SidebarProps = {
  activeSection: 'atendimento' | 'historico' | 'configuracoes';
  onSectionChange: (section: 'atendimento' | 'historico' | 'configuracoes') => void;
};

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: 'atendimento' as const, icon: Users, label: 'Atendimento' },
    { id: 'historico' as const, icon: Clock, label: 'Histórico' },
    { id: 'configuracoes' as const, icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      {/* Sidebar Desktop */}
      <div className="hidden md:flex w-16 bg-[var(--panel-bg)] border-r border-[var(--panel-border)] flex-col items-center py-4 gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[var(--hover-bg)] text-[var(--app-fg)]' 
                  : 'text-[var(--muted-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--app-fg)]'
              }`}
              title={section.label}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>

      {/* Bottom Navigation Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--panel-bg)] border-t border-[var(--panel-border)] flex justify-around items-center h-16 z-40">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive 
                  ? 'text-[var(--app-fg)]' 
                  : 'text-[var(--muted-text)]'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{section.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
