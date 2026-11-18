import React, { useState } from 'react';
import { BookOpen, Search, User, LogOut, Menu, X, Landmark, FileSpreadsheet } from 'lucide-react';
import { UsuarioAutenticado } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'acervo' | 'busca' | 'sobre' | 'admin';
  setActiveTab: (tab: 'home' | 'acervo' | 'busca' | 'sobre' | 'admin') => void;
  usuario: UsuarioAutenticado | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  usuario,
  onLogout,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2C1810]/10 text-[#1F2937]">
      {/* Faixa institucional superior minimalista */}
      <div className="bg-[#2C1810] text-[#F4EFE6] text-[11px] py-1.5 px-4 md:px-8 border-b border-[#C59B27]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 tracking-wide font-sans text-xs">
            <Landmark className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
            <span className="text-[#C59B27] font-semibold">Realização:</span>
            <span className="hidden sm:inline">
              Grupo de Pesquisa em Cultura Material (GPCM) &amp; IFSULDEMINAS – Campus Machado
            </span>
            <span className="sm:hidden">GPCM &amp; IFSULDEMINAS</span>
          </div>
          <div className="text-[11px] text-[#F4EFE6]/70 hidden md:flex items-center gap-3">
            <span>Repositório de Fontes Primárias</span>
            <span aria-hidden="true">·</span>
            <span>Séculos XVIII e XIX</span>
          </div>
        </div>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-[4.5rem] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-sm bg-[#2C1810] border border-[#C59B27] flex items-center justify-center text-[#C59B27] shadow-xs group-hover:bg-[#3D2217] transition-colors shrink-0">
            <BookOpen className="w-5 h-5 text-[#C59B27]" />
          </div>
          <div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#2C1810] block leading-tight">
              Memórias da Escravidão no Brasil
            </span>
            <span className="text-[11px] uppercase tracking-wider text-[#C59B27] font-semibold block">
              Bases de Dados &amp; Pesquisa Histórica
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line, concise) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'home'
                ? 'border-[#C59B27] text-[#2C1810] font-semibold'
                : 'border-transparent text-[#1F2937]/80 hover:text-[#2C1810] hover:border-[#2C1810]/30'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => setActiveTab('acervo')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'acervo'
                ? 'border-[#C59B27] text-[#2C1810] font-semibold'
                : 'border-transparent text-[#1F2937]/80 hover:text-[#2C1810] hover:border-[#2C1810]/30'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C59B27]" />
            Acervo Digital (.xls)
          </button>

          <button
            onClick={() => setActiveTab('busca')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'busca'
                ? 'border-[#C59B27] text-[#2C1810] font-semibold'
                : 'border-transparent text-[#1F2937]/80 hover:text-[#2C1810] hover:border-[#2C1810]/30'
            }`}
          >
            <Search className="w-4 h-4 text-[#C59B27]" />
            Consulta Avançada (SQL)
          </button>

          <button
            onClick={() => setActiveTab('sobre')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'sobre'
                ? 'border-[#C59B27] text-[#2C1810] font-semibold'
                : 'border-transparent text-[#1F2937]/80 hover:text-[#2C1810] hover:border-[#2C1810]/30'
            }`}
          >
            Sobre o Projeto
          </button>
        </nav>

        {/* Zone 3: Primary Action / Researcher Area */}
        <div className="flex items-center gap-3 shrink-0">
          {usuario ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-[#2C1810] text-[#F4EFE6] border-[#2C1810]'
                    : 'bg-[#F4EFE6] text-[#2C1810] border-[#2C1810]/20 hover:border-[#C59B27]'
                }`}
                title={`Logado como: ${usuario.nome}`}
              >
                <User className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="hidden sm:inline max-w-[130px] truncate">{usuario.nome.split(' ')[0]} (Painel)</span>
                <span className="sm:hidden">Painel</span>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 text-[#1F2937]/70 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                title="Encerrar sessão de pesquisador"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-[#2C1810] text-[#FDFBF7] rounded hover:bg-[#3D2217] transition-colors border border-[#C59B27] shadow-xs cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Área do Pesquisador</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#2C1810] hover:bg-[#F4EFE6] cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2C1810]/10 bg-[#FDFBF7] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded ${
              activeTab === 'home' ? 'bg-[#F4EFE6] text-[#2C1810] font-bold' : 'text-[#1F2937]'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => {
              setActiveTab('acervo');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded flex items-center gap-2 ${
              activeTab === 'acervo' ? 'bg-[#F4EFE6] text-[#2C1810] font-bold' : 'text-[#1F2937]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C59B27]" />
            Acervo Digital (.xls)
          </button>
          <button
            onClick={() => {
              setActiveTab('busca');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded flex items-center gap-2 ${
              activeTab === 'busca' ? 'bg-[#F4EFE6] text-[#2C1810] font-bold' : 'text-[#1F2937]'
            }`}
          >
            <Search className="w-4 h-4 text-[#C59B27]" />
            Consulta Avançada (SQL)
          </button>
          <button
            onClick={() => {
              setActiveTab('sobre');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded ${
              activeTab === 'sobre' ? 'bg-[#F4EFE6] text-[#2C1810] font-bold' : 'text-[#1F2937]'
            }`}
          >
            Sobre o Projeto
          </button>
          {usuario && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded flex items-center gap-2 ${
                activeTab === 'admin' ? 'bg-[#F4EFE6] text-[#2C1810] font-bold' : 'text-[#1F2937]'
              }`}
            >
              <User className="w-4 h-4 text-[#C59B27]" />
              Painel do Pesquisador (Inserção e Curadoria)
            </button>
          )}
        </div>
      )}
    </header>
  );
};