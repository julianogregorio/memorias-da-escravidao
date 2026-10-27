import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const publicDir = path.resolve('public', 'acervo');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Inventários Post-Mortem de Machado
const wb1 = XLSX.utils.book_new();

const inventariosAutosData = [
  {
    "ID_Auto": "INV-MCH-1854-001",
    "Ano": 1854,
    "Comarca": "Machado (MG)",
    "Inventariado": "Capitão Joaquim José de Souza e Silva",
    "Inventariante": "Dona Maria Francisca de Paula",
    "Juiz_Orfaos": "Dr. Cândido Ferreira de Carvalho",
    "Cartorio": "1º Ofício de Notas e Órfãos de Machado",
    "Total_Bens_Reis": "48:520$000",
    "Qtd_Escravizados": 14,
    "Status_Processual": "Homologado",
    "Localizacao_Original": "Arquivo Histórico Municipal de Machado - Caixa 12, Maço 3"
  },
  {
    "ID_Auto": "INV-MCH-1862-014",
    "Ano": 1862,
    "Comarca": "Machado (MG)",
    "Inventariado": "Tenente-Coronel Bento Alves Taveira",
    "Inventariante": "Dona Anna Clara de Rezende",
    "Juiz_Orfaos": "Bel. Manoel Olympio Rodrigues da Costa",
    "Cartorio": "2º Ofício Judicial de Machado",
    "Total_Bens_Reis": "92:150$000",
    "Qtd_Escravizados": 28,
    "Status_Processual": "Partilha Concluída",
    "Localizacao_Original": "Arquivo Judiciário da Comarca de Machado - Livro 4B, fls. 45-88"
  },
  {
    "ID_Auto": "INV-MCH-1871-008",
    "Ano": 1871,
    "Comarca": "Machado (MG)",
    "Inventariado": "Dona Gertrudes Maria da Assunção",
    "Inventariante": "José Marcelino de Oliveira (Herdeiro e Testamenteiro)",
    "Juiz_Orfaos": "Dr. Francisco de Paula Silveira",
    "Cartorio": "1º Ofício de Notas e Órfãos de Machado",
    "Total_Bens_Reis": "26:800$000",
    "Qtd_Escravizados": 8,
    "Status_Processual": "Concluso em partilha com quinhões",
    "Localizacao_Original": "Arquivo Histórico Municipal de Machado - Caixa 28, Doc 09"
  },
  {
    "ID_Auto": "INV-MCH-1883-022",
    "Ano": 1883,
    "Comarca": "Machado (MG)",
    "Inventariado": "Major Francisco Antônio Dias de Oliveira",
    "Inventariante": "Dona Rita de Cássia e Silva Dias",
    "Juiz_Orfaos": "Bel. Arthur de Mello e Castro",
    "Cartorio": "1º Ofício Judicial de Machado",
    "Total_Bens_Reis": "115:400$000",
    "Qtd_Escravizados": 19,
    "Status_Processual": "Avaliado conforme Matrícula Geral da Lei Rio Branco",
    "Localizacao_Original": "Acervo Comarca de Machado / Fundo Órfãos e Sucessões"
  }
];

const escravizadosInventarioData = [
  {
    "ID_Registro": "ESC-INV-001",
    "Nome_Escravizado": "Sebastião",
    "Idade": 32,
    "Sexo": "Masculino",
    "Naturalidade": "Crioulo de Minas",
    "Oficio": "Lavrador e Carpinteiro",
    "Estado_Saude": "Sadio e robusto",
    "Valor_Avaliacao_Reis": "1:800$000",
    "Proprietario_Inventariado": "Capitão Joaquim José de Souza e Silva",
    "Ano": 1854,
    "Quinhao_Destinado": "Ficou com a viúva meeira Dona Maria Francisca",
    "Observacao_Paleografica": "Avaliado com louvados em virtude de sua perícia com engenho de café"
  },
  {
    "ID_Registro": "ESC-INV-002",
    "Nome_Escravizado": "Benedita",
    "Idade": 26,
    "Sexo": "Feminino",
    "Naturalidade": "Mina (Costa da Mina / África Ocidental)",
    "Oficio": "Cozinheira e Rendeira",
    "Estado_Saude": "Boa saúde, sinais de varíola antiga",
    "Valor_Avaliacao_Reis": "1:400$000",
    "Proprietario_Inventariado": "Capitão Joaquim José de Souza e Silva",
    "Ano": 1854,
    "Quinhao_Destinado": "Coube em partilha ao filho herdeiro Antônio",
    "Observacao_Paleografica": "Mencionada como mãe de Bernardo (2 anos)"
  },
  {
    "ID_Registro": "ESC-INV-003",
    "Nome_Escravizado": "Bernardo",
    "Idade": 2,
    "Sexo": "Masculino",
    "Naturalidade": "Machado (MG)",
    "Oficio": "Criança / Sem ofício",
    "Estado_Saude": "Sadio",
    "Valor_Avaliacao_Reis": "300$000",
    "Proprietario_Inventariado": "Capitão Joaquim José de Souza e Silva",
    "Ano": 1854,
    "Quinhao_Destinado": "Adscrito à sua mãe Benedita sem separação",
    "Observacao_Paleografica": "Juiz determinou não separar mãe e filho"
  },
  {
    "ID_Registro": "ESC-INV-004",
    "Nome_Escravizado": "Ignácio Cabinda",
    "Idade": 45,
    "Sexo": "Masculino",
    "Naturalidade": "Cabinda (Congo/Angola)",
    "Oficio": "Feitor de Roça e Ferrador",
    "Estado_Saude": "Enxuto de carnes, vista cansada",
    "Valor_Avaliacao_Reis": "900$000",
    "Proprietario_Inventariado": "Tenente-Coronel Bento Alves Taveira",
    "Ano": 1862,
    "Quinhao_Destinado": "Coube à herdeira Dona Maria Theodora",
    "Observacao_Paleografica": "Possui marcas de escarificação ritual no rosto ('pontas nas fontes')"
  },
  {
    "ID_Registro": "ESC-INV-005",
    "Nome_Escravizado": "Rosaura",
    "Idade": 19,
    "Sexo": "Feminino",
    "Naturalidade": "Pouso Alegre (MG)",
    "Oficio": "Costureira e engomadeira",
    "Estado_Saude": "Perfeita saúde",
    "Valor_Avaliacao_Reis": "1:600$000",
    "Proprietario_Inventariado": "Tenente-Coronel Bento Alves Taveira",
    "Ano": 1862,
    "Quinhao_Destinado": "Herdeiro Major Cândido Alves",
    "Observacao_Paleografica": "Muito estimada pelo trabalho de agulha e fina costura"
  },
  {
    "ID_Registro": "ESC-INV-006",
    "Nome_Escravizado": "Vicente Benguela",
    "Idade": 58,
    "Sexo": "Masculino",
    "Naturalidade": "Benguela (África Centro-Ocidental)",
    "Oficio": "Pastor de gados e seleiro",
    "Estado_Saude": "Moléstia nos joelhos, quebrado de uma virilha",
    "Valor_Avaliacao_Reis": "350$000",
    "Proprietario_Inventariado": "Dona Gertrudes Maria da Assunção",
    "Ano": 1871,
    "Quinhao_Destinado": "José Marcelino de Oliveira",
    "Observacao_Paleografica": "Recomendado pelo testamento para não ser sobrecarregado"
  },
  {
    "ID_Registro": "ESC-INV-007",
    "Nome_Escravizado": "Esperança",
    "Idade": 14,
    "Sexo": "Feminino",
    "Naturalidade": "Machado (MG)",
    "Oficio": "Serviço doméstico",
    "Estado_Saude": "Sadia",
    "Valor_Avaliacao_Reis": "1:200$000",
    "Proprietario_Inventariado": "Dona Gertrudes Maria da Assunção",
    "Ano": 1871,
    "Quinhao_Destinado": "Dona Mariana de Jesus (Legatária)",
    "Observacao_Paleografica": "Registrada na matrícula imperial de 1872 da Paróquia de Machado"
  },
  {
    "ID_Registro": "ESC-INV-008",
    "Nome_Escravizado": "Antônio Crioulo",
    "Idade": 28,
    "Sexo": "Masculino",
    "Naturalidade": "Vila de Campanha da Princesa (MG)",
    "Oficio": "Tropeiro e arrieiro",
    "Estado_Saude": "Robusto",
    "Valor_Avaliacao_Reis": "1:500$000",
    "Proprietario_Inventariado": "Major Francisco Antônio Dias de Oliveira",
    "Ano": 1883,
    "Quinhao_Destinado": "Partilha entre os quatro filhos legítimos",
    "Observacao_Paleografica": "Portador de guia de condução de tropas de café até a estação ferroviária"
  }
];

const ws1_1 = XLSX.utils.json_to_sheet(inventariosAutosData);
const ws1_2 = XLSX.utils.json_to_sheet(escravizadosInventarioData);
XLSX.utils.book_append_sheet(wb1, ws1_1, "Inventariados e Autos");
XLSX.utils.book_append_sheet(wb1, ws1_2, "Escravizados Inventariados");
XLSX.writeFile(wb1, path.join(publicDir, "inventarios_machado.xls"));

// 2. Registros de Compra e Venda de Escravizados do Sul de Minas
const wb2 = XLSX.utils.book_new();

const escriturasData = [
  {
    "Num_Escritura": "ESC-CV-1865-042",
    "Data_Lavratura": "14/05/1865",
    "Cartorio": "1º Cartório de Notas do Termo de Machado",
    "Tabeliao": "Belisário Augusto de Figueiredo",
    "Vendedor": "Tenente João Batista Pereira",
    "Comprador": "Alferes Thomaz de Aquino e Castro",
    "Qtd_Individuos": 2,
    "Valor_Total_Reis": "2:800$000",
    "Forma_Pagamento": "À vista em moeda corrente do Império",
    "Imposto_Meia_Sisa": "Paga na Coletoria de Rendas Gerais de Machado"
  },
  {
    "Num_Escritura": "ESC-CV-1873-108",
    "Data_Lavratura": "22/10/1873",
    "Cartorio": "Cartório de Paz e Notas da Freguesia de Alfenas",
    "Tabeliao": "Manoel Silvério de Faria",
    "Vendedor": "Dona Francisca Cândida de Miranda",
    "Comprador": "Capitão José Ribeiro da Silva",
    "Qtd_Individuos": 1,
    "Valor_Total_Reis": "1:650$000",
    "Forma_Pagamento": "Letra de câmbio a seis meses",
    "Imposto_Meia_Sisa": "Averbada conforme recibo nº 314"
  },
  {
    "Num_Escritura": "ESC-CV-1879-019",
    "Data_Lavratura": "08/03/1879",
    "Cartorio": "1º Cartório de Notas da Vila de Machado",
    "Tabeliao": "Belisário Augusto de Figueiredo",
    "Vendedor": "Herdeiros de Joaquim Bueno de Camargo",
    "Comprador": "Comendador Lourenço Justiniano de Siqueira",
    "Qtd_Individuos": 3,
    "Valor_Total_Reis": "4:200$000",
    "Forma_Pagamento": "Entrada de 2 contos e saldo na colheita do café",
    "Imposto_Meia_Sisa": "Quitada na Coletoria Provincial"
  }
];

const individuosNegociadosData = [
  {
    "Cod_Individuo": "NEG-1865-01",
    "Nome_Escravizado": "Luiz",
    "Sexo": "Masculino",
    "Idade": 22,
    "Naturalidade": "Sul de Minas (Pouso Alegre)",
    "Cor_Declarada": "Pardo",
    "Oficio": "Carroceiro e campeiro",
    "Preco_Reis": "1:500$000",
    "Vendedor": "Tenente João Batista Pereira",
    "Comprador": "Alferes Thomaz de Aquino e Castro",
    "Num_Escritura": "ESC-CV-1865-042",
    "Clausula_Especial": "Vendido são e livre de defeito ou vício oculto, salvo costume de cachaça quando em folga"
  },
  {
    "Cod_Individuo": "NEG-1865-02",
    "Nome_Escravizado": "Joana",
    "Sexo": "Feminino",
    "Idade": 18,
    "Naturalidade": "Termo de Machado",
    "Cor_Declarada": "Preta",
    "Oficio": "Lavadeira e ama",
    "Preco_Reis": "1:300$000",
    "Vendedor": "Tenente João Batista Pereira",
    "Comprador": "Alferes Thomaz de Aquino e Castro",
    "Num_Escritura": "ESC-CV-1865-042",
    "Clausula_Especial": "Sem filhos, transferida com vestuário do uso"
  },
  {
    "Cod_Individuo": "NEG-1873-01",
    "Nome_Escravizado": "Manoel Moçambique",
    "Sexo": "Masculino",
    "Idade": 38,
    "Naturalidade": "Moçambique (África Oriental)",
    "Cor_Declarada": "Preto",
    "Oficio": "Pedreiro e olheiro de telhas",
    "Preco_Reis": "1:650$000",
    "Vendedor": "Dona Francisca Cândida de Miranda",
    "Comprador": "Capitão José Ribeiro da Silva",
    "Num_Escritura": "ESC-CV-1873-108",
    "Clausula_Especial": "Consta matrícula na Mesa de Rendas de Campanha com sinal de queimadura no braço esquerdo"
  },
  {
    "Cod_Individuo": "NEG-1879-01",
    "Nome_Escravizado": "Zeferino",
    "Sexo": "Masculino",
    "Idade": 24,
    "Naturalidade": "Machado (MG)",
    "Cor_Declarada": "Mulato claro",
    "Oficio": "Carpinteiro e seleiro",
    "Preco_Reis": "1:800$000",
    "Vendedor": "Herdeiros de Joaquim Bueno de Camargo",
    "Comprador": "Comendador Lourenço Justiniano de Siqueira",
    "Num_Escritura": "ESC-CV-1879-019",
    "Clausula_Especial": "Apresentado exame físico por cirurgião prático atestando rigidez muscular"
  },
  {
    "Cod_Individuo": "NEG-1879-02",
    "Nome_Escravizado": "Florinda",
    "Sexo": "Feminino",
    "Idade": 21,
    "Naturalidade": "Caldas (MG)",
    "Cor_Declarada": "Crioula",
    "Oficio": "Cozinheira de tacho e doces",
    "Preco_Reis": "1:400$000",
    "Vendedor": "Herdeiros de Joaquim Bueno de Camargo",
    "Comprador": "Comendador Lourenço Justiniano de Siqueira",
    "Num_Escritura": "ESC-CV-1879-019",
    "Clausula_Especial": "Com cláusula de habitar na fazenda sede da Boa Vista"
  },
  {
    "Cod_Individuo": "NEG-1879-03",
    "Nome_Escravizado": "Beneditinho",
    "Sexo": "Masculino",
    "Idade": 4,
    "Naturalidade": "Machado (MG)",
    "Cor_Declarada": "Pardo",
    "Oficio": "Menor / Criança",
    "Preco_Reis": "1:000$000",
    "Vendedor": "Herdeiros de Joaquim Bueno de Camargo",
    "Comprador": "Comendador Lourenço Justiniano de Siqueira",
    "Num_Escritura": "ESC-CV-1879-019",
    "Clausula_Especial": "Filho de Florinda, vendido obrigatoriamente junto à genitora conforme lei de 1869"
  }
];

const ws2_1 = XLSX.utils.json_to_sheet(escriturasData);
const ws2_2 = XLSX.utils.json_to_sheet(individuosNegociadosData);
XLSX.utils.book_append_sheet(wb2, ws2_1, "Escrituras de Compra-Venda");
XLSX.utils.book_append_sheet(wb2, ws2_2, "Individuos Negociados");
XLSX.writeFile(wb2, path.join(publicDir, "compra_venda_suldeminas.xls"));

// 3. Cartas de Alforria e Relações de Bens Paroquiais
const wb3 = XLSX.utils.book_new();

const alforriasData = [
  {
    "Num_Carta": "ALF-MCH-1868-011",
    "Data_Passagem": "15/08/1868",
    "Alforriado": "Maria Antônia de Jesus",
    "Idade": 35,
    "Naturalidade": "Crioula de Minas",
    "Modalidade": "Paga / Indenização Própria",
    "Valor_Pago_Reis": "800$000",
    "Concedente_Senhor": "Dona Emerenciana Constança da Silveira",
    "Origem_Recurso": "Pecúlio acumulado na venda de quitandas e doces em feiras de Machado",
    "Local_Registro": "Livro de Notas nº 07, fls. 12v - Termo de Machado"
  },
  {
    "Num_Carta": "ALF-MCH-1874-023",
    "Data_Passagem": "28/09/1874",
    "Alforriado": "Custódio José da Silva",
    "Idade": 48,
    "Naturalidade": "Congo",
    "Modalidade": "Condicional / Prestação de 3 anos de serviços",
    "Valor_Pago_Reis": "Gratuita por serviços prestados",
    "Concedente_Senhor": "Padre Francisco Maximiano de Figueiredo",
    "Origem_Recurso": "Reconhecimento de fidelidade e zelo na capela curada",
    "Local_Registro": "Cartório de Paz de Machado, Livro de Alforrias"
  },
  {
    "Num_Carta": "ALF-MCH-1882-005",
    "Data_Passagem": "13/05/1882",
    "Alforriado": "Bibiana e sua filha Maria Rita (3 anos)",
    "Idade": 27,
    "Naturalidade": "Vila de Machado",
    "Modalidade": "Fundo de Emancipação Imperial",
    "Valor_Pago_Reis": "1:200$000",
    "Concedente_Senhor": "Coronel Gabriel Garcia de Rezende",
    "Origem_Recurso": "Cota da Junta Classificadora Municipal de Machado / Lei nº 2040",
    "Local_Registro": "Ata da Junta Municipal de Emancipação de Machado, Livro Único"
  }
];

const registrosParoquiaisData = [
  {
    "ID_Assento": "PAR-MCH-1851-BAT-089",
    "Data_Assento": "04/02/1851",
    "Paroquia": "Sagrada Família de Machado (Diocese de Pouso Alegre / Campanha)",
    "Tipo_Assento": "Batismo de Inocente Escravizado",
    "Nome_Batizado": "Custódia",
    "Filiacao_Mae": "Felisberta, escravizada",
    "Filiacao_Pai": "Pai incógnito",
    "Senhor_Proprietario": "Antônio Joaquim de Faria",
    "Madrinha": "Nossa Senhora do Rosário (por procuração da devota Anna Maria)",
    "Padrinho": "Silvestre, escravizado de Manoel Ferreira",
    "Padre_Celebrante": "Vigário José Theodoro de Souza"
  },
  {
    "ID_Assento": "PAR-MCH-1866-BAT-142",
    "Data_Assento": "19/11/1866",
    "Paroquia": "Sagrada Família de Machado",
    "Tipo_Assento": "Batismo de Adulto Africano",
    "Nome_Batizado": "João (nome de batismo católico, 'Nação Angola')",
    "Filiacao_Mae": "De gentios em África",
    "Filiacao_Pai": "De gentios em África",
    "Senhor_Proprietario": "Dona Maria Jacintha de Freitas",
    "Madrinha": "Maria Francisca de Rezende",
    "Padrinho": "Capitão José Pedro da Silva",
    "Padre_Celebrante": "Coadjutor Padre Lourenço Vaz"
  },
  {
    "ID_Assento": "PAR-MCH-1875-CAS-018",
    "Data_Assento": "12/06/1875",
    "Paroquia": "Sagrada Família de Machado",
    "Tipo_Assento": "Matrimônio de Escravizados",
    "Nome_Batizado": "Bento (crioulo) & Maria Luiza (mina)",
    "Filiacao_Mae": "Mães escravizadas em Machado e Caldas",
    "Filiacao_Pai": "Não declarados",
    "Senhor_Proprietario": "Ambos do Alferes Joaquim Custódio da Silveira (com consentimento expresso)",
    "Madrinha": "Sebastiana Crioula",
    "Padrinho": "Ignácio Cabinda",
    "Padre_Celebrante": "Vigário Francisco de Paula e Silva"
  }
];

const ws3_1 = XLSX.utils.json_to_sheet(alforriasData);
const ws3_2 = XLSX.utils.json_to_sheet(registrosParoquiaisData);
XLSX.utils.book_append_sheet(wb3, ws3_1, "Cartas de Alforria");
XLSX.utils.book_append_sheet(wb3, ws3_2, "Registros Paroquiais");
XLSX.writeFile(wb3, path.join(publicDir, "alforrias_paroquiais.xls"));

console.log("Arquivos .xls gerados com sucesso em /public/acervo/");
