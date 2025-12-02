import { X, User, Calendar, AlertCircle, Pill, Syringe, Stethoscope } from 'lucide-react';
import type { Person } from '../App';

type MedicalRecordProps = {
  person: Person;
  onClose: () => void;
};

export function MedicalRecord({ person, onClose }: MedicalRecordProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-[var(--panel-bg)] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-[var(--panel-border)]">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[var(--panel-border)] flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base md:text-xl truncate">Prontuário - {person.name}</h2>
              <p className="text-xs md:text-sm text-[var(--muted-text)] truncate">Nascimento: {person.medicalRecord.birthDate}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Informações Básicas */}
            <div className="col-span-1 md:col-span-2 bg-[var(--card-bg)] rounded-lg p-4 md:p-5 border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="md:w-5 md:h-5 text-blue-400" />
                <h3 className="text-base md:text-lg">Informações Básicas</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[var(--muted-text)]">Nome Completo</label>
                  <p className="mt-1">{person.name}</p>
                </div>
                <div>
                  <label className="text-sm text-[var(--muted-text)]">Data de Nascimento</label>
                  <p className="mt-1">{person.medicalRecord.birthDate}</p>
                </div>
              </div>
            </div>

            {/* Alergias */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-5 border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="md:w-5 md:h-5 text-red-400" />
                <h3 className="text-base md:text-lg">Alergias</h3>
              </div>
              {person.medicalRecord.allergies.length > 0 ? (
                <ul className="space-y-2">
                  {person.medicalRecord.allergies.map((allergy, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      {allergy}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted-text)]">Nenhuma alergia registrada</p>
              )}
            </div>

            {/* Medicamentos */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-5 border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 mb-4">
                <Pill size={18} className="md:w-5 md:h-5 text-green-400" />
                <h3 className="text-base md:text-lg">Medicamentos em Uso</h3>
              </div>
              {person.medicalRecord.medications.length > 0 ? (
                <ul className="space-y-2">
                  {person.medicalRecord.medications.map((medication, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      {medication}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted-text)]">Nenhum medicamento em uso</p>
              )}
            </div>

            {/* Vacinas */}
            <div className="col-span-1 md:col-span-2 bg-[var(--card-bg)] rounded-lg p-4 md:p-5 border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 mb-4">
                <Syringe size={18} className="md:w-5 md:h-5 text-purple-400" />
                <h3 className="text-base md:text-lg">Histórico de Vacinas</h3>
              </div>
              <div className="space-y-3">
                {person.medicalRecord.vaccines.map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between bg-[var(--hover-bg)] p-3 rounded border border-[var(--panel-border)]">
                    <span className="text-sm">{vaccine.name}</span>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                      <Calendar size={14} />
                      {vaccine.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Histórico de Consultas */}
            <div className="col-span-1 md:col-span-2 bg-[var(--card-bg)] rounded-lg p-4 md:p-5 border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope size={18} className="md:w-5 md:h-5 text-cyan-400" />
                <h3 className="text-base md:text-lg">Histórico de Consultas</h3>
              </div>
              <div className="space-y-4">
                {person.medicalRecord.consultations.map((consultation, index) => (
                  <div key={index} className="bg-[var(--hover-bg)] p-4 rounded border border-[var(--panel-border)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[var(--muted-text)]">{consultation.date}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-[var(--muted-text)]">Diagnóstico</label>
                        <p className="text-sm mt-1">{consultation.diagnosis}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[var(--muted-text)]">Prescrição</label>
                        <p className="text-sm mt-1">{consultation.prescription}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
            Editar Prontuário
          </button>
        </div>
      </div>
    </div>
  );
}