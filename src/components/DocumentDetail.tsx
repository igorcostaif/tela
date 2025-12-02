import { X, Calendar, User, FileText, AlertCircle } from 'lucide-react';

type Document = {
  id: string;
  title: string;
  patient: string;
  type: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
};

type DocumentDetailProps = {
  document: Document;
  onClose: () => void;
};

export function DocumentDetail({ document, onClose }: DocumentDetailProps) {
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Alta' };
      case 'medium':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Média' };
      case 'low':
        return { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Baixa' };
      default:
        return { color: 'text-[var(--muted-text)]', bg: 'bg-[var(--hover-bg)]', label: 'Normal' };
    }
  };

  const priorityInfo = getPriorityInfo(document.priority);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-[var(--panel-bg)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[var(--panel-border)]">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[var(--panel-border)] flex items-center justify-between">
          <h2 className="text-lg md:text-xl pr-2 line-clamp-1">{document.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Prioridade */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <AlertCircle size={16} />
                Prioridade
              </label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${priorityInfo.bg} ${priorityInfo.color}`}>
                {priorityInfo.label}
              </span>
            </div>

            {/* Paciente */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <User size={16} />
                Paciente
              </label>
              <p>{document.patient}</p>
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <FileText size={16} />
                Tipo de Documento
              </label>
              <p>{document.type}</p>
            </div>

            {/* Data */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <Calendar size={16} />
                Data
              </label>
              <p>{document.date}</p>
            </div>

            {/* Descrição simulada */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block">Descrição</label>
              <div className="bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--panel-border)]">
                <p className="mb-3">
                  Documento aguardando avaliação e aprovação do médico responsável.
                </p>
                <p className="text-sm text-[var(--muted-text)]">
                  Este documento requer atenção especial devido à sua prioridade {priorityInfo.label.toLowerCase()}.
                  Por favor, revise todos os detalhes antes de aprovar.
                </p>
              </div>
            </div>

            {/* Preview simulado */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block">Visualização do Documento</label>
              <div className="bg-[var(--hover-bg)] p-8 rounded-lg border border-[var(--panel-border)] flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-3 text-[var(--muted-text)]" />
                  <p className="text-sm text-[var(--muted-text)]">Preview do documento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-[var(--panel-border)] flex justify-end gap-2 md:gap-3">
          <button
            onClick={onClose}
            className="px-3 md:px-4 py-2 bg-[var(--hover-bg)] hover:opacity-80 rounded-lg transition-colors text-sm md:text-base"
          >
            Fechar
          </button>
          <button
            className="px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm md:text-base text-white"
          >
            Rejeitar
          </button>
          <button
            className="px-3 md:px-4 py-2 bg-[var(--primary-btn)] hover:bg-[var(--primary-btn-hover)] rounded-lg transition-colors text-sm md:text-base text-white"
          >
            Aprovar
          </button>
        </div>
      </div>
    </div>
  );
}
