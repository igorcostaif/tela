import { X, Calendar, Clock, FileText } from 'lucide-react';

type HistoryItem = {
  date: string;
  duration: string;
  notes: string;
};

type HistoryDetailProps = {
  history: HistoryItem;
  patientName: string;
  onClose: () => void;
};

export function HistoryDetail({ history, patientName, onClose }: HistoryDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-[var(--panel-bg)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[var(--panel-border)]">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[var(--panel-border)] flex items-center justify-between">
          <h2 className="text-lg md:text-xl pr-2 line-clamp-1">Atendimento - {patientName}</h2>
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
            {/* Data */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <Calendar size={16} />
                Data do Atendimento
              </label>
              <p>{history.date}</p>
            </div>

            {/* Duração */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <Clock size={16} />
                Duração
              </label>
              <p>{history.duration}</p>
            </div>

            {/* Observações */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block flex items-center gap-2">
                <FileText size={16} />
                Observações
              </label>
              <div className="bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--panel-border)]">
                <p>{history.notes}</p>
              </div>
            </div>

            {/* Informações adicionais simuladas */}
            <div>
              <label className="text-sm text-[var(--muted-text)] mb-2 block">Procedimentos Realizados</label>
              <div className="space-y-2">
                <div className="bg-[var(--card-bg)] px-3 py-2 rounded border border-[var(--panel-border)]">
                  <p className="text-sm">• Avaliação geral de saúde</p>
                </div>
                <div className="bg-[var(--card-bg)] px-3 py-2 rounded border border-[var(--panel-border)]">
                  <p className="text-sm">• Aferição de sinais vitais</p>
                </div>
                <div className="bg-[var(--card-bg)] px-3 py-2 rounded border border-[var(--panel-border)]">
                  <p className="text-sm">• Orientações aos responsáveis</p>
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
            className="px-3 md:px-4 py-2 bg-[var(--primary-btn)] hover:bg-[var(--primary-btn-hover)] rounded-lg transition-colors text-sm md:text-base text-white"
          >
            Ver Prontuário Completo
          </button>
        </div>
      </div>
    </div>
  );
}
