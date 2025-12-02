import { Heart, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '@/assets/logo.png';

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="h-14 md:h-16 bg-[var(--header-bg)] border-b border-[var(--panel-border)] flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-10 w-auto"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-[var(--hover-bg)] hover:bg-opacity-20 rounded-lg transition-colors text-white"
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-[var(--hover-bg)] hover:bg-opacity-20 rounded-lg transition-colors text-white"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
