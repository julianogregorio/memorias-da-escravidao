import React from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  Search, 
  ArrowRight, 
  Landmark, 
  ScrollText, 
  Scale, 
  Users, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { METADADOS_ACERVOS } from '../services/mockData';

interface HomeProps {
  onSelectAcervo: (id: string) => void;
  onNavigateBusca: () => void;
  onNavigateSobre: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectAcervo,
  onNavigateBusca,
  onNavigateSobre,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Marquee Section */}
      <section className="relative overflow-hidden border-b border-[#2C1810]/15 bg-[#2C1810] text-[#FDFBF7]">
        {/* Measured contrast scrim over archival image */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
          <img
            src="/src/assets/images/historical_manuscript_hero_1792470994702.jpg"
            alt="Manuscritos históricos do século XIX da Comarca de Machado e Sul de Minas"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-[#2C1810]/90 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C59B27]/20 border border-[#C59B27]/40 rounded text-xs text-[#F4EFE6] font-medium tracking-wide">
              <ScrollText className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Plataforma Pública de Documentação Histórica e Memória</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7] leading-tight text-balance">
              Preservação e Consulta da Memória da Escravidão no Brasil
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#F4EFE6]/90 leading-relaxed max-w-2xl">
              Um acervo digital interativo que democratiza o acesso a fontes primárias oitocentistas — 
              inventários post-mortem, escrituras de compra e venda e registros paroquiais — resgatando as 
              trajetórias, nomes e famílias escravizadas na Comarca de Machado e no Sul de Minas Gerais.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectAcervo('inventarios-machado')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded bg-[#C59B27] text-[#2C1810] hover:bg-[#A6801C] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#2C1810]" />
                <span>Explorar Acervo Digital (.xls)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateBusca}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded bg-white/10 hover:bg-white/15 text-[#FDFBF7] border border-[#F4EFE6]/30 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-[#C59B27]" />
                <span>Consulta Avançada (Filtros SQL)</span>
              </button>
            </div>

            {/* Metadados institucionais discretos */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-[#F4EFE6]/75">
              <span>Arquivo Municipal de Machado</span>
              <span aria-hidden="true">·</span>
              <span>Comarca de Machado (MG)</span>
              <span aria-hidden="true">·</span>
              <span>Digitalização &amp; Transcrição Paleográfica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Faixa de Indicadores e Rigor Histórico */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-lg bg-[#F4EFE6] border border-[#2C1810]/15 shadow-2xs">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#C59B27]">Período Documentado</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] tabular-nums">1845 – 1888</div>
            <p className="text-xs text-[#1F2937]/70">Do auge do café à promulgação da abolição</p>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#C59B27]">Páginas Manuscritas</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] tabular-nums">+4.200 fls.</div>
            <p className="text-xs text-[#1F2937]/70">Autos judiciais e livros notariais transcritos</p>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#C59B27]">Indivíduos Catalogados</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] tabular-nums">+1.850</div>
            <p className="text-xs text-[#1F2937]/70">Pessoas escravizadas identificadas nominalmente</p>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#C59B27]">Comarcas do Sul de Minas</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] tabular-nums">12 Termos</div>
            <p className="text-xs text-[#1F2937]/70">Machado, Alfenas, Caldas, Pouso Alegre e região</p>
          </div>
        </div>
      </section>

      {/* Cards de Acesso Rápido aos 3 Acervos Principais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#2C1810]/10 pb-4">
          <span className="text-xs uppercase tracking-widest text-[#C59B27] font-semibold">Fundos Arquivísticos</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-1">
            Os 3 Acervos Documentais da Plataforma
          </h2>
          <p className="font-sans text-sm text-[#1F2937]/80 max-w-2xl mt-1">
            Cada conjunto documental foi rigorosamente higienizado, digitalizado em alta resolução e tabulado 
            em formato estruturado para consulta via navegador ou download imediato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METADADOS_ACERVOS.map((acervo, idx) => (
            <div
              key={acervo.id}
              className="group flex flex-col justify-between rounded-lg border border-[#2C1810]/15 bg-white p-6 shadow-xs hover:border-[#C59B27] hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded bg-[#F4EFE6] border border-[#2C1810]/10 flex items-center justify-center text-[#2C1810] group-hover:bg-[#C59B27] group-hover:text-white transition-colors">
                    {idx === 0 ? <Scale className="w-5 h-5" /> : idx === 1 ? <ScrollText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-semibold text-[#C59B27] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#C59B27]/20">
                    2 Abas Integradas
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#A6801C] transition-colors leading-snug">
                    {acervo.titulo}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#1F2937]/70 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{acervo.periodo}</span>
                    <span aria-hidden="true">·</span>
                    <span>Arquivo .xls</span>
                  </div>
                </div>

                <p className="text-xs text-[#1F2937]/85 leading-relaxed line-clamp-3">
                  {acervo.descricao}
                </p>

                <div className="pt-2 border-t border-[#2C1810]/10 text-xs text-[#1F2937]/70 space-y-1">
                  <div className="font-semibold text-[#2C1810]">Abas da Planilha:</div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
                    {acervo.abas.map((aba) => (
                      <li key={aba.nomeAba} className="truncate">
                        <span className="font-medium text-[#2C1810]">{aba.nomeAba}</span> ({aba.entidade})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#2C1810]/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectAcervo(acervo.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C1810] group-hover:text-[#C59B27] transition-colors cursor-pointer"
                >
                  <span>Abrir no Visualizador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={acervo.caminhoArquivo}
                  download={acervo.arquivoXls}
                  className="text-[11px] text-[#1F2937]/60 hover:text-[#2C1810] hover:underline"
                  title="Baixar arquivo original .xls"
                >
                  Baixar .xls
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Justificativa Histórica & Relevância Social */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#2C1810]/15 bg-[#FDFBF7] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C59B27] font-semibold">Missão &amp; Relevância Social</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-1">
                A Recuperação das Vidas por Trás dos Registros Cartoriais
              </h2>
            </div>

            <p className="font-serif text-base sm:text-lg italic text-[#2C1810]/90 border-l-2 border-[#C59B27] pl-4 leading-relaxed">
              "Nos inventários post-mortem e escrituras públicas do Império, pessoas eram catalogadas 
              ao lado de arrobas de café, animais de carga e ferramentas. Transcrever esses autos não é 
              apenas recuperar documentos: é devolver nomes, laços familiares e dignidade histórica àqueles 
              que construíram com as próprias mãos a riqueza do Sul de Minas."
            </p>

            <div className="space-y-4 font-sans text-sm text-[#1F2937]/85 leading-relaxed">
              <p>
                Durante o século XIX, o avanço da cafeicultura no Sul de Minas Gerais intensificou o tráfico 
                interprovincial e as redes locais de exploração de mão de obra escravizada. Machado constituiu 
                um polo administrativo, agrário e forense de relevância regional.
              </p>
              <p>
                Este projeto de extensão e pesquisa nasce da cooperação entre historiadores, paleógrafos e 
                estudantes do <strong>IFSULDEMINAS Campus Machado</strong> com a <strong>Secretaria Municipal de Cultura e Turismo de Machado</strong>, 
                garantindo que fontes custodiadas em arquivos cartoriais e municipais fiquem permanentemente 
                abertas à sociedade e à rede pública de ensino.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2C1810]/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#2C1810]">Acesso Aberto (Open Science)</div>
                  <div className="text-xs text-[#1F2937]/75">Download irrestrito de planilhas e metadados para pesquisadores acadêmicos.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#2C1810]">Normatização &amp; Citação ABNT</div>
                  <div className="text-xs text-[#1F2937]/75">Cada assentamento possui indicação bibliográfica e arquivística formal.</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateSobre}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2C1810] hover:text-[#C59B27] transition-colors cursor-pointer"
              >
                <span>Ler metodologia e fundamentação historiográfica completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Institucional de Parcerias e Fomento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-[#F4EFE6] border border-[#2C1810]/15 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#2C1810]/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C59B27] font-semibold">Chancela Institucional</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] mt-0.5">
                Realização, Apoio e Cooperação Técnico-Científica
              </h3>
            </div>
            <div className="text-xs text-[#1F2937]/70 md:text-right">
              Projeto aprovado em edital de Preservação do Patrimônio Histórico Regional
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-5 rounded border border-[#2C1810]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#2C1810] font-bold text-sm">
                <Landmark className="w-4 h-4 text-[#C59B27]" />
                <span>Prefeitura Municipal de Machado</span>
              </div>
              <p className="text-xs text-[#1F2937]/75">
                Secretaria Municipal de Cultura e Turismo. Custódia, preservação física e autorização de 
                digitalização dos acervos cartoriais e fundos municipais do município de Machado (MG).
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#2C1810]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#2C1810] font-bold text-sm">
                <Building2 className="w-4 h-4 text-[#C59B27]" />
                <span>IFSULDEMINAS Campus Machado</span>
              </div>
              <p className="text-xs text-[#1F2937]/75">
                Instituto Federal de Educação, Ciência e Tecnologia do Sul de Minas Gerais. Núcleo de Pesquisa 
                Histórica, transcrição paleográfica e desenvolvimento da plataforma computacional.
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#2C1810]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#2C1810] font-bold text-sm">
                <Users className="w-4 h-4 text-[#C59B27]" />
                <span>Órgãos de Fomento à Pesquisa</span>
              </div>
              <p className="text-xs text-[#1F2937]/75">
                Apoio e incentivo institucional vinculado a programas de Iniciação Científica (CNPq, FAPEMIG) 
                e projetos de Extensão e Memória Cultural do Ministério da Educação.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
