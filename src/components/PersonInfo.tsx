import { Clock, FileText, Bell, Calendar, FileCheck } from 'lucide-react';
import type { Person } from '../App';

type PersonInfoProps = {
  person: Person;
};

export function PersonInfo({ person }: PersonInfoProps) {
  return (
    <div className="w-80 bg-[#252526] border-l border-[#333333] flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-[#333333]">
        <h2 className="text-lg">Informações</h2>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Perfil */}
        <div className="mb-6 text-center">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-[#333333]"
          />
          <h3 className="mb-1">{person.name}</h3>
          <span className="inline-flex items-center gap-1.5 text-sm text-[#858585] bg-[#1e1e1e] px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            {person.status === 'waiting' ? 'Aguardando' : person.status}
          </span>
        </div>

        {/* Lembretes */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-[#858585]" />
            <h3>Lembretes</h3>
          </div>

          <div className="space-y-2">
            <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#333333] flex items-start gap-3">
              <Calendar size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm mb-1">Reunião de equipe</p>
                <span className="text-xs text-[#858585]">Hoje às 15:00</span>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#333333] flex items-start gap-3">
              <FileCheck size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm mb-1">Avaliar exames de Ana</p>
                <span className="text-xs text-[#858585]">Pendente</span>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#333333] flex items-start gap-3">
              <Calendar size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm mb-1">Retorno de João Santos</p>
                <span className="text-xs text-[#858585]">20/12/2025</span>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#333333] flex items-start gap-3">
              <FileCheck size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm mb-1">Documentos para assinatura</p>
                <span className="text-xs text-[#858585]">3 documentos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de atendimentos */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[#858585]" />
            <h3>Histórico de Atendimentos</h3>
          </div>

          <div className="space-y-3">
            {person.history.map((item, index) => (
              <div
                key={index}
                className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#858585]">{item.date}</span>
                  <div className="flex items-center gap-1 text-xs text-[#858585]">
                    <Clock size={12} />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-[#cccccc]">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
