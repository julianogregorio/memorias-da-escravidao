import React from 'react';
import { BookOpen, Landmark, Building2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'acervo' | 'busca' | 'sobre' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#2C1810] text-[#FDFBF7] border-t border-[#C59B27]/40 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#F4EFE6]/10 text-xs">
          {/* Coluna 1: Identidade do Projeto */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#C59B27] text-[#2C1810] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-[#FDFBF7]">
                Memórias da Escravidão no Brasil
              </span>
            </div>

            <p className="text-[#F4EFE6]/80 text-xs leading-relaxed max-w-md">
              Repositório digital aberto dedicado à transcrição paleográfica, catalogação sistemática e 
              difusão de fontes primárias — como inventários post-mortem, registros paroquiais e escrituras 
              de compra e venda de escravizados — na história social brasileira.
            </p>

            <div className="pt-2 text-[11px] text-[#C59B27] font-semibold">
              Bases de Dados &amp; Pesquisa Histórica · Acesso Aberto
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-2">
            <h4 className="font-semibold uppercase tracking-wider text-[#C59B27] text-[11px]">
              Navegação do Acervo
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F4EFE6]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('acervo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Acervo Digital (.xls)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('busca')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consulta Avançada (SQL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Historiografia &amp; Metodologia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Área do Pesquisador (Login)
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Instituições (Realização) */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#C59B27] text-[11px]">
              Realização Institucional
            </h4>
            <div className="space-y-2 text-xs text-[#F4EFE6]/80">
              <div className="flex items-start gap-2">
                <Landmark className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Grupo de Pesquisa em Cultura Material (GPCM)</div>
                  <div className="text-[11px] text-[#F4EFE6]/70">História Social, Cultural &amp; Materialidade</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">IFSULDEMINAS</div>
                  <div className="text-[11px] text-[#F4EFE6]/70">Campus Machado · Ensino, Pesquisa e Extensão</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé inferior com diretrizes de citação e licença */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-[#F4EFE6]/60">
          <div>
            © {new Date().getFullYear()} Plataforma Memórias da Escravidão no Brasil · Licença de Uso Acadêmico (CC-BY-NC 4.0).
          </div>
          <div className="flex items-center gap-3">
            <span>Fontes Primárias de Domínio Público</span>
            <span aria-hidden="true">·</span>
            <span>GPCM | IFSULDEMINAS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};