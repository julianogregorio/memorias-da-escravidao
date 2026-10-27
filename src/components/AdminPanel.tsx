import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Save, 
  RotateCcw, 
  ShieldCheck, 
  LogOut, 
  Check, 
  X, 
  Eye, 
  Building2,
  Sparkles,
  Info
} from 'lucide-react';
import { authService, documentosService } from '../services/api';
import { DocumentoHistorico, StatusCuradoria, TipoDocumento, UsuarioAutenticado } from '../types';

interface AdminPanelProps {
  usuario: UsuarioAutenticado | null;
  onLoginSuccess: (usuario: UsuarioAutenticado) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  usuario,
  onLoginSuccess,
  onLogout,
}) => {
  // Estados de Login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sub-abas do Painel
  const [adminTab, setAdminTab] = useState<'cadastro' | 'curadoria'>('cadastro');

  // Estados do Formulário de Cadastro
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('Inventário Post-Mortem');
  const [dataRegistro, setDataRegistro] = useState('');
  const [localRegistro, setLocalRegistro] = useState('Vila da Conceição do Machado');
  const [comarca, setComarca] = useState('Machado (MG)');
  const [cartorioOuParoquia, setCartorioOuParoquia] = useState('1º Ofício de Notas de Machado');
  const [nomeEscravizado, setNomeEscravizado] = useState('');
  const [idade, setIdade] = useState<string>('');
  const [sexo, setSexo] = useState<'Masculino' | 'Feminino' | 'Não especificado'>('Masculino');
  const [naturalidade, setNaturalidade] = useState('');
  const [oficio, setOficio] = useState('');
  const [estadoSaude, setEstadoSaude] = useState('');
  const [valorReis, setValorReis] = useState('');
  const [nomeProprietario, setNomeProprietario] = useState('');
  const [papelProprietario, setPapelProprietario] = useState('Inventariado');
  const [nomeOutraParte, setNomeOutraParte] = useState('');
  const [observacoesTranscritas, setObservacoesTranscritas] = useState('');
  const [fonteArquivistica, setFonteArquivistica] = useState('Arquivo Histórico Municipal de Machado - Caixa de Inventários');

  // Feedback do cadastro
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

  // Curadoria
  const [documentosCuradoria, setDocumentosCuradoria] = useState<DocumentoHistorico[]>([]);
  const [isLoadingCuradoria, setIsLoadingCuradoria] = useState(false);

  const carregarDocumentosCuradoria = async () => {
    setIsLoadingCuradoria(true);
    try {
      const res = await documentosService.getDocumentos({}, 1, 50);
      setDocumentosCuradoria(res.documentos);
    } catch (err) {
      console.error('Erro ao carregar lista de curadoria:', err);
    } finally {
      setIsLoadingCuradoria(false);
    }
  };

  useEffect(() => {
    if (usuario) {
      carregarDocumentosCuradoria();
    }
  }, [usuario]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const authUser = await authService.login(email, senha);
      onLoginSuccess(authUser);
    } catch (err: any) {
      setLoginError(err.message || 'Credenciais de acesso incorretas.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickLoginFill = () => {
    setEmail('juliano.gregorio@alunos.ifsuldeminas.edu.br');
    setSenha('historia2026');
  };

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMessage(null);
    setFormErrorMessage(null);

    if (!nomeEscravizado.trim()) {
      setFormErrorMessage('Por favor, informe o nome da pessoa escravizada.');
      return;
    }
    if (!nomeProprietario.trim()) {
      setFormErrorMessage('Por favor, informe o nome do proprietário ou parte contratante.');
      return;
    }

    setIsSubmitting(true);

    try {
      const anoCalculado = dataRegistro ? new Date(dataRegistro).getFullYear() : 1860;

      const novo = await documentosService.criarDocumento({
        codigoReferencia: `MCH-${tipoDocumento.substring(0, 3).toUpperCase()}-${anoCalculado}-${Math.floor(100 + Math.random() * 900)}`,
        tipoDocumento,
        dataRegistro: dataRegistro || '1860-01-01',
        ano: anoCalculado,
        localRegistro,
        comarca,
        cartorioOuParoquia,
        nomeEscravizado: nomeEscravizado.trim(),
        idade: idade ? Number(idade) : undefined,
        sexo,
        naturalidade: naturalidade.trim() || 'Não declarada',
        oficio: oficio.trim() || 'Lavoura / Doméstico',
        estadoSaude: estadoSaude.trim() || 'Declarado são',
        valorReis: valorReis.trim() || 'Não informado',
        nomeProprietario: nomeProprietario.trim(),
        papelProprietario,
        nomeOutraParte: nomeOutraParte.trim() || undefined,
        observacoesTranscritas: observacoesTranscritas.trim(),
        fonteArquivistica,
        pesquisadorResponsavel: usuario?.nome || 'Pesquisador Credenciado',
      });

      setFormSuccessMessage(`Registro de "${novo.nomeEscravizado}" cadastrado com sucesso! Código gerado: ${novo.codigoReferencia}. Encaminhado para a fila de curadoria.`);
      
      // Limpa os campos principais
      setNomeEscravizado('');
      setIdade('');
      setNaturalidade('');
      setOficio('');
      setEstadoSaude('');
      setValorReis('');
      setObservacoesTranscritas('');
      setNomeOutraParte('');

      // Atualiza a tabela de curadoria
      carregarDocumentosCuradoria();
    } catch (err: any) {
      setFormErrorMessage(err.message || 'Erro ao submeter o registro histórico.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlterarStatusCuradoria = async (id: string, novoStatus: StatusCuradoria) => {
    try {
      await documentosService.atualizarStatus(id, novoStatus);
      setDocumentosCuradoria((prev) =>
        prev.map((d) => (d.id === id ? { ...d, statusCuradoria: novoStatus } : d))
      );
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  // Se não estiver autenticado, exibe a tela de login acadêmico
  if (!usuario) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border border-[#2C1810]/15 rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded bg-[#2C1810] border border-[#C59B27] flex items-center justify-center text-[#C59B27] mx-auto shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810]">
              Área do Pesquisador
            </h1>
            <p className="text-xs text-[#1F2937]/75">
              Autenticação por credencial institucional para inserção e curadoria paleográfica de fontes primárias.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#2C1810]">E-mail Institucional:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pesquisador@ifsuldminas.edu.br"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#2C1810]">Senha de Acesso:</label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] focus:border-[#C59B27]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] transition-colors font-semibold tracking-wide border border-[#C59B27] disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isLoggingIn ? 'Autenticando...' : 'Entrar no Sistema (JWT)'}
            </button>
          </form>

          {/* Botão de Preenchimento Rápido para Avaliação */}
          <div className="pt-3 border-t border-[#2C1810]/10 text-center space-y-2">
            <span className="text-[11px] text-[#1F2937]/60 block">Acesso de Demonstração / Avaliação:</span>
            <button
              type="button"
              onClick={handleQuickLoginFill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F4EFE6] hover:bg-[#EBE5DA] text-xs font-semibold text-[#2C1810] transition-colors border border-[#C59B27]/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Preencher Credenciais IFSULDEMINAS</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Painel Administrativo Autenticado
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Barra de Perfil do Pesquisador */}
      <div className="bg-[#2C1810] text-[#FDFBF7] rounded-lg p-5 sm:p-6 border border-[#C59B27]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#C59B27] font-semibold">
              Painel do Pesquisador · Curadoria Científica
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7]">
            {usuario.nome}
          </h1>
          <div className="text-xs text-[#F4EFE6]/80 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
              {usuario.instituicao}
            </span>
            <span aria-hidden="true">·</span>
            <span>Função: {usuario.papel}</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-white/10 hover:bg-white/20 text-[#FDFBF7] border border-white/20 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5 text-red-300" />
          <span>Encerrar Sessão</span>
        </button>
      </div>

      {/* Navegação entre Sub-abas */}
      <div className="flex items-center gap-2 border-b border-[#2C1810]/15 pb-px">
        <button
          onClick={() => setAdminTab('cadastro')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-t-md transition-colors cursor-pointer border-t border-x ${
            adminTab === 'cadastro'
              ? 'bg-white text-[#2C1810] border-[#2C1810]/20 border-b-2 border-b-white -mb-px font-bold shadow-2xs'
              : 'bg-[#F4EFE6] text-[#1F2937]/75 border-transparent hover:text-[#2C1810]'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-[#C59B27]" />
          <span>Cadastrar Novo Registro Histórico</span>
        </button>

        <button
          onClick={() => setAdminTab('curadoria')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-t-md transition-colors cursor-pointer border-t border-x ${
            adminTab === 'curadoria'
              ? 'bg-white text-[#2C1810] border-[#2C1810]/20 border-b-2 border-b-white -mb-px font-bold shadow-2xs'
              : 'bg-[#F4EFE6] text-[#1F2937]/75 border-transparent hover:text-[#2C1810]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
          <span>Fila de Curadoria &amp; Aprovação ({documentosCuradoria.length})</span>
        </button>
      </div>

      {/* ABA 1: FORMULÁRIO DE CADASTRO */}
      {adminTab === 'cadastro' && (
        <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#2C1810]/15 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2C1810]">
              Cadastro Estruturado de Documento Histórico
            </h2>
            <p className="text-xs text-[#1F2937]/75 mt-0.5">
              Transcreva os dados do auto judicial, escritura de compra/venda ou registro paroquial. 
              As inserções requerem autorização via cabeçalho <code className="font-mono bg-[#F4EFE6] px-1 py-0.5 rounded text-[11px]">Authorization: Bearer TOKEN</code>.
            </p>
          </div>

          {formSuccessMessage && (
            <div className="p-4 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{formSuccessMessage}</span>
            </div>
          )}

          {formErrorMessage && (
            <div className="p-4 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{formErrorMessage}</span>
            </div>
          )}

          <form onSubmit={handleCadastroSubmit} className="space-y-6 text-xs">
            {/* Seção 1: Dados do Documento Notarial */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-[#2C1810]/10 pb-1">
                1. Classificação do Documento e Jurisdição
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Tipo de Documento *</label>
                  <select
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value as TipoDocumento)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  >
                    <option value="Inventário Post-Mortem">Inventário Post-Mortem</option>
                    <option value="Escritura de Compra e Venda">Escritura de Compra e Venda</option>
                    <option value="Carta de Alforria">Carta de Alforria</option>
                    <option value="Registro Paroquial">Registro Paroquial</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Data do Registro (Lavratura) *</label>
                  <input
                    type="date"
                    required
                    value={dataRegistro}
                    onChange={(e) => setDataRegistro(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Local de Registro (Termo/Vila) *</label>
                  <input
                    type="text"
                    required
                    value={localRegistro}
                    onChange={(e) => setLocalRegistro(e.target.value)}
                    placeholder="Ex: Vila da Conceição do Machado"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Comarca</label>
                  <input
                    type="text"
                    value={comarca}
                    onChange={(e) => setComarca(e.target.value)}
                    placeholder="Ex: Machado (MG)"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[#2C1810]">Cartório / Tabelionato / Paróquia *</label>
                  <input
                    type="text"
                    required
                    value={cartorioOuParoquia}
                    onChange={(e) => setCartorioOuParoquia(e.target.value)}
                    placeholder="Ex: 1º Ofício de Notas e Órfãos de Machado"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Dados da Pessoa Escravizada */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-[#2C1810]/10 pb-1">
                2. Informações da Pessoa Escravizada
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[#2C1810]">Nome do Escravizado(a) *</label>
                  <input
                    type="text"
                    required
                    value={nomeEscravizado}
                    onChange={(e) => setNomeEscravizado(e.target.value)}
                    placeholder="Ex: Sebastião, Maria Angolana, Benedito..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Idade Declarada</label>
                  <input
                    type="number"
                    min="0"
                    max="110"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Ex: 28"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Sexo</label>
                  <select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não especificado">Não especificado nos autos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Naturalidade / Procedência / Nação</label>
                  <input
                    type="text"
                    value={naturalidade}
                    onChange={(e) => setNaturalidade(e.target.value)}
                    placeholder="Ex: Crioulo de Minas, Mina, Cabinda, Moçambique..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Ofício / Habilidade Declarada</label>
                  <input
                    type="text"
                    value={oficio}
                    onChange={(e) => setOficio(e.target.value)}
                    placeholder="Ex: Lavrador de café, Ferreiro, Cozinheira..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[#2C1810]">Estado de Saúde / Características Físicas Transcritas</label>
                  <input
                    type="text"
                    value={estadoSaude}
                    onChange={(e) => setEstadoSaude(e.target.value)}
                    placeholder="Ex: Sadio e robusto, marca de bexigas, quebrado de perna..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Valor de Avaliação / Preço (Réis) *</label>
                  <input
                    type="text"
                    value={valorReis}
                    onChange={(e) => setValorReis(e.target.value)}
                    placeholder="Ex: 1:500$000 (1 conto e 500 mil réis)"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Seção 3: Proprietário e Outras Partes */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-[#2C1810]/10 pb-1">
                3. Partes Contratantes / Proprietários
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[#2C1810]">Nome do Proprietário / Senhor / Falecido *</label>
                  <input
                    type="text"
                    required
                    value={nomeProprietario}
                    onChange={(e) => setNomeProprietario(e.target.value)}
                    placeholder="Ex: Capitão Joaquim José de Souza e Silva"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2C1810]">Papel Jurídico da Parte</label>
                  <select
                    value={papelProprietario}
                    onChange={(e) => setPapelProprietario(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  >
                    <option value="Inventariado">Inventariado (Falecido)</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Comprador">Comprador</option>
                    <option value="Concedente de Alforria">Concedente de Alforria</option>
                    <option value="Senhor Paroquial">Senhor Paroquial da Matriz</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="font-semibold text-[#2C1810]">Outra Parte Envolvida (Inventariante, Comprador, Padrinho ou Filiação)</label>
                  <input
                    type="text"
                    value={nomeOutraParte}
                    onChange={(e) => setNomeOutraParte(e.target.value)}
                    placeholder="Ex: Dona Maria Francisca (Inventariante) ou Alferes Thomaz de Aquino (Comprador)"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>
              </div>
            </div>

            {/* Seção 4: Transcrição Paleográfica e Fundo */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-[#2C1810]/10 pb-1">
                4. Transcrição Paleográfica e Fundo Arquivístico
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2C1810]">Observações Transcritas dos Autos (Paleografia Literal) *</label>
                <textarea
                  rows={4}
                  required
                  value={observacoesTranscritas}
                  onChange={(e) => setObservacoesTranscritas(e.target.value)}
                  placeholder="Transcreva ipsis litteris as anotações do escrivão, louvados ou juiz de órfãos..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27] font-serif text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2C1810]">Fundo / Localização Física no Arquivo</label>
                <input
                  type="text"
                  value={fonteArquivistica}
                  onChange={(e) => setFonteArquivistica(e.target.value)}
                  placeholder="Ex: Arquivo Histórico Municipal de Machado - Caixa 12, Autos nº 03"
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#2C1810]/20 rounded focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#2C1810]/10 flex items-center justify-between">
              <span className="text-[11px] text-[#1F2937]/60">
                O registro será encaminhado com status inicial <strong>Pendente</strong> para curadoria.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#2C1810] text-[#FDFBF7] hover:bg-[#3D2217] transition-colors font-semibold tracking-wide border border-[#C59B27] disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4 text-[#C59B27]" />
                <span>{isSubmitting ? 'Salvando Documento...' : 'Salvar Registro Histórico (POST /api/documentos)'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ABA 2: FILA DE CURADORIA E APROVAÇÃO */}
      {adminTab === 'curadoria' && (
        <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#2C1810]/15 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C1810]/10 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C1810]">
                Fluxo de Curadoria e Validação Histórica
              </h2>
              <p className="text-xs text-[#1F2937]/75 mt-0.5">
                Revise os assentamentos submetidos por pesquisadores antes da homologação pública definitiva.
              </p>
            </div>

            <button
              onClick={carregarDocumentosCuradoria}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F4EFE6] text-xs font-semibold text-[#2C1810] hover:bg-[#EBE5DA] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Atualizar Fila</span>
            </button>
          </div>

          {isLoadingCuradoria ? (
            <div className="p-8 text-center text-xs text-[#1F2937]/60">
              Carregando documentos para curadoria...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4EFE6] border-b border-[#2C1810]/15 text-[#2C1810]">
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Código</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Documento / Ano</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Escravizado</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Proprietário</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Pesquisador</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px]">Status Atual</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-[11px] text-right">Ação de Curadoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C1810]/10">
                  {documentosCuradoria.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-[#2C1810]">
                        {doc.codigoReferencia}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-[#1F2937] font-medium">{doc.tipoDocumento}</div>
                        <div className="text-[11px] text-[#1F2937]/60">{doc.dataRegistro} ({doc.ano})</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <strong className="font-serif text-[#2C1810]">{doc.nomeEscravizado}</strong>
                        <div className="text-[11px] text-[#1F2937]/70">
                          {doc.idade !== undefined ? `${doc.idade} anos` : 's/ idade'} · {doc.oficio || 's/ ofício'}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 max-w-[180px] truncate" title={doc.nomeProprietario}>
                        {doc.nomeProprietario}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-[#1F2937]/70">
                        {doc.pesquisadorResponsavel}
                      </td>
                      <td className="py-2.5 px-3">
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
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {doc.statusCuradoria !== 'Aprovado' && (
                            <button
                              onClick={() => handleAlterarStatusCuradoria(doc.id, 'Aprovado')}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Aprovar e homologar para consulta pública"
                            >
                              Aprovar
                            </button>
                          )}
                          {doc.statusCuradoria !== 'Em Análise' && (
                            <button
                              onClick={() => handleAlterarStatusCuradoria(doc.id, 'Em Análise')}
                              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Colocar em análise paleográfica"
                            >
                              Análise
                            </button>
                          )}
                          {doc.statusCuradoria !== 'Rejeitado' && (
                            <button
                              onClick={() => handleAlterarStatusCuradoria(doc.id, 'Rejeitado')}
                              className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Rejeitar ou solicitar revisão"
                            >
                              Rejeitar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
