export const levelsData = [
  {
    id: 1,
    title: "Fundamentos de Extração",
    description: "Operações básicas de leitura. Todo sistema deixa uma porta aberta na tabela principal.",
    missions: [
      {
        id: 1,
        title: "Leitura Total",
        description: "Precisamos de uma visão geral de todos os colaboradores registrados no sistema corporativo.",
        objective: "Selecione todas as colunas da tabela 'funcionarios'.",
        tip: "Utilize o asterisco (*) para selecionar todas as colunas de uma tabela. Exemplo: SELECT * FROM tabela;",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, cargo, setor)",
        setupSql: `
          CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome TEXT, cargo TEXT, setor TEXT);
          INSERT INTO funcionarios VALUES (1, 'Kaelen', 'Arquiteto', 'TI'), (2, 'Lyra', 'Engenheira', 'Dados'), (3, 'Marcus', 'Diretor', 'Executivo');
        `,
        validate: (result) => result.success && result.values.length === 3 && result.columns.length === 4
      },
      {
        id: 2,
        title: "Projeção Específica",
        description: "Trazer todos os dados gera muito tráfego e pode disparar alertas. Traga apenas o necessário.",
        objective: "Selecione apenas as colunas 'nome' e 'cargo' da tabela 'funcionarios'.",
        tip: "Especifique o nome das colunas separados por vírgula logo após o SELECT.",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, cargo, setor)",
        setupSql: `
          CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome TEXT, cargo TEXT, setor TEXT);
          INSERT INTO funcionarios VALUES (1, 'Kaelen', 'Arquiteto', 'TI'), (2, 'Lyra', 'Engenheira', 'Dados');
        `,
        validate: (result) => result.success && result.columns.includes('nome') && result.columns.includes('cargo') && result.columns.length === 2
      }
    ]
  },
  {
    id: 2,
    title: "Filtros e Condições",
    description: "Aprenda a isolar dados usando a cláusula WHERE para encontrar alvos específicos.",
    missions: [
      {
        id: 3,
        title: "Busca por Texto",
        description: "O conselho está investigando o setor financeiro. Precisamos listar quem trabalha lá.",
        objective: "Selecione todas as colunas da tabela 'funcionarios' onde o 'setor' seja igual a 'Financeiro'.",
        tip: "Lembre-se de usar aspas simples para textos no SQL. Exemplo: WHERE coluna = 'Texto';",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, cargo, setor)",
        setupSql: `
          CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome TEXT, cargo TEXT, setor TEXT);
          INSERT INTO funcionarios VALUES (1, 'Ana', 'Contadora', 'Financeiro'), (2, 'Beto', 'Dev', 'TI'), (3, 'Carlos', 'Auditor', 'Financeiro');
        `,
        validate: (result) => result.success && result.values.length === 2 && result.values[0].includes('Financeiro')
      },
      {
        id: 4,
        title: "Operadores Relacionais",
        description: "Encontramos uma tabela de transações bancárias. Procure por movimentações suspeitas de alto valor.",
        objective: "Selecione todas as transações da tabela 'pagamentos' onde o 'valor' seja maior que 5000.",
        tip: "Use o operador matemático de 'maior que' (>). Exemplo: WHERE valor > 100;",
        schema: "Tabelas disponíveis:\n- pagamentos (id, conta_destino, valor)",
        setupSql: `
          CREATE TABLE pagamentos (id INTEGER PRIMARY KEY, conta_destino TEXT, valor REAL);
          INSERT INTO pagamentos VALUES (1, 'ACC-123', 1500), (2, 'ACC-999', 8500), (3, 'ACC-456', 200), (4, 'ACC-777', 12000);
        `,
        validate: (result) => result.success && result.values.length === 2
      }
    ]
  },
  {
    id: 3,
    title: "Ordenação e Limites",
    description: "Organize a saída de dados para identificar os maiores valores rapidamente sem sobrecarregar o terminal.",
    missions: [
      {
        id: 5,
        title: "Ordenação Decrescente",
        description: "Existem centenas de arquivos. Precisamos ver os arquivos mais pesados primeiro.",
        objective: "Selecione o 'nome_arquivo' e o 'tamanho_mb' da tabela 'arquivos', ordenando pelo tamanho em ordem decrescente.",
        tip: "Use ORDER BY coluna DESC para ordenar do maior para o menor.",
        schema: "Tabelas disponíveis:\n- arquivos (id, nome_arquivo, tamanho_mb)",
        setupSql: `
          CREATE TABLE arquivos (id INTEGER PRIMARY KEY, nome_arquivo TEXT, tamanho_mb INTEGER);
          INSERT INTO arquivos VALUES (1, 'relatorio.pdf', 5), (2, 'backup_bd.sql', 150), (3, 'foto.jpg', 2);
        `,
        validate: (result) => result.success && result.values[0][1] === 150 && result.values[2][1] === 2
      },
      {
        id: 6,
        title: "Limitando Resultados",
        description: "Tentar baixar o log de rede inteiro vai travar sua conexão. Baixe apenas os 3 registros mais recentes.",
        objective: "Selecione todas as colunas da tabela 'logs', ordene pelo 'id' de forma decrescente, e limite o resultado a apenas 3 linhas.",
        tip: "Combine ORDER BY com LIMIT. Exemplo: ORDER BY id DESC LIMIT 3;",
        schema: "Tabelas disponíveis:\n- logs (id, acao, ip)",
        setupSql: `
          CREATE TABLE logs (id INTEGER PRIMARY KEY, acao TEXT, ip TEXT);
          INSERT INTO logs VALUES (1, 'LOGIN', '10.0.0.1'), (2, 'LOGOUT', '10.0.0.1'), (3, 'FAIL', '192.168.1.5'), (4, 'LOGIN', '192.168.1.5');
        `,
        validate: (result) => result.success && result.values.length === 3 && result.values[0][0] === 4
      }
    ]
  },
  {
    id: 4,
    title: "Funções de Agregação",
    description: "Aprenda a gerar relatórios resumidos usando cálculos matemáticos diretos no banco de dados.",
    missions: [
      {
        id: 7,
        title: "Somatório Total",
        description: "O setor de auditoria precisa saber o rombo total causado pelos desvios financeiros no ano.",
        objective: "Utilize a função SUM() para retornar a soma total da coluna 'valor' na tabela 'desvios'.",
        tip: "Funções de agregação vão no SELECT. Exemplo: SELECT SUM(coluna) FROM tabela;",
        schema: "Tabelas disponíveis:\n- desvios (id, mes, valor)",
        setupSql: `
          CREATE TABLE desvios (id INTEGER PRIMARY KEY, mes TEXT, valor REAL);
          INSERT INTO desvios VALUES (1, 'Jan', 5000), (2, 'Fev', 7500), (3, 'Mar', 2500);
        `,
        validate: (result) => result.success && result.values[0][0] === 15000
      },
      {
        id: 8,
        title: "Contagem de Registros",
        description: "Quantas tentativas de invasão bloqueadas nosso próprio sistema corporativo sofreu ontem?",
        objective: "Utilize a função COUNT() para contar quantas linhas existem na tabela 'alertas' onde o status seja 'Bloqueado'.",
        tip: "Você pode usar COUNT(*) e combinar com a cláusula WHERE normalmente.",
        schema: "Tabelas disponíveis:\n- alertas (id, tipo, status)",
        setupSql: `
          CREATE TABLE alertas (id INTEGER PRIMARY KEY, tipo TEXT, status TEXT);
          INSERT INTO alertas VALUES (1, 'DDoS', 'Bloqueado'), (2, 'SQLi', 'Pendente'), (3, 'BruteForce', 'Bloqueado');
        `,
        validate: (result) => result.success && result.values[0][0] === 2
      }
    ]
  },
  {
    id: 5,
    title: "Agrupamento de Dados",
    description: "Agrupe dados por categorias para descobrir padrões, usando GROUP BY.",
    missions: [
      {
        id: 9,
        title: "Média por Departamento",
        description: "Precisamos entender a distribuição salarial da empresa separada por cada departamento.",
        objective: "Selecione o 'setor' e a média (AVG) do 'salario' da tabela 'funcionarios', agrupando os resultados pelo 'setor'.",
        tip: "Ao usar uma função de agregação com outra coluna, você deve usar o GROUP BY na coluna simples. Exemplo: SELECT tipo, COUNT(*) FROM t GROUP BY tipo;",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, setor, salario)",
        setupSql: `
          CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome TEXT, setor TEXT, salario REAL);
          INSERT INTO funcionarios VALUES (1, 'A', 'TI', 4000), (2, 'B', 'TI', 6000), (3, 'C', 'Vendas', 3000), (4, 'D', 'Vendas', 5000);
        `,
        validate: (result) => result.success && result.values.length === 2 && result.columns.includes('setor')
      }
    ]
  },
  {
    id: 6,
    title: "Conexões (INNER JOIN)",
    description: "Bancos de dados relacionais dividem informações. Aprenda a costurá-las novamente.",
    missions: [
      {
        id: 10,
        title: "API de Estatísticas Esportivas",
        description: "Interceptamos um servidor de dados da confederação de futebol. Precisamos relacionar os jogadores aos seus respectivos times.",
        objective: "Faça um SELECT retornando o 'nome' do jogador (da tabela jogadores) e o 'nome_clube' (da tabela clubes), usando INNER JOIN entre as duas tabelas através do 'clube_id'.",
        tip: "Sintaxe: SELECT a.coluna, b.coluna FROM tabelaA a INNER JOIN tabelaB b ON a.chave_estrangeira = b.id;",
        schema: "Tabelas disponíveis:\n- jogadores (id, nome, clube_id)\n- clubes (id, nome_clube)",
        setupSql: `
          CREATE TABLE clubes (id INTEGER PRIMARY KEY, nome_clube TEXT);
          CREATE TABLE jogadores (id INTEGER PRIMARY KEY, nome TEXT, clube_id INTEGER);
          INSERT INTO clubes VALUES (1, 'Flamengo'), (2, 'Palmeiras');
          INSERT INTO jogadores VALUES (1, 'Pedro', 1), (2, 'Dudu', 2), (3, 'Arrascaeta', 1);
        `,
        validate: (result) => result.success && result.columns.length === 2 && result.values.length === 3
      }
    ]
  },
  {
    id: 7,
    title: "Múltiplas Tabelas",
    description: "Operações complexas envolvendo três ou mais tabelas simultaneamente.",
    missions: [
      {
        id: 11,
        title: "Invasão ao Sistema Acadêmico",
        description: "Acessamos o mainframe do curso de Sistemas de Informação. Precisamos ver quais alunos estão matriculados em quais disciplinas, cruzando 3 tabelas.",
        objective: "Selecione o 'nome' do aluno e a 'disciplina' da tabela de disciplinas, fazendo JOIN entre alunos, matriculas e disciplinas.",
        tip: "Você pode encadear JOINs: FROM tabelaA JOIN tabelaB ON... JOIN tabelaC ON...",
        schema: "Tabelas:\n- alunos (id, nome)\n- disciplinas (id, disciplina)\n- matriculas (id, aluno_id, disc_id)",
        setupSql: `
          CREATE TABLE alunos (id INTEGER PRIMARY KEY, nome TEXT);
          CREATE TABLE disciplinas (id INTEGER PRIMARY KEY, disciplina TEXT);
          CREATE TABLE matriculas (id INTEGER PRIMARY KEY, aluno_id INTEGER, disc_id INTEGER);
          INSERT INTO alunos VALUES (1, 'Alisson'), (2, 'Maria');
          INSERT INTO disciplinas VALUES (10, 'Banco de Dados'), (20, 'Algoritmos');
          INSERT INTO matriculas VALUES (1, 1, 10), (2, 2, 20), (3, 1, 20);
        `,
        validate: (result) => result.success && result.values.length === 3 && result.columns.length === 2
      }
    ]
  },
  {
    id: 8,
    title: "Subconsultas (Subqueries)",
    description: "Queries dentro de queries. O nível mais alto de extração tática de dados.",
    missions: [
      {
        id: 12,
        title: "Alvos Acima da Média",
        description: "Não sabemos o valor exato da média salarial, mas queremos todos os executivos que ganham acima dela.",
        objective: "Selecione o 'nome' e 'salario' da tabela 'executivos' onde o salário seja MAIOR que a média salarial (calculada via subquery) da mesma tabela.",
        tip: "Use uma consulta completa dentro dos parênteses do WHERE. Exemplo: WHERE valor > (SELECT AVG(valor) FROM tabela);",
        schema: "Tabelas disponíveis:\n- executivos (id, nome, salario)",
        setupSql: `
          CREATE TABLE executivos (id INTEGER PRIMARY KEY, nome TEXT, salario REAL);
          INSERT INTO executivos VALUES (1, 'CEO', 50000), (2, 'CTO', 45000), (3, 'Gerente', 10000), (4, 'Coordenador', 8000);
        `,
        validate: (result) => result.success && result.values.length === 2 && result.values[0][0] === 'CEO'
      }
    ]
  }
];