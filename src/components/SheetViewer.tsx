import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Download, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Layers, 
  Calendar, 
  Database, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  RefreshCw, 
  AlertCircle,
  Eye,
  X
} from 'lucide-react';
import { METADADOS_ACERVOS } from '../services/mockData';
import { AcervoPlanilhaMetadata } from '../types';

interface SheetViewerProps {
  initialAcervoId?: string;
}

export const SheetViewer: React.FC<SheetViewerProps> = ({ initialAcervoId = 'inventarios-machado' }) => {
  const [selectedAcervoId, setSelectedAcervoId] = useState<string>(initialAcervoId);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheetName, setActiveSheetName] = useState<string>('');
  
  // Dados processados da aba ativa
  const [sheetData, setSheetData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  
  // Estados de controle
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  
  // Modal de visualização detalhada de linha
  const [inspectedRow, setInspectedRow] = useState<Record<string, any> | null>(null);
  const [copiedCitacao, setCopiedCitacao] = useState<boolean>(false);

  const currentAcervo = useMemo(() => {
    return METADADOS_ACERVOS.find(a => a.id === selectedAcervoId) || METADADOS_ACERVOS[0];
  }, [selectedAcervoId]);

  // Carrega dinamicamente o arquivo .xls via SheetJS
  useEffect(() => {
    let isMounted = true;

    async function loadSpreadsheet() {
      setIsLoading(true);
      setErrorMessage(null);
      setWorkbook(null);
      setSheetData([]);
      setColumns([]);
      setSearchTerm('');
      setCurrentPage(1);

      try {
        const response = await fetch(currentAcervo.caminhoArquivo);
        if (!response.ok) {
          throw new Error(`Não foi possível carregar o arquivo da planilha (${response.status} ${response.statusText}).`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const wb = XLSX.read(arrayBuffer, { type: 'array' });

        if (!wb || !wb.SheetNames || wb.SheetNames.length === 0) {
          throw new Error('A planilha selecionada não possui abas válidas para leitura.');
        }

        if (isMounted) {
          setWorkbook(wb);
          setSheetNames(wb.SheetNames);
          const firstSheet = wb.SheetNames[0];
          setActiveSheetName(firstSheet);
          parseSheet(wb, firstSheet);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Falha ao processar arquivo SheetJS:', err);
          setErrorMessage(err.message || 'Erro ao decodificar a planilha histórica.');
          setIsLoading(false);
        }
      }
    }

    loadSpreadsheet();

    return () => {
      isMounted = false;
    };
  }, [currentAcervo]);

  // Função para extrair dados da aba escolhida
  const parseSheet = (wb: XLSX.WorkBook, sheetName: string) => {
    try {
      const ws = wb.Sheets[sheetName];
      if (!ws) {
        setSheetData([]);
        setColumns([]);
        return;
      }

      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: '' });
      if (jsonData.length > 0) {
        const cols = Object.keys(jsonData[0]);
        setColumns(cols);
        setSheetData(jsonData);
      } else {
        setColumns([]);
        setSheetData([]);
      }
      setCurrentPage(1);
    } catch (err) {
      console.error('Erro ao converter aba para JSON:', err);
    }
  };

  // Troca de aba
  const handleSheetTabChange = (sheetName: string) => {
    setActiveSheetName(sheetName);
    setSearchTerm('');
    setSortColumn(null);
    setCurrentPage(1);
    if (workbook) {
      parseSheet(workbook, sheetName);
    }
  };

  // Filtragem por busca global
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return sheetData;
    const term = searchTerm.toLowerCase().trim();

    return sheetData.filter((row) => {
      return Object.values(row).some((val) => 
        String(val).toLowerCase().includes(term)
      );
    });
  }, [sheetData, searchTerm]);

  // Ordenação por colunas
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA === valB) return 0;
      if (valA === '' || valA === null || valA === undefined) return 1;
      if (valB === '' || valB === null || valB === undefined) return -1;

      // Se for número
      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }

      // Se for string
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginação
  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCopyCitacao = () => {
    navigator.clipboard.writeText(currentAcervo.citacaoSugerida);
    setCopiedCitacao(true);
    setTimeout(() => setCopiedCitacao(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header da Seção de Acervo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C1810]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C59B27] font-semibold">
            <FileSpreadsheet className="w-4 h-4 text-[#C59B27]" />
            <span>Fase 1: Consulta Dinâmica de Fontes Tabuladas</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-1">
            Visualizador de Planilhas do Acervo Histórico
          </h1>
          <p className="text-xs sm:text-sm text-[#1F2937]/80 mt-1 max-w-3xl">
            Leitura em tempo real dos arquivos matriciais em formato <code className="bg-[#F4EFE6] px-1 py-0.5 rounded text-[#2C1810] font-mono text-xs">.xls</code>. 
            Navegue pelas abas originais do processo, ordene registros e faça buscas textuais diretas.
          </p>
        </div>

        {/* Botão de Download Direto do Arquivo Original */}
        <div className="flex items-center gap-2">
          <a
            href={currentAcervo.caminhoArquivo}
            download={currentAcervo.arquivoXls}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] transition-colors text-xs font-semibold tracking-wide border border-[#C59B27] shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-[#C59B27]" />
            <span>Download do Arquivo Original (.xls)</span>
          </a>
        </div>
      </div>

      {/* Seletor dos 3 Acervos Principais */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider block">
          Selecione o Conjunto Documental:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {METADADOS_ACERVOS.map((acervo) => {
            const isSelected = acervo.id === selectedAcervoId;
            return (
              <button
                key={acervo.id}
                onClick={() => setSelectedAcervoId(acervo.id)}
                className={`p-4 rounded text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#F4EFE6] border-[#C59B27] shadow-xs ring-1 ring-[#C59B27]'
                    : 'bg-white border-[#2C1810]/15 hover:border-[#2C1810]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-[#2C1810] line-clamp-1">
                    {acervo.titulo}
                  </span>
                  <span className="text-[11px] font-mono text-[#C59B27] font-semibold tabular-nums shrink-0">
                    {acervo.periodo}
                  </span>
                </div>
                <div className="text-[11px] text-[#1F2937]/70 mt-1 line-clamp-2">
                  {acervo.descricao}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cartão de Metadados Acadêmicos do Acervo Selecionado */}
      <div className="bg-[#FDFBF7] rounded-lg border border-[#2C1810]/15 p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#1F2937]/60 block font-medium">Fonte Arquivística Primária:</span>
            <span className="font-semibold text-[#2C1810]">{currentAcervo.fonteDocumental}</span>
          </div>

          <div>
            <span className="text-[#1F2937]/60 block font-medium">Cobertura Temporal:</span>
            <span className="font-semibold text-[#2C1810]">{currentAcervo.periodo} (Século XIX)</span>
          </div>

          <div>
            <span className="text-[#1F2937]/60 block font-medium">Registros Catalogados:</span>
            <span className="font-semibold text-[#2C1810] tabular-nums font-mono">
              {sheetData.length} nesta aba · ~{currentAcervo.qtdRegistrosEstimada} no códice
            </span>
          </div>
        </div>

        {/* Instrução de Citação Acadêmica Recomendada (ABNT) */}
        <div className="pt-3 border-t border-[#2C1810]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4EFE6]/70 p-3 rounded">
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#C59B27] block">
              Como Citar este Documento (Normas ABNT):
            </span>
            <p className="text-xs text-[#2C1810] font-serif italic select-all">
              {currentAcervo.citacaoSugerida}
            </p>
          </div>

          <button
            onClick={handleCopyCitacao}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#2C1810]/20 hover:border-[#C59B27] text-xs font-medium text-[#2C1810] shrink-0 cursor-pointer transition-colors"
            title="Copiar citação ABNT para a área de transferência"
          >
            {copiedCitacao ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Copiar Citação</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navegação por Abas (Entidades da Planilha) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wide mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
              Abas:
            </span>
            {sheetNames.map((sheetName) => {
              const isActive = sheetName === activeSheetName;
              return (
                <button
                  key={sheetName}
                  onClick={() => handleSheetTabChange(sheetName)}
                  className={`px-4 py-2 text-xs font-semibold rounded-t-md transition-all cursor-pointer whitespace-nowrap border-t border-x ${
                    isActive
                      ? 'bg-white text-[#2C1810] border-[#2C1810]/20 border-b-2 border-b-white -mb-px font-bold shadow-2xs'
                      : 'bg-[#F4EFE6] text-[#1F2937]/75 border-transparent hover:text-[#2C1810]'
                  }`}
                >
                  {sheetName}
                </button>
              );
            })}
          </div>

          {/* Busca Global na Tabela */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#1F2937]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar em todas as colunas..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            />
          </div>
        </div>

        {/* Tabela de Dados Extraídos com SheetJS */}
        <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#2C1810]/15 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-[#C59B27] animate-spin mx-auto" />
              <div className="text-sm font-semibold text-[#2C1810]">
                Processando arquivo .xls via SheetJS...
              </div>
              <p className="text-xs text-[#1F2937]/60 max-w-sm mx-auto">
                Extraindo dados matriciais e cabeçalhos históricos da planilha selecionada.
              </p>
            </div>
          ) : errorMessage ? (
            <div className="p-12 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              <div className="text-sm font-semibold text-red-800">
                Falha ao carregar a planilha
              </div>
              <p className="text-xs text-red-700 max-w-md mx-auto">{errorMessage}</p>
            </div>
          ) : columns.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#1F2937]/60">
              Nenhum registro encontrado nesta aba.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F4EFE6] border-b border-[#2C1810]/15 text-[#2C1810]">
                      <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px] w-12 text-center">
                        #
                      </th>
                      {columns.map((col) => {
                        const isSorted = sortColumn === col;
                        return (
                          <th
                            key={col}
                            onClick={() => handleSort(col)}
                            className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px] cursor-pointer hover:bg-[#EBE5DA] transition-colors whitespace-nowrap select-none"
                            title={`Clique para ordenar por ${col}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{col.replace(/_/g, ' ')}</span>
                              {isSorted ? (
                                sortDirection === 'asc' ? (
                                  <ArrowUp className="w-3.5 h-3.5 text-[#C59B27]" />
                                ) : (
                                  <ArrowDown className="w-3.5 h-3.5 text-[#C59B27]" />
                                )
                              ) : (
                                <ArrowUpDown className="w-3 h-3 text-[#1F2937]/30" />
                              )}
                            </div>
                          </th>
                        );
                      })}
                      <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px] text-right">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C1810]/10">
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length + 2} className="py-8 text-center text-xs text-[#1F2937]/60">
                          Nenhum resultado corresponde à busca "{searchTerm}".
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row, index) => {
                        const globalIndex = (currentPage - 1) * rowsPerPage + index + 1;
                        return (
                          <tr
                            key={index}
                            className="hover:bg-[#FDFBF7] transition-colors group"
                          >
                            <td className="py-2.5 px-3 text-center text-[11px] text-[#1F2937]/50 font-mono tabular-nums">
                              {globalIndex}
                            </td>
                            {columns.map((col) => {
                              const val = row[col];
                              return (
                                <td
                                  key={col}
                                  className="py-2.5 px-3 text-[#1F2937] max-w-[280px] truncate"
                                  title={String(val)}
                                >
                                  {val !== '' && val !== null && val !== undefined ? String(val) : '—'}
                                </td>
                              );
                            })}
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => setInspectedRow(row)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F4EFE6] hover:bg-[#C59B27] hover:text-white text-[#2C1810] text-[11px] font-medium transition-colors cursor-pointer"
                                title="Ver registro completo"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Detalhes</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Barra de Paginação e Controles */}
              <div className="bg-[#FDFBF7] border-t border-[#2C1810]/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1F2937]/75">
                <div className="flex items-center gap-2">
                  <span>Exibindo</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-[#2C1810]/20 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  >
                    <option value={5}>5 linhas</option>
                    <option value={10}>10 linhas</option>
                    <option value={25}>25 linhas</option>
                    <option value={50}>50 linhas</option>
                  </select>
                  <span>
                    de <strong className="text-[#2C1810] tabular-nums font-mono">{totalRows}</strong> registros
                    {searchTerm && ` (filtrados da busca)`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    Página <strong className="text-[#2C1810] tabular-nums font-mono">{currentPage}</strong> de <strong className="tabular-nums font-mono">{totalPages}</strong>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="p-1 rounded border border-[#2C1810]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4EFE6] cursor-pointer"
                      title="Página anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage >= totalPages}
                      className="p-1 rounded border border-[#2C1810]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4EFE6] cursor-pointer"
                      title="Próxima página"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Inspeção Completa de Registro da Planilha */}
      {inspectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] border border-[#2C1810]/20 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-5 p-6">
            <div className="flex items-center justify-between border-b border-[#2C1810]/15 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C59B27]" />
                <h3 className="font-serif font-bold text-lg text-[#2C1810]">
                  Cartão Arquivístico do Registro
                </h3>
              </div>
              <button
                onClick={() => setInspectedRow(null)}
                className="p-1 rounded text-[#1F2937]/70 hover:text-[#2C1810] hover:bg-[#F4EFE6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#1F2937]/75">
              <span>Acervo: </span>
              <strong className="text-[#2C1810]">{currentAcervo.titulo}</strong>
              <span className="mx-2">·</span>
              <span>Aba: </span>
              <strong className="text-[#2C1810]">{activeSheetName}</strong>
            </div>

            <div className="divide-y divide-[#2C1810]/10 border border-[#2C1810]/10 rounded bg-white">
              {Object.entries(inspectedRow).map(([chave, valor]) => (
                <div key={chave} className="p-3 text-xs flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <span className="font-semibold text-[#2C1810] w-48 shrink-0 uppercase tracking-wide text-[11px]">
                    {chave.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-[#1F2937] break-words flex-1 font-serif">
                    {valor !== '' && valor !== null && valor !== undefined ? String(valor) : '—'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setInspectedRow(null)}
                className="px-4 py-2 text-xs font-semibold rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] cursor-pointer"
              >
                Fechar Cartão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
