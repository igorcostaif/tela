import { Bell, Calendar, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { ReminderDetail } from './ReminderDetail';

type Reminder = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  type: 'meeting' | 'document' | 'appointment';
  participants?: string[];
  location?: string;
};

export function Reminders() {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  const reminders: Reminder[] = [
    {
      id: '1',
      title: 'Reunião de equipe',
      description: 'Discussão sobre novos protocolos de atendimento pediátrico e atualização dos procedimentos internos.',
      date: 'Hoje',
      time: '15:00',
      type: 'meeting',
      participants: ['Dr. Carlos Silva', 'Dra. Ana Paula', 'Enf. Maria Santos'],
      location: 'Sala de Reuniões - 3º andar'
    },
    {
      id: '2',
      title: 'Avaliar exames de Ana',
      description: 'Revisar resultados dos exames de sangue e radiografia solicitados na última consulta.',
      date: 'Pendente',
      type: 'document'
    },
    {
      id: '3',
      title: 'Retorno de João Santos',
      description: 'Consulta de retorno para avaliação do tratamento e verificação de progresso.',
      date: '20/12/2025',
      time: '10:30',
      type: 'appointment',
      participants: ['João Santos (Paciente)', 'Responsável']
    },
    {
      id: '4',
      title: 'Documentos para assinatura',
      description: 'Relatórios médicos, prescrições e atestados aguardando assinatura digital.',
      date: 'Pendente',
      type: 'document'
    }
  ];

  return (
    <>
      <div className="space-y-2">
        {reminders.map((reminder) => (
          <button
            key={reminder.id}
            onClick={() => setSelectedReminder(reminder)}
            className="w-full bg-[var(--reminder-bg)] rounded-lg p-3 border border-[var(--panel-border)] flex items-start gap-3 hover:bg-[var(--reminder-hover)] transition-colors cursor-pointer"
          >
            {reminder.type === 'meeting' ? (
              <Calendar size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            ) : reminder.type === 'appointment' ? (
              <Calendar size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <FileCheck size={16} className={`${reminder.id === '2' ? 'text-yellow-400' : 'text-purple-400'} mt-0.5 flex-shrink-0`} />
            )}
            <div className="text-left">
              <p className="text-sm mb-1">{reminder.title}</p>
              <span className="text-xs text-[var(--muted-text)]">
                {reminder.date}
                {reminder.time && ` às ${reminder.time}`}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedReminder && (
        <ReminderDetail
          reminder={selectedReminder}
          onClose={() => setSelectedReminder(null)}
        />
      )}
    </>
  );
}