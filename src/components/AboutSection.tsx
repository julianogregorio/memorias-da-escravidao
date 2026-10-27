import React from 'react';
import { 
  Landmark, 
  BookOpen, 
  ScrollText, 
  Building2, 
  Users, 
  Award, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface AboutSectionProps {
  onNavigateAcervo: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateAcervo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Cabeçalho da Seção */}
      <div className="border-b border-[#2C1810]/15 pb-6">
        <span className="text-xs uppercase tracking-widest text-[#C59B27] font-semibold">
          Historiografia &amp; Extensão Universitária
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C1810] mt-1">
          Sobre o Projeto "Memória da Escravidão no Brasil"
        </h1>
        <p className="text-xs sm:text-sm text-[#1F2937]/80 mt-2 max-w-3xl leading-relaxed">
          Uma iniciativa pioneira de salvaguarda, paleografia e democratização de fontes documentais primárias 
          oitocentistas custodiadas no município de Machado e no território do Sul de Minas Gerais.
        </p>
      </div>

      {/* Grid de Apresentação e Justificativa */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6 text-sm text-[#1F2937]/85 leading-relaxed font-sans">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#2C1810]">
              Origem, Justificativa e Dimensão Social
            </h2>
            <p>
              Historicamente, as fontes judiciais e notariais dos municípios do interior de Minas Gerais 
              permaneceram dispersas em cartórios de notas e arquivos forenses municipais, sob condições 
              precárias de conservação ou sujeitas à perda por ação do tempo e insetos bibliófagos. 
              Em comarcas como Machado — pólo cafeeiro emergente no século XIX —, milhares de homens, mulheres 
              e crianças escravizadas foram arrolados em inventários post-mortem, escrituras de compra e venda 
              e assentos de batismo e óbito paroquiais.
            </p>
            <p>
              O projeto <strong>Memória da Escravidão no Brasil</strong> surge com a missão de transcrever, 
              catalogar e disponibilizar publicamente esses registros. Trata-se de uma intervenção de 
              reparação histórica e científica: retirar o escravizado da condição anônima de "mercadoria" 
              ou "bem móvel" e reconstituir seu nome, laços de parentesco, ofício, procedência étnica e 
              trajetória de vida.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#2C1810]/10">
            <h2 className="font-serif text-xl font-bold text-[#2C1810]">
              Metodologia de Transcrição e Crítica Documental
            </h2>
            <p>
              O trabalho adota as normas contemporâneas da paleografia diplomática e semidiplomática:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F4EFE6] rounded border border-[#2C1810]/15 space-y-1">
                <div className="font-bold text-[#2C1810] text-xs">Fidelidade Paleográfica</div>
                <p className="text-xs text-[#1F2937]/75">
                  Respeito estrito à ortografia original e anotação precisa de abreviaturas e louvados de avaliação.
                </p>
              </div>

              <div className="p-4 bg-[#F4EFE6] rounded border border-[#2C1810]/15 space-y-1">
                <div className="font-bold text-[#2C1810] text-xs">Identificação de Laços de Sangue</div>
                <p className="text-xs text-[#1F2937]/75">
                  Rastreamento sistemático de mães, filhos, irmãos e consórcios conjugais formalizados ou de fato.
                </p>
              </div>

              <div className="p-4 bg-[#F4EFE6] rounded border border-[#2C1810]/15 space-y-1">
                <div className="font-bold text-[#2C1810] text-xs">Normalização Digital Relacional</div>
                <p className="text-xs text-[#1F2937]/75">
                  Estruturação em tabelas matriciais (.xls) e modelagem relacional para consultas SQL avançadas.
                </p>
              </div>

              <div className="p-4 bg-[#F4EFE6] rounded border border-[#2C1810]/15 space-y-1">
                <div className="font-bold text-[#2C1810] text-xs">Transparência e Citação ABNT</div>
                <p className="text-xs text-[#1F2937]/75">
                  Código de referência padronizado e indicação exata de fundo, caixa e maço para verificação física.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Parceria Institucional */}
        <div className="space-y-6">
          <div className="bg-[#FDFBF7] border border-[#2C1810]/20 rounded-lg p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-[#2C1810]/15 pb-3">
              <Landmark className="w-5 h-5 text-[#C59B27]" />
              <h3 className="font-serif font-bold text-base text-[#2C1810]">
                Termo de Cooperação
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#1F2937]/80">
              <div>
                <strong className="block text-[#2C1810]">Prefeitura Municipal de Machado:</strong>
                <span>Secretaria de Cultura e Turismo. Guarda e custódia do patrimônio histórico-documental municipal.</span>
              </div>

              <div>
                <strong className="block text-[#2C1810]">IFSULDEMINAS Campus Machado:</strong>
                <span>Corpo docente, pesquisadores de história e computação aplicada à preservação da memória.</span>
              </div>

              <div>
                <strong className="block text-[#2C1810]">Coordenador do Projeto:</strong>
                <span className="font-serif font-semibold text-[#2C1810]">Prof. Juliano Gregório</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2C1810]/10">
              <button
                onClick={onNavigateAcervo}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] transition-colors cursor-pointer"
              >
                <span>Acessar Acervo Digital</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-5 bg-[#F4EFE6] border border-[#2C1810]/15 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2C1810] uppercase tracking-wide">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>Apoio e Fomento</span>
            </div>
            <p className="text-xs text-[#1F2937]/70 leading-relaxed">
              Iniciativa desenvolvida com fomento institucional de bolsas de pesquisa científica e extensão 
              universitária, reafirmando o compromisso da educação pública federal com a história regional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
