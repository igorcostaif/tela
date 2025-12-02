import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonList } from './components/PersonList';
import { VideoCall } from './components/VideoCall';
import { Chat } from './components/Chat';
import { Header } from './components/Header';
import { MedicalRecord } from './components/MedicalRecord';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidePanel } from './components/SidePanel';
import { ResizableChat } from './components/ResizableChat';

export type Person = {
  id: string;
  name: string;
  status: 'waiting' | 'in-call' | 'completed';
  waitTime: string;
  avatar: string;
  history: {
    date: string;
    duration: string;
    notes: string;
  }[];
  medicalRecord: {
    birthDate: string;
    allergies: string[];
    medications: string[];
    vaccines: { name: string; date: string }[];
    consultations: { date: string; diagnosis: string; prescription: string }[];
  };
};

export default function App() {
  const [activeSection, setActiveSection] = useState<'atendimento' | 'historico' | 'configuracoes'>('atendimento');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [inCall, setInCall] = useState(false);
  const [inChat, setInChat] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const mockPersons: Person[] = [
    {
      id: '1',
      name: 'Maria Silva',
      status: 'waiting',
      waitTime: '5 min',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      history: [
        { date: '15/11/2025', duration: '25 min', notes: 'Consulta de rotina, tudo ok' },
        { date: '03/10/2025', duration: '30 min', notes: 'Acompanhamento mensal' },
      ],
      medicalRecord: {
        birthDate: '15/03/2018',
        allergies: ['Dipirona', 'Lactose'],
        medications: ['Vitamina D - 1 gota/dia'],
        vaccines: [
          { name: 'COVID-19 (1ª dose)', date: '10/05/2025' },
          { name: 'Influenza 2025', date: '15/04/2025' },
        ],
        consultations: [
          { date: '15/11/2025', diagnosis: 'Check-up de rotina', prescription: 'Manter vitamina D' },
          { date: '03/10/2025', diagnosis: 'Resfriado comum', prescription: 'Repouso e hidratação' },
        ]
      }
    },
    {
      id: '2',
      name: 'João Santos',
      status: 'waiting',
      waitTime: '12 min',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      history: [
        { date: '20/11/2025', duration: '20 min', notes: 'Primeira consulta' },
      ],
      medicalRecord: {
        birthDate: '22/08/2020',
        allergies: [],
        medications: [],
        vaccines: [
          { name: 'Tríplice Viral', date: '22/08/2024' },
        ],
        consultations: [
          { date: '20/11/2025', diagnosis: 'Consulta inicial', prescription: 'Acompanhamento em 30 dias' },
        ]
      }
    },
    {
      id: '3',
      name: 'Ana Oliveira',
      status: 'waiting',
      waitTime: '3 min',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      history: [
        { date: '18/11/2025', duration: '35 min', notes: 'Consulta especializada' },
        { date: '05/11/2025', duration: '28 min', notes: 'Retorno - melhora significativa' },
        { date: '22/10/2025', duration: '40 min', notes: 'Avaliação inicial' },
      ],
      medicalRecord: {
        birthDate: '10/01/2019',
        allergies: ['Amendoim'],
        medications: ['Antialérgico - conforme necessário'],
        vaccines: [
          { name: 'COVID-19 (2ª dose)', date: '15/09/2025' },
        ],
        consultations: [
          { date: '18/11/2025', diagnosis: 'Alergia sazonal', prescription: 'Antialérgico conforme orientação' },
        ]
      }
    },
    {
      id: '4',
      name: 'Carlos Ferreira',
      status: 'waiting',
      waitTime: '8 min',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      history: [
        { date: '10/11/2025', duration: '22 min', notes: 'Acompanhamento trimestral' },
      ],
      medicalRecord: {
        birthDate: '05/12/2017',
        allergies: [],
        medications: ['Vitamina C'],
        vaccines: [
          { name: 'HPV (1ª dose)', date: '05/12/2024' },
        ],
        consultations: [
          { date: '10/11/2025', diagnosis: 'Crescimento adequado', prescription: 'Continuar vitamina C' },
        ]
      }
    },
  ];

  const [persons] = useState<Person[]>(mockPersons);

  const handleStartCall = (person: Person) => {
    setSelectedPerson(person);
    setInCall(true);
    setInChat(false);
  };

  const handleStartChat = (person: Person) => {
    setSelectedPerson(person);
    setInChat(true);
    setInCall(false);
  };

  const handleEndCall = () => {
    setInCall(false);
  };

  const handleEndChat = () => {
    setInChat(false);
    setSelectedPerson(null);
  };

  const handleOpenMedicalRecord = () => {
    setShowMedicalRecord(true);
  };

  const handleCloseMedicalRecord = () => {
    setShowMedicalRecord(false);
  };

  return (
    <ThemeProvider>
      <AppContent
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        selectedPerson={selectedPerson}
        inCall={inCall}
        inChat={inChat}
        showMedicalRecord={showMedicalRecord}
        showSidePanel={showSidePanel}
        setShowSidePanel={setShowSidePanel}
        persons={persons}
        handleStartCall={handleStartCall}
        handleStartChat={handleStartChat}
        handleEndCall={handleEndCall}
        handleEndChat={handleEndChat}
        handleOpenMedicalRecord={handleOpenMedicalRecord}
        handleCloseMedicalRecord={handleCloseMedicalRecord}
      />
    </ThemeProvider>
  );
}

type AppContentProps = {
  activeSection: 'atendimento' | 'historico' | 'configuracoes';
  setActiveSection: (section: 'atendimento' | 'historico' | 'configuracoes') => void;
  selectedPerson: Person | null;
  inCall: boolean;
  inChat: boolean;
  showMedicalRecord: boolean;
  showSidePanel: boolean;
  setShowSidePanel: (show: boolean) => void;
  persons: Person[];
  handleStartCall: (person: Person) => void;
  handleStartChat: (person: Person) => void;
  handleEndCall: () => void;
  handleEndChat: () => void;
  handleOpenMedicalRecord: () => void;
  handleCloseMedicalRecord: () => void;
};

function AppContent({
  activeSection,
  setActiveSection,
  selectedPerson,
  inCall,
  inChat,
  showMedicalRecord,
  showSidePanel,
  setShowSidePanel,
  persons,
  handleStartCall,
  handleStartChat,
  handleEndCall,
  handleEndChat,
  handleOpenMedicalRecord,
  handleCloseMedicalRecord,
}: AppContentProps) {
  return (
    <div className="flex h-screen bg-[var(--app-bg)] text-[var(--app-fg)] overflow-hidden pb-16 md:pb-0">
      {/* Sidebar esquerda */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header com logo */}
        <Header onMenuClick={() => setShowSidePanel(!showSidePanel)} />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Área de conteúdo principal */}
            <div className="flex-1 overflow-auto">
              {activeSection === 'atendimento' && (
                <>
                  {!inCall && !inChat ? (
                    <PersonList 
                      persons={persons} 
                      onStartCall={handleStartCall}
                      onStartChat={handleStartChat}
                    />
                  ) : inCall ? (
                    <ResizableChat
                      person={selectedPerson!}
                      onEndCall={handleEndCall}
                      onOpenMedicalRecord={handleOpenMedicalRecord}
                    />
                  ) : (
                    <div className="flex flex-col h-full">
                      <Chat 
                        person={selectedPerson!}
                        onOpenMedicalRecord={handleOpenMedicalRecord}
                        onEndChat={handleEndChat}
                        fullScreen
                      />
                    </div>
                  )}
                </>
              )}
              {activeSection === 'historico' && (
                <div className="p-6">
                  <h2 className="mb-4">Histórico de Atendimentos</h2>
                  <p className="text-[var(--muted-text)]">Visualize todos os atendimentos realizados</p>
                </div>
              )}
              {activeSection === 'configuracoes' && (
                <div className="p-6">
                  <h2 className="mb-4">Configurações</h2>
                  <p className="text-[var(--muted-text)]">Ajuste as preferências do sistema</p>
                </div>
              )}
            </div>
          </div>

          {/* Painel lateral direito - Desktop */}
          <div className="hidden lg:flex w-80 bg-[var(--panel-bg)] border-l border-[var(--panel-border)] flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--panel-border)]">
              <h2 className="text-lg">{selectedPerson ? 'Informações' : 'Painel'}</h2>
            </div>

            <SidePanel person={selectedPerson} isInCallOrChat={inCall || inChat} />
          </div>
        </div>

        {/* Painel lateral direito - Mobile (Drawer) */}
        {showSidePanel && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowSidePanel(false)}
            />
            <div className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[var(--panel-bg)] border-l border-[var(--panel-border)] flex flex-col overflow-hidden z-50">
              <div className="px-6 py-4 border-b border-[var(--panel-border)] flex items-center justify-between">
                <h2 className="text-lg">{selectedPerson ? 'Informações' : 'Painel'}</h2>
                <button
                  onClick={() => setShowSidePanel(false)}
                  className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <SidePanel person={selectedPerson} isInCallOrChat={inCall || inChat} />
            </div>
          </>
        )}
      </div>

      {/* Modal de Prontuário */}
      {showMedicalRecord && selectedPerson && (
        <MedicalRecord 
          person={selectedPerson} 
          onClose={handleCloseMedicalRecord}
        />
      )}
    </div>
  );
}