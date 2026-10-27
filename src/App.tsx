/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Plataforma Digital "Memória da Escravidão no Brasil"
 * Comarca de Machado e Sul de Minas Gerais
 * Parceria: Secretaria de Cultura e Turismo de Machado & IFSULDEMINAS Campus Machado
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { SheetViewer } from './components/SheetViewer';
import { DatabaseSearch } from './components/DatabaseSearch';
import { AdminPanel } from './components/AdminPanel';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { authService } from './services/api';
import { UsuarioAutenticado } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'acervo' | 'busca' | 'sobre' | 'admin'>('home');
  const [selectedAcervoId, setSelectedAcervoId] = useState<string>('inventarios-machado');
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);

  // Inicializa a sessão a partir do armazenamento local
  useEffect(() => {
    const usuarioSalvo = authService.getUsuarioAtual();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
  }, []);

  const handleSelectAcervo = (acervoId: string) => {
    setSelectedAcervoId(acervoId);
    setActiveTab('acervo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  const handleLoginSuccess = (user: UsuarioAutenticado) => {
    setUsuario(user);
    setActiveTab('admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1F2937] font-sans">
      {/* Barra de Navegação Superior */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        usuario={usuario}
        onLogout={handleLogout}
        onOpenLogin={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Conteúdo Principal Dinâmico */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onSelectAcervo={handleSelectAcervo}
            onNavigateBusca={() => {
              setActiveTab('busca');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateSobre={() => {
              setActiveTab('sobre');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'acervo' && (
          <SheetViewer initialAcervoId={selectedAcervoId} />
        )}

        {activeTab === 'busca' && (
          <DatabaseSearch
            onSwitchToSheetMode={() => {
              setActiveTab('acervo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'sobre' && (
          <AboutSection
            onNavigateAcervo={() => {
              setActiveTab('acervo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            usuario={usuario}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Rodapé Institucional */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
