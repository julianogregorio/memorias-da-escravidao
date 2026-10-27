/**
 * Definições de Tipos - Memória da Escravidão no Brasil
 * Plataforma Histórica Digital de Machado e Sul de Minas
 */

export type TipoDocumento = 
  | 'Inventário Post-Mortem' 
  | 'Escritura de Compra e Venda' 
  | 'Carta de Alforria' 
  | 'Registro Paroquial';

export type StatusCuradoria = 'Aprovado' | 'Pendente' | 'Em Análise' | 'Rejeitado';

export interface DocumentoHistorico {
  id: string;
  codigoReferencia: string;
  tipoDocumento: TipoDocumento;
  dataRegistro: string; // Formato YYYY-MM-DD
  ano: number;
  localRegistro: string;
  comarca: string;
  cartorioOuParoquia: string;
  
  // Dados do escravizado
  nomeEscravizado: string;
  idade?: number;
  sexo?: 'Masculino' | 'Feminino' | 'Não especificado';
  naturalidade?: string;
  oficio?: string;
  estadoSaude?: string;
  valorReis?: string;
  
  // Proprietários e partes
  nomeProprietario: string;
  papelProprietario: string; // Ex: 'Inventariado', 'Vendedor', 'Concedente de Alforria'
  nomeOutraParte?: string; // Ex: 'Comprador', 'Inventariante'
  
  // Paleografia e catalogação
  observacoesTranscritas: string;
  fonteArquivistica: string;
  statusCuradoria: StatusCuradoria;
  pesquisadorResponsavel: string;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface FiltrosConsulta {
  nomeEscravizado?: string;
  nomeProprietario?: string;
  anoInicio?: number | string;
  anoFim?: number | string;
  tipoDocumento?: string;
  localidade?: string;
  status?: string;
}

export interface RespostaDocumentos {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  documentos: DocumentoHistorico[];
}

export interface AcervoPlanilhaMetadata {
  id: string;
  titulo: string;
  arquivoXls: string;
  caminhoArquivo: string;
  fonteDocumental: string;
  periodo: string;
  qtdRegistrosEstimada: number;
  descricao: string;
  citacaoSugerida: string;
  abas: {
    nomeAba: string;
    entidade: string;
    descricao: string;
  }[];
}

export interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  instituicao: string;
  papel: 'Administrador' | 'Pesquisador' | 'Curador';
  token: string;
}
