import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  FileSpreadsheet, 
  Database, 
  Calendar, 
  MapPin, 
  User, 
  FileText, 
  Eye, 
  X, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  Download,
  ScrollText,
  BadgeCheck,
  Clock,
  Layers
} from 'lucide-react';
import { documentosService } from '../services/api';
import { DocumentoHistorico, FiltrosConsulta, RespostaDocumentos } from '../types';

interface DatabaseSearchProps {
  onSwitchToSheetMode: () => void;
}

export const DatabaseSearch: React.FC<DatabaseSearchProps> = ({ onSwitchToSheetMode }) => {
  // Filtros
  const [filtros, setFiltros] = useState<FiltrosConsulta>({
    nomeEscravizado: '',
    nomeProprietario: '',
    anoInicio: '',
    anoFim: '',
    tipoDocumento: 'Todos',
    localidade: 'Todas',
    status: 'Todos',
  });

  // Estados de consulta e dados
  const [resposta, setResposta] = useState<RespostaDocumentos>({
    total: 0,
    pagina: 1,
    limite: 10,
    totalPaginas: 1,
    documentos: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal de Detalhes
  const [detalhesDoc, setDetalhesDoc] = useState<DocumentoHistorico | null>(null);
  const [copiouCitacao, setCopiouCitacao] = useState<boolean>(false);

  // Executa busca via Axios / API REST
  const executarBusca = useCallback(async (pagina = 1, limite = pageSize) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await documentosService.getDocumentos(filtros, pagina, limite);
      setResposta(data);
      setCurrentPage(data.pagina);
    } catch (err: any) {
      console.error('Erro ao consultar banco de dados:', err);
      setErrorMessage(err.message || 'Erro ao conectar à API de pesquisa histórica.');
    } finally {
      setIsLoading(false);
    }
  }, [filtros, pageSize]);

  // Carrega na montagem e quando muda a página
  useEffect(() => {
    executarBusca(currentPage, pageSize);
  }, [currentPage, pageSize, executarBusca]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    executarBusca(1, pageSize);
  };

  const handleReset = () => {
    const limpos: FiltrosConsulta = {
      nomeEscravizado: '',
      nomeProprietario: '',
      anoInicio: '',
      anoFim: '',
      tipoDocumento: 'Todos',
      localidade: 'Todas',
      status: 'Todos',
    };
    setFiltros(limpos);
    setCurrentPage(1);
    documentosService.getDocumentos(limpos, 1, pageSize).then(setResposta);
  };

  const gerarCitacaoABNT = (doc: DocumentoHistorico) => {
    const ano = doc.ano || 's.d.';
    return `COMARCA DE MACHADO (MG). ${doc.cartorioOuParoquia}. ${doc.tipoDocumento} ref. ${doc.codigoReferencia}. Registro de ${doc.nomeEscravizado}. ${doc.localRegistro}, ${ano}. Acervo Digital da Memória da Escravidão no Brasil - IFSULDEMINAS / Sec. Cultura de Machado.`;
  };

  const handleCopiarCitacao = (doc: DocumentoHistorico) => {
    navigator.clipboard.writeText(gerarCitacaoABNT(doc));
    setCopiouCitacao(true);
    setTimeout(() => setCopiouCitacao(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header com Alternador de Modo: Planilha (.xls) vs Banco de Dados SQL */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#2C1810]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C59B27] font-semibold">
            <Database className="w-4 h-4 text-[#C59B27]" />
            <span>Fase 2: Conexão com Banco de Dados Relacional (PostgreSQL / REST API)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-1">
            Consulta Avançada no Repositório Histórico
          </h1>
          <p className="text-xs sm:text-sm text-[#1F2937]/80 mt-1 max-w-2xl">
            Realize buscas indexadas com múltiplos cruzamentos genealógicos e cartoriais, consumindo a API 
            de documentos históricos normalizados.
          </p>
        </div>

        {/* Alternador de Modo de Interface (Segmented Control) */}
        <div className="flex items-center p-1 bg-[#F4EFE6] rounded-md border border-[#2C1810]/15 shrink-0 self-start lg:self-auto">
          <button
            onClick={onSwitchToSheetMode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded text-[#1F2937]/80 hover:text-[#2C1810] transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Modo Planilha (.xls)</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-white text-[#2C1810] shadow-xs border border-[#2C1810]/10">
            <Database className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Modo Busca em Banco (SQL)</span>
          </div>
        </div>
      </div>

      {/* Formulário de Filtros Avançados */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-[#2C1810]/15 p-5 sm:p-6 shadow-xs space-y-5"
      >
        <div className="flex items-center justify-between border-b border-[#2C1810]/10 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C59B27]" />
            <h2 className="font-serif text-sm font-bold text-[#2C1810] uppercase tracking-wide">
              Filtros Estruturados de Pesquisa
            </h2>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-[#1F2937]/70 hover:text-[#2C1810] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar Filtros</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Nome do Escravizado */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Nome da Pessoa Escravizada:</span>
            </label>
            <input
              type="text"
              value={filtros.nomeEscravizado || ''}
              onChange={(e) => setFiltros({ ...filtros, nomeEscravizado: e.target.value })}
              placeholder="Ex: Benedita, Sebastião, Ignácio..."
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            />
          </div>

          {/* Nome do Proprietário / Comprador / Vendedor */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Nome do Proprietário / Contratante:</span>
            </label>
            <input
              type="text"
              value={filtros.nomeProprietario || ''}
              onChange={(e) => setFiltros({ ...filtros, nomeProprietario: e.target.value })}
              placeholder="Ex: Joaquim José de Souza, Bento Alves..."
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            />
          </div>

          {/* Tipo de Documento */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <ScrollText className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Tipo de Documento:</span>
            </label>
            <select
              value={filtros.tipoDocumento}
              onChange={(e) => setFiltros({ ...filtros, tipoDocumento: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            >
              <option value="Todos">Todos os Tipos</option>
              <option value="Inventário Post-Mortem">Inventário Post-Mortem</option>
              <option value="Escritura de Compra e Venda">Escritura de Compra e Venda</option>
              <option value="Carta de Alforria">Carta de Alforria</option>
              <option value="Registro Paroquial">Registro Paroquial</option>
            </select>
          </div>

          {/* Período / Ano Inicial e Final */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Período Histórico (Ano):</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="1750"
                max="1888"
                value={filtros.anoInicio || ''}
                onChange={(e) => setFiltros({ ...filtros, anoInicio: e.target.value })}
                placeholder="De (Ex: 1850)"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] tabular-nums"
              />
              <input
                type="number"
                min="1750"
                max="1888"
                value={filtros.anoFim || ''}
                onChange={(e) => setFiltros({ ...filtros, anoFim: e.target.value })}
                placeholder="Até (Ex: 1888)"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] tabular-nums"
              />
            </div>
          </div>

          {/* Localidade / Comarca */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Localidade / Comarca:</span>
            </label>
            <select
              value={filtros.localidade}
              onChange={(e) => setFiltros({ ...filtros, localidade: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            >
              <option value="Todas">Todas as Localidades</option>
              <option value="Machado">Machado (MG)</option>
              <option value="Alfenas">Alfenas (MG)</option>
              <option value="Pouso Alegre">Pouso Alegre (MG)</option>
              <option value="Caldas">Caldas (MG)</option>
              <option value="Campanha">Campanha (MG)</option>
            </select>
          </div>

          {/* Status de Curadoria */}
          <div className="space-y-1">
            <label className="font-medium text-[#2C1810] flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Status de Curadoria:</span>
            </label>
            <select
              value={filtros.status}
              onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Aprovado">Aprovado (Revisão Homologada)</option>
              <option value="Em Análise">Em Análise Paleográfica</option>
              <option value="Pendente">Pendente de Parecer</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-3 border-t border-[#2C1810]/10">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] transition-colors text-xs font-semibold tracking-wide border border-[#C59B27] shadow-xs cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#C59B27]" />
            <span>Consultar Registros no Banco SQL</span>
          </button>
        </div>
      </form>

      {/* Resultados da Pesquisa em Tabela Paginada */}
      <div className="bg-white rounded-lg border border-[#2C1810]/15 shadow-xs overflow-hidden">
        {/* Barra superior de contagem e API info */}
        <div className="bg-[#F4EFE6] border-b border-[#2C1810]/15 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="font-serif font-bold text-[#2C1810]">
            Resultados Localizados no Banco de Dados ({resposta.total} registros)
          </div>
          <div className="text-[#1F2937]/70 flex items-center gap-2">
            <span>Endpoint: <code className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#2C1810]/10">GET /api/documentos</code></span>
          </div>
        </div>

        {isLoading ? (
          /* Skeleton Loader */
          <div className="p-8 space-y-4">
            <div className="h-4 bg-[#F4EFE6] rounded w-3/4 animate-pulse" />
            <div className="h-10 bg-[#F4EFE6] rounded w-full animate-pulse" />
            <div className="h-10 bg-[#F4EFE6] rounded w-full animate-pulse" />
            <div className="h-10 bg-[#F4EFE6] rounded w-full animate-pulse" />
          </div>
        ) : errorMessage ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <div className="text-sm font-semibold text-red-800">Erro na consulta do banco de dados</div>
            <p className="text-xs text-red-700 max-w-md mx-auto">{errorMessage}</p>
          </div>
        ) : resposta.documentos.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <ScrollText className="w-8 h-8 text-[#C59B27] mx-auto opacity-70" />
            <div className="text-sm font-semibold text-[#2C1810]">Nenhum registro histórico localizado</div>
            <p className="text-xs text-[#1F2937]/60 max-w-sm mx-auto">
              Tente flexibilizar os critérios de busca (ampliar o intervalo de anos ou alterar a localidade).
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FDFBF7] border-b border-[#2C1810]/15 text-[#2C1810]">
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Código</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Tipo de Documento</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Ano / Data</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Pessoa Escravizada</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Proprietário / Partes</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Valor (Réis)</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Local / Comarca</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Curadoria</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px] text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C1810]/10">
                  {resposta.documentos.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#2C1810] font-semibold whitespace-nowrap">
                        {doc.codigoReferencia}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-[#1F2937]">
                        {doc.tipoDocumento}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono tabular-nums text-[#1F2937]/80">
                        {doc.ano}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-serif font-bold text-[#2C1810]">{doc.nomeEscravizado}</div>
                        <div className="text-[11px] text-[#1F2937]/70">
                          {doc.idade !== undefined ? `${doc.idade} anos` : 'Idade ñ declarada'} · {doc.naturalidade || 'Procedência ñ inf.'}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px]">
                        <div className="text-[#1F2937] font-medium truncate" title={doc.nomeProprietario}>
                          {doc.nomeProprietario}
                        </div>
                        <div className="text-[11px] text-[#1F2937]/60 truncate">
                          {doc.papelProprietario} {doc.nomeOutraParte ? `· ${doc.nomeOutraParte}` : ''}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-[#2C1810] font-semibold">
                        {doc.valorReis || '—'}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-[11px] text-[#1F2937]/80">
                        {doc.comarca}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          doc.statusCuradoria === 'Aprovado'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : doc.statusCuradoria === 'Em Análise'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-stone-100 text-stone-800 border-stone-200'
                        }`}>
                          {doc.statusCuradoria}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setDetalhesDoc(doc)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F4EFE6] hover:bg-[#C59B27] hover:text-white text-[#2C1810] text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspecionar</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="bg-[#FDFBF7] border-t border-[#2C1810]/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1F2937]/75">
              <div className="flex items-center gap-2">
                <span>Registros por página:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    const novoTam = Number(e.target.value);
                    setPageSize(novoTam);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-[#2C1810]/20 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span>de <strong>{resposta.total}</strong> resultados</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Página <strong>{currentPage}</strong> de <strong>{resposta.totalPaginas}</strong></span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="p-1 rounded border border-[#2C1810]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4EFE6] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(resposta.totalPaginas, p + 1))}
                    disabled={currentPage >= resposta.totalPaginas}
                    className="p-1 rounded border border-[#2C1810]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4EFE6] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal Completo de Inspeção Paleográfica e Jurídica */}
      {detalhesDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] border border-[#2C1810]/20 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-[#2C1810]/15 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C59B27] font-semibold block">
                  Autos do Processo · {detalhesDoc.tipoDocumento}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2C1810] mt-0.5">
                  Registro de {detalhesDoc.nomeEscravizado}
                </h3>
                <div className="text-xs text-[#1F2937]/70 font-mono mt-0.5">
                  Ref: {detalhesDoc.codigoReferencia} · Data: {detalhesDoc.dataRegistro} ({detalhesDoc.ano})
                </div>
              </div>
              <button
                onClick={() => setDetalhesDoc(null)}
                className="p-1.5 rounded text-[#1F2937]/70 hover:text-[#2C1810] hover:bg-[#F4EFE6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid de Informações Biográficas e Cartoriais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded border border-[#2C1810]/10 space-y-2">
                <div className="font-semibold text-[#2C1810] uppercase tracking-wider text-[11px] border-b border-[#2C1810]/10 pb-1">
                  Identificação do Escravizado
                </div>
                <div><span className="text-[#1F2937]/70">Nome Declarado:</span> <strong className="text-[#2C1810] font-serif">{detalhesDoc.nomeEscravizado}</strong></div>
                <div><span className="text-[#1F2937]/70">Idade Registrada:</span> <strong>{detalhesDoc.idade !== undefined ? `${detalhesDoc.idade} anos` : 'Não declarada'}</strong></div>
                <div><span className="text-[#1F2937]/70">Sexo:</span> <strong>{detalhesDoc.sexo || 'Não especificado'}</strong></div>
                <div><span className="text-[#1F2937]/70">Naturalidade / Procedência:</span> <strong>{detalhesDoc.naturalidade || 'Não informada'}</strong></div>
                <div><span className="text-[#1F2937]/70">Ofício / Habilidade:</span> <strong>{detalhesDoc.oficio || 'Não informado'}</strong></div>
                <div><span className="text-[#1F2937]/70">Estado de Saúde / Sinais:</span> <strong>{detalhesDoc.estadoSaude || 'Não declarado'}</strong></div>
                <div><span className="text-[#1F2937]/70">Avaliação Pecuniária:</span> <strong className="font-mono text-[#C59B27]">{detalhesDoc.valorReis || 'Sem valor'}</strong></div>
              </div>

              <div className="bg-white p-4 rounded border border-[#2C1810]/10 space-y-2">
                <div className="font-semibold text-[#2C1810] uppercase tracking-wider text-[11px] border-b border-[#2C1810]/10 pb-1">
                  Contexto Notarial e Forense
                </div>
                <div><span className="text-[#1F2937]/70">Proprietário / Vendedor / Senhor:</span> <strong className="text-[#2C1810]">{detalhesDoc.nomeProprietario}</strong></div>
                <div><span className="text-[#1F2937]/70">Papel Jurídico:</span> <strong>{detalhesDoc.papelProprietario}</strong></div>
                {detalhesDoc.nomeOutraParte && (
                  <div><span className="text-[#1F2937]/70">Outra Parte (Comprador/Herdeiro):</span> <strong>{detalhesDoc.nomeOutraParte}</strong></div>
                )}
                <div><span className="text-[#1F2937]/70">Comarca:</span> <strong>{detalhesDoc.comarca}</strong></div>
                <div><span className="text-[#1F2937]/70">Termo / Localidade:</span> <strong>{detalhesDoc.localRegistro}</strong></div>
                <div><span className="text-[#1F2937]/70">Cartório / Ofício:</span> <strong>{detalhesDoc.cartorioOuParoquia}</strong></div>
                <div><span className="text-[#1F2937]/70">Fundo Custodiante:</span> <strong>{detalhesDoc.fonteArquivistica}</strong></div>
              </div>
            </div>

            {/* Transcrição Paleográfica Literal */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#C59B27] block">
                Transcrição Paleográfica dos Autos:
              </span>
              <div className="p-4 rounded bg-[#F4EFE6] border border-[#2C1810]/15 font-serif text-sm leading-relaxed text-[#2C1810] italic">
                "{detalhesDoc.observacoesTranscritas || 'Sem notas adicionais transcritas neste termo.'}"
              </div>
            </div>

            {/* Citação ABNT para Artigos Científicos */}
            <div className="p-3 bg-white border border-[#2C1810]/15 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#2C1810]">
                  Citação Recomendada (Normas ABNT):
                </span>
                <button
                  onClick={() => handleCopiarCitacao(detalhesDoc)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C1810] hover:text-[#C59B27] cursor-pointer"
                >
                  {copiouCitacao ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#C59B27]" />
                      <span>Copiar Citação</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#1F2937]/80 font-mono select-all">
                {gerarCitacaoABNT(detalhesDoc)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2C1810]/10 text-xs text-[#1F2937]/60">
              <span>Pesquisador responsável: <strong>{detalhesDoc.pesquisadorResponsavel}</strong></span>
              <button
                onClick={() => setDetalhesDoc(null)}
                className="px-4 py-2 text-xs font-semibold rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] cursor-pointer"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
