import { useState } from 'react';
import { ChevronDown, ChevronRight, Bell, FileText, FileCheck } from 'lucide-react';
import type { Person } from '../App';
import { Reminders } from './Reminders';
import { HistoryDetail } from './HistoryDetail';
import { DocumentDetail } from './DocumentDetail';

type SidePanelProps = {
  person: Person | null;
  isInCallOrChat: boolean;
};

type Document = {
  id: string;
  title: string;
  patient: string;
  type: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
};

export function SidePanel({ person, isInCallOrChat }: SidePanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    lembretes: true,
    historico: isInCallOrChat,
    documentos: isInCallOrChat,
  });
  
  const [selectedHistory, setSelectedHistory] = useState<{ date: string; duration: string; notes: string } | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const documentsToReview: Document[] = [
    {
      id: '1',
      title: 'Exames de sangue',
      patient: 'Ana Oliveira',
      type: 'Resultado de exame',
      date: '28/11/2025',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Prescrição médica',
      patient: 'João Santos',
      type: 'Receita',
      date: '27/11/2025',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Relatório de consulta',
      patient: 'Maria Silva',
      type: 'Relatório',
      date: '26/11/2025',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Atestado médico',
      patient: 'Carlos Ferreira',
      type: 'Atestado',
      date: '25/11/2025',
      priority: 'low'
    }
  ];

  const toggleSection = (section: 'lembretes' | 'historico' | 'documentos') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-[var(--muted-text)]';
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      {/* Lembretes - Sempre visível */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('lembretes')}
          className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-[var(--muted-text)]" />
            <h3>Lembretes</h3>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4</span>
          </div>
          {expandedSections.lembretes ? (
            <ChevronDown size={18} className="text-[var(--muted-text)]" />
          ) : (
            <ChevronRight size={18} className="text-[var(--muted-text)]" />
          )}
        </button>

        {expandedSections.lembretes && <Reminders />}
      </div>

      {/* Seções adicionais quando em chamada ou chat */}
      {isInCallOrChat && (
        <>
          {/* Histórico */}
          {person && (
            <div className="mb-4">
              <button
                onClick={() => toggleSection('historico')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[var(--muted-text)]" />
                  <h3>Histórico de Atendimentos</h3>
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{person.history.length}</span>
                </div>
                {expandedSections.historico ? (
                  <ChevronDown size={18} className="text-[var(--muted-text)]" />
                ) : (
                  <ChevronRight size={18} className="text-[var(--muted-text)]" />
                )}
              </button>

              {expandedSections.historico && (
                <div className="space-y-2">
                  {person.history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedHistory(item)}
                      className="w-full bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--panel-border)] hover:bg-[var(--hover-bg)] transition-colors text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[var(--muted-text)]">{item.date}</span>
                        <div className="flex items-center gap-1 text-xs text-[var(--muted-text)]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2">{item.notes}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Documentos a Avaliar */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('documentos')}
              className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <FileCheck size={18} className="text-[var(--muted-text)]" />
                <h3>Documentos a Avaliar</h3>
                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">{documentsToReview.length}</span>
              </div>
              {expandedSections.documentos ? (
                <ChevronDown size={18} className="text-[var(--muted-text)]" />
              ) : (
                <ChevronRight size={18} className="text-[var(--muted-text)]" />
              )}
            </button>

            {expandedSections.documentos && (
              <div className="space-y-2">
                {documentsToReview.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className="w-full bg-[var(--card-bg)] rounded-lg p-3 border border-[var(--panel-border)] hover:bg-[var(--hover-bg)] transition-colors text-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm flex-1">{doc.title}</p>
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${getPriorityColor(doc.priority)}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-[var(--muted-text)]">Paciente: {doc.patient}</p>
                      <p className="text-xs text-[var(--muted-text)]">{doc.type} • {doc.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Perfil da pessoa - Mostra apenas quando não está em chamada/chat */}
      {person && !isInCallOrChat && (
        <div className="mb-6 text-center border-t border-[var(--panel-border)] pt-6">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-[var(--panel-border)]"
          />
          <h3 className="mb-1">{person.name}</h3>
          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-text)] bg-[var(--hover-bg)] px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            {person.status === 'waiting' ? 'Aguardando' : person.status}
          </span>
        </div>
      )}
      
      {/* Modals */}
      {selectedHistory && person && (
        <HistoryDetail
          history={selectedHistory}
          patientName={person.name}
          onClose={() => setSelectedHistory(null)}
        />
      )}
      
      {selectedDocument && (
        <DocumentDetail
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}