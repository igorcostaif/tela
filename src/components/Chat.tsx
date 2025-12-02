import { Send, FileText, X, Paperclip, File, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { Person } from '../App';

type ChatProps = {
  person: Person;
  onOpenMedicalRecord: () => void;
  onEndChat?: () => void;
  fullScreen?: boolean;
};

type Message = {
  id: string;
  sender: 'user' | 'person';
  text?: string;
  time: string;
  file?: {
    name: string;
    type: 'image' | 'document';
    url?: string;
  };
};

export function Chat({ person, onOpenMedicalRecord, onEndChat, fullScreen = false }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'person',
      text: 'Olá! Obrigado por me atender.',
      time: '10:32'
    },
    {
      id: '2',
      sender: 'user',
      text: 'Olá! Como posso ajudá-lo hoje?',
      time: '10:33'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: inputValue,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'document';
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        file: {
          name: file.name,
          type: fileType,
          url: fileType === 'image' ? URL.createObjectURL(file) : undefined
        }
      };
      setMessages([...messages, newMessage]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${fullScreen ? 'flex-1' : 'h-48 md:h-64'} border-t border-[var(--panel-border)] flex flex-col bg-[var(--app-bg)]`}>
      <div className="px-4 md:px-6 py-2 md:py-3 border-b border-[var(--panel-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xs md:text-sm">Chat {fullScreen && `com ${person.name}`}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMedicalRecord}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-[var(--hover-bg)] hover:opacity-80 rounded-lg transition-colors text-xs md:text-sm"
          >
            <FileText size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Prontuário</span>
          </button>
          {onEndChat && (
            <button
              onClick={onEndChat}
              className="p-1.5 hover:bg-[var(--hover-bg)] rounded transition-colors"
              title="Fechar chat"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-[var(--primary-btn)] text-white'
                  : 'bg-[var(--hover-bg)] text-[var(--app-fg)]'
              }`}
            >
              {message.text && <p className="text-sm">{message.text}</p>}
              {message.file && (
                <div className="mt-2">
                  {message.file.type === 'image' && message.file.url ? (
                    <img 
                      src={message.file.url} 
                      alt={message.file.name}
                      className="max-w-full rounded border border-white/20"
                    />
                  ) : (
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded">
                      <File size={20} />
                      <span className="text-sm">{message.file.name}</span>
                    </div>
                  )}
                </div>
              )}
              <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 md:p-4 border-t border-[var(--panel-border)]">
        <div className="flex gap-1.5 md:gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <button
            onClick={handleAttachClick}
            className="px-2 md:px-3 py-2 bg-[var(--hover-bg)] hover:opacity-80 rounded-lg transition-colors flex-shrink-0"
            title="Anexar arquivo"
          >
            <Paperclip size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite uma mensagem..."
            className="flex-1 bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm focus:outline-none focus:border-[var(--primary-btn)] text-[var(--app-fg)] placeholder-[var(--muted-text)]"
          />
          <button
            onClick={handleSend}
            className="px-3 md:px-4 py-2 bg-[var(--primary-btn)] hover:bg-[var(--primary-btn-hover)] rounded-lg transition-colors flex-shrink-0 text-white"
          >
            <Send size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}