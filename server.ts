import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Banco de dados em memória inicializado no servidor
interface DocServidor {
  id: string;
  codigoReferencia: string;
  tipoDocumento: string;
  dataRegistro: string;
  ano: number;
  localRegistro: string;
  comarca: string;
  cartorioOuParoquia: string;
  nomeEscravizado: string;
  idade?: number;
  sexo?: string;
  naturalidade?: string;
  oficio?: string;
  estadoSaude?: string;
  valorReis?: string;
  nomeProprietario: string;
  papelProprietario: string;
  nomeOutraParte?: string;
  observacoesTranscritas: string;
  fonteArquivistica: string;
  statusCuradoria: 'Aprovado' | 'Pendente' | 'Em Análise' | 'Rejeitado';
  pesquisadorResponsavel: string;
  criadoEm: string;
  atualizadoEm?: string;
}

let documentos: DocServidor[] = [
  {
    id: 'doc-001',
    codigoReferencia: 'MCH-INV-1854-001-A',
    tipoDocumento: 'Inventário Post-Mortem',
    dataRegistro: '1854-06-18',
    ano: 1854,
    localRegistro: 'Vila da Conceição do Machado',
    comarca: 'Machado (MG)',
    cartorioOuParoquia: '1º Ofício de Notas e Órfãos',
    nomeEscravizado: 'Sebastião',
    idade: 32,
    sexo: 'Masculino',
    naturalidade: 'Crioulo de Minas',
    oficio: 'Lavrador e Carpinteiro de Engenho',
    estadoSaude: 'Sadio e robusto',
    valorReis: '1:800$000',
    nomeProprietario: 'Capitão Joaquim José de Souza e Silva',
    papelProprietario: 'Inventariado',
    nomeOutraParte: 'Dona Maria Francisca de Paula (Inventariante)',
    observacoesTranscritas: 'Declarado nos autos como oficial habilitado no concerto das rodas de água e moendas do cafezal na Fazenda do Retiro. Juiz louvou sua avaliação pela elevada perícia mecânica.',
    fonteArquivistica: 'Arquivo Histórico Municipal de Machado - Caixa 12, Autos nº 03',
    statusCuradoria: 'Aprovado',
    pesquisadorResponsavel: 'Prof. Juliano Gregório (IFSULDEMINAS)',
    criadoEm: '2026-02-10T14:30:00Z',
    atualizadoEm: '2026-03-01T10:15:00Z'
  },
  {
    id: 'doc-002',
    codigoReferencia: 'MCH-INV-1854-001-B',
    tipoDocumento: 'Inventário Post-Mortem',
    dataRegistro: '1854-06-18',
    ano: 1854,
    localRegistro: 'Vila da Conceição do Machado',
    comarca: 'Machado (MG)',
    cartorioOuParoquia: '1º Ofício de Notas e Órfãos',
    nomeEscravizado: 'Benedita Mina',
    idade: 26,
    sexo: 'Feminino',
    naturalidade: 'Costa da Mina (África Ocidental)',
    oficio: 'Cozinheira, quitandeira e rendeira',
    estadoSaude: 'Boa compleição, com marcas sutis de bexigas passadas',
    valorReis: '1:400$000',
    nomeProprietario: 'Capitão Joaquim José de Souza e Silva',
    papelProprietario: 'Inventariado',
    nomeOutraParte: 'Antônio de Souza e Silva (Herdeiro)',
    observacoesTranscritas: 'Mãe do menor Bernardo, de idade de dous anos. O Curador Geral de Órfãos requereu que mãe e filho fossem mantidos inseparáveis no mesmo quinhão de herança, sob pena de nulidade da partilha.',
    fonteArquivistica: 'Arquivo Histórico Municipal de Machado - Caixa 12, Autos nº 03',
    statusCuradoria: 'Aprovado',
    pesquisadorResponsavel: 'Profa. Dra. Elena Vasconcelos',
    criadoEm: '2026-02-10T14:35:00Z'
  },
  {
    id: 'doc-003',
    codigoReferencia: 'MCH-INV-1862-014-A',
    tipoDocumento: 'Inventário Post-Mortem',
    dataRegistro: '1862-11-04',
    ano: 1862,
    localRegistro: 'Termo de Machado',
    comarca: 'Machado (MG)',
    cartorioOuParoquia: '2º Ofício Judicial de Machado',
    nomeEscravizado: 'Ignácio Cabinda',
    idade: 45,
    sexo: 'Masculino',
    naturalidade: 'Cabinda (África Central)',
    oficio: 'Feitor de roça e ferrador de bestas',
    estadoSaude: 'Magro, enxuto de carnes, vista cansada',
    valorReis: '900$000',
    nomeProprietario: 'Tenente-Coronel Bento Alves Taveira',
    papelProprietario: 'Inventariado',
    nomeOutraParte: 'Dona Anna Clara de Rezende (Inventariante)',
    observacoesTranscritas: 'Possui marcas corporais características de sua nação de origem. Reconhecido pela habilidade no trato com muares de carga.',
    fonteArquivistica: 'Arquivo Judiciário da Comarca de Machado - Livro 4B, fls. 52',
    statusCuradoria: 'Aprovado',
    pesquisadorResponsavel: 'Prof. Juliano Gregório (IFSULDEMINAS)',
    criadoEm: '2026-02-12T09:20:00Z'
  },
  {
    id: 'doc-004',
    codigoReferencia: 'MCH-CV-1865-042',
    tipoDocumento: 'Escritura de Compra e Venda',
    dataRegistro: '1865-05-14',
    ano: 1865,
    localRegistro: 'Cartório do 1º Tabelionato',
    comarca: 'Machado (MG)',
    cartorioOuParoquia: 'Cartório de Paz e Notas do Termo de Machado',
    nomeEscravizado: 'Luiz',
    idade: 22,
    sexo: 'Masculino',
    naturalidade: 'Pouso Alegre (MG)',
    oficio: 'Carroceiro e campeiro',
    estadoSaude: 'Perfeita saúde e destreza física',
    valorReis: '1:500$000',
    nomeProprietario: 'Tenente João Batista Pereira',
    papelProprietario: 'Vendedor',
    nomeOutraParte: 'Alferes Thomaz de Aquino e Castro (Comprador)',
    observacoesTranscritas: 'Alienado com quitação dada pelo vendedor. Recolhido o competente imposto de Meia-Sisa na Coletoria de Rendas Gerais de Machado sob conhecimento nº 89.',
    fonteArquivistica: 'Livro de Notas nº 11, fls. 78v - Cartório de Registro Civil e Notas de Machado',
    statusCuradoria: 'Aprovado',
    pesquisadorResponsavel: 'Pesquisador Associado Marcos Trindade',
    criadoEm: '2026-02-14T11:00:00Z'
  },
  {
    id: 'doc-005',
    codigoReferencia: 'ALF-ALF-1868-011',
    tipoDocumento: 'Carta de Alforria',
    dataRegistro: '1868-08-15',
    ano: 1868,
    localRegistro: 'Vila de Machado',
    comarca: 'Machado (MG)',
    cartorioOuParoquia: 'Cartório do Termo de Machado',
    nomeEscravizado: 'Maria Antônia de Jesus',
    idade: 35,
    sexo: 'Feminino',
    naturalidade: 'Crioula do Sul de Minas',
    oficio: 'Doceira e quitandeira',
    estadoSaude: 'Boa compleição',
    valorReis: '800$000',
    nomeProprietario: 'Dona Emerenciana Constança da Silveira',
    papelProprietario: 'Concedente de Alforria',
    nomeOutraParte: 'Própria alforriada (Auto-resgate)',
    observacoesTranscritas: 'Alforria onerosa (coartação). A liberta exibiu a quantia de oitocentos mil réis em notas do Tesouro Nacional, acumulada através de suas economias de quitandas.',
    fonteArquivistica: 'Livro de Notas nº 07, fls. 12v - Termo de Machado',
    statusCuradoria: 'Aprovado',
    pesquisadorResponsavel: 'Prof. Juliano Gregório (IFSULDEMINAS)',
    criadoEm: '2026-02-15T16:45:00Z'
  }
];

// Endpoint: GET /api/documentos
app.get('/api/documentos', (req: Request, res: Response) => {
  const {
    nomeEscravizado,
    nomeProprietario,
    anoInicio,
    anoFim,
    tipoDocumento,
    localidade,
    status,
    pagina = '1',
    limite = '10'
  } = req.query;

  let filtrados = [...documentos];

  if (nomeEscravizado && typeof nomeEscravizado === 'string') {
    const termo = nomeEscravizado.toLowerCase().trim();
    filtrados = filtrados.filter(d => d.nomeEscravizado.toLowerCase().includes(termo));
  }

  if (nomeProprietario && typeof nomeProprietario === 'string') {
    const termo = nomeProprietario.toLowerCase().trim();
    filtrados = filtrados.filter(d => 
      d.nomeProprietario.toLowerCase().includes(termo) || 
      (d.nomeOutraParte && d.nomeOutraParte.toLowerCase().includes(termo))
    );
  }

  if (tipoDocumento && typeof tipoDocumento === 'string' && tipoDocumento !== 'Todos') {
    filtrados = filtrados.filter(d => d.tipoDocumento === tipoDocumento);
  }

  if (localidade && typeof localidade === 'string' && localidade !== 'Todas') {
    const termo = localidade.toLowerCase().trim();
    filtrados = filtrados.filter(d => 
      d.localRegistro.toLowerCase().includes(termo) || 
      d.comarca.toLowerCase().includes(termo)
    );
  }

  if (anoInicio) {
    const inicio = Number(anoInicio);
    if (!isNaN(inicio)) filtrados = filtrados.filter(d => d.ano >= inicio);
  }

  if (anoFim) {
    const fim = Number(anoFim);
    if (!isNaN(fim)) filtrados = filtrados.filter(d => d.ano <= fim);
  }

  if (status && typeof status === 'string' && status !== 'Todos') {
    filtrados = filtrados.filter(d => d.statusCuradoria === status);
  }

  filtrados.sort((a, b) => b.ano - a.ano);

  const numPagina = Math.max(1, Number(pagina));
  const numLimite = Math.max(1, Number(limite));
  const total = filtrados.length;
  const totalPaginas = Math.ceil(total / numLimite) || 1;
  const offset = (numPagina - 1) * numLimite;
  const paginados = filtrados.slice(offset, offset + numLimite);

  res.json({
    total,
    pagina: numPagina,
    limite: numLimite,
    totalPaginas,
    documentos: paginados
  });
});

// Endpoint: POST /api/documentos (Requer autenticação Bearer)
app.post('/api/documentos', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Autorização necessária. Forneça o token de pesquisador.' });
    return;
  }

  const payload = req.body;
  if (!payload.nomeEscravizado || !payload.tipoDocumento || !payload.nomeProprietario) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes: nome do escravizado, tipo de documento e proprietário.' });
    return;
  }

  const novoDoc: DocServidor = {
    id: `doc-${Date.now()}`,
    codigoReferencia: payload.codigoReferencia || `MCH-DOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    tipoDocumento: payload.tipoDocumento,
    dataRegistro: payload.dataRegistro || new Date().toISOString().split('T')[0],
    ano: Number(payload.ano) || new Date().getFullYear(),
    localRegistro: payload.localRegistro || 'Machado (MG)',
    comarca: payload.comarca || 'Machado (MG)',
    cartorioOuParoquia: payload.cartorioOuParoquia || 'Ofício de Notas de Machado',
    nomeEscravizado: payload.nomeEscravizado,
    idade: payload.idade ? Number(payload.idade) : undefined,
    sexo: payload.sexo || 'Não especificado',
    naturalidade: payload.naturalidade || 'Não declarada',
    oficio: payload.oficio || 'Não informado',
    estadoSaude: payload.estadoSaude || 'Não declarado',
    valorReis: payload.valorReis || 'Não informado',
    nomeProprietario: payload.nomeProprietario,
    papelProprietario: payload.papelProprietario || 'Proprietário',
    nomeOutraParte: payload.nomeOutraParte,
    observacoesTranscritas: payload.observacoesTranscritas || '',
    fonteArquivistica: payload.fonteArquivistica || 'Arquivo Histórico Municipal de Machado',
    statusCuradoria: 'Pendente',
    pesquisadorResponsavel: payload.pesquisadorResponsavel || 'Pesquisador IFSULDEMINAS',
    criadoEm: new Date().toISOString()
  };

  documentos.unshift(novoDoc);
  res.status(201).json(novoDoc);
});

// Endpoint: PATCH /api/documentos/:id/status
app.patch('/api/documentos/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const doc = documentos.find(d => d.id === id);
  if (!doc) {
    res.status(404).json({ error: 'Documento histórico não encontrado.' });
    return;
  }

  doc.statusCuradoria = status;
  doc.atualizadoEm = new Date().toISOString();
  res.json(doc);
});

// Endpoint: POST /api/auth/login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ error: 'E-mail institucional e senha são obrigatórios.' });
    return;
  }

  // Permite autenticação para pesquisadores credenciados
  const usuario = {
    id: 'usr-ifsuldminas-01',
    nome: email.includes('juliano') ? 'Prof. Juliano Gregório' : 'Pesquisador(a) Institucional',
    email,
    instituicao: 'IFSULDEMINAS Campus Machado / Secretaria de Cultura e Turismo de Machado',
    papel: 'Pesquisador' as const,
    token: `jwt_token_${Buffer.from(email).toString('base64')}_${Date.now()}`
  };

  res.json(usuario);
});

// Endpoint: GET /api/estatisticas
app.get('/api/estatisticas', (_req: Request, res: Response) => {
  res.json({
    totalDocumentos: documentos.length,
    inventarios: documentos.filter(d => d.tipoDocumento === 'Inventário Post-Mortem').length,
    escrituras: documentos.filter(d => d.tipoDocumento === 'Escritura de Compra e Venda').length,
    alforrias: documentos.filter(d => d.tipoDocumento === 'Carta de Alforria').length,
    paroquiais: documentos.filter(d => d.tipoDocumento === 'Registro Paroquial').length,
    periodoInicial: 1850,
    periodoFinal: 1888,
    comarcasPrincipais: ['Machado (MG)', 'Alfenas (MG)', 'Pouso Alegre (MG)', 'Caldas (MG)']
  });
});

// Configuração do Vite middleware em desenvolvimento ou arquivos estáticos em produção
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Memória da Escravidão no Brasil ativo na porta ${PORT}`);
  });
}

startServer();
