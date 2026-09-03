export const levelsData = [
  {
    id: 1,
    title: "Infiltração de Rede",
    description: "Acesse os servidores internos da corporação e recupere o manifesto de funcionários e os registros da rede de dados.",
    missions: [
      {
        id: 1,
        title: "O Primeiro Acesso",
        description: "Infiltre-se na tabela de funcionários da corporação para mapear os alvos disponíveis.",
        objective: "Retorne todos os registros e colunas da tabela funcionarios.",
        tip: "Utilize o asterisco (*) para selecionar todas as colunas de uma tabela. Exemplo: SELECT * FROM funcionarios;",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, cargo, setor, nivel_acesso)\n- logs_rede (id, funcionario_id, ip_origem, acao, data_hora)",
        setupSql: `
          CREATE TABLE funcionarios (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            cargo TEXT,
            setor TEXT,
            nivel_acesso INTEGER
          );
          CREATE TABLE logs_rede (
            id INTEGER PRIMARY KEY,
            funcionario_id INTEGER,
            ip_origem TEXT,
            acao TEXT,
            data_hora TEXT
          );
          INSERT INTO funcionarios VALUES (1, 'Kaelen Vance', 'Arquiteto de Redes', 'Segurança', 3);
          INSERT INTO funcionarios VALUES (2, 'Lyra Chen', 'Engenheira de Dados', 'Pesquisa', 2);
          INSERT INTO funcionarios VALUES (3, 'Marcus Sterling', 'Diretor Executivo', 'Administração', 5);
          INSERT INTO funcionarios VALUES (4, 'Nyx Thorne', 'Analista de Sistemas', 'Operações', 1);
          INSERT INTO logs_rede VALUES (1, 2, '192.168.1.45', 'LOGIN', '2087-08-01 08:30');
          INSERT INTO logs_rede VALUES (2, 4, '10.0.0.12', 'DOWNLOAD_ARQUIVO', '2087-08-01 09:15');
        `,
        validate: (result) => {
          return result.success && result.values.length === 4 && result.columns.length === 5;
        }
      },
      {
        id: 2,
        title: "Filtro de Alvos",
        description: "Precisamos isolar apenas os funcionários que possuem o cargo de Engenheira de Dados para engenharia social.",
        objective: "Selecione o nome e o setor de todos os funcionários onde o cargo seja 'Engenheira de Dados'.",
        tip: "Use a clásula WHERE para filtrar linhas específicas. Exemplo: SELECT coluna1, coluna2 FROM tabela WHERE condicao = 'valor';",
        schema: "Tabelas disponíveis:\n- funcionarios (id, nome, cargo, setor, nivel_acesso)",
        setupSql: `
          CREATE TABLE funcionarios (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            cargo TEXT,
            setor TEXT,
            nivel_acesso INTEGER
          );
          INSERT INTO funcionarios VALUES (1, 'Kaelen Vance', 'Arquiteto de Redes', 'Segurança', 3);
          INSERT INTO funcionarios VALUES (2, 'Lyra Chen', 'Engenheira de Dados', 'Pesquisa', 2);
          INSERT INTO funcionarios VALUES (3, 'Marcus Sterling', 'Diretor Executivo', 'Administração', 5);
          INSERT INTO funcionarios VALUES (4, 'Nyx Thorne', 'Analista de Sistemas', 'Operações', 1);
        `,
        validate: (result) => {
          return result.success && result.values.length === 1 && result.values[0].includes('Lyra Chen');
        }
      },
      {
        id: 3,
        title: "Varredura de Conexões",
        description: "Acesse o painel de conexões e descubra quais registros possuem endereços IP que começam com a rede interna autorizada.",
        objective: "Selecione todos os logs de rede onde a ação realizada seja 'DOWNLOAD_ARQUIVO'.",
        tip: "Filtre strings usando aspas simples no WHERE. Exemplo: SELECT * FROM tabela WHERE acao = 'VALOR';",
        schema: "Tabelas disponíveis:\n- logs_rede (id, funcionario_id, ip_origem, acao, data_hora)",
        setupSql: `
          CREATE TABLE logs_rede (
            id INTEGER PRIMARY KEY,
            funcionario_id INTEGER,
            ip_origem TEXT,
            acao TEXT,
            data_hora TEXT
          );
          INSERT INTO logs_rede VALUES (1, 2, '192.168.1.45', 'LOGIN', '2087-08-01 08:30');
          INSERT INTO logs_rede VALUES (2, 4, '10.0.0.12', 'DOWNLOAD_ARQUIVO', '2087-08-01 09:15');
          INSERT INTO logs_rede VALUES (3, 1, '172.16.0.8', 'DOWNLOAD_ARQUIVO', '2087-08-01 10:00');
        `,
        validate: (result) => {
          return result.success && result.values.length === 2;
        }
      }
    ]
  },
  {
    id: 2,
    title: "Cruzamento de Dados e Transações",
    description: "Conecte as transações financeiras ocultas aos perfis dos diretores corruptos da megacorporação.",
    missions: [
      {
        id: 4,
        title: "Auditoria de Contas",
        description: "O conselho executivo escondeu desvios na tabela de transações. Vamos listar todas as transferências acima de um determinado valor.",
        objective: "Selecione todas as transações com valor superior a 5000.",
        tip: "Use operadores relacionais no WHERE como '>'. Exemplo: SELECT * FROM transacoes WHERE valor > 5000;",
        schema: "Tabelas disponíveis:\n- transacoes (id, conta_origem, conta_destino, valor, descricao)",
        setupSql: `
          CREATE TABLE transacoes (
            id INTEGER PRIMARY KEY,
            conta_origem TEXT,
            conta_destino TEXT,
            valor REAL,
            descricao TEXT
          );
          INSERT INTO transacoes VALUES (1, 'ACC-991', 'ACC-102', 1200.00, 'Manutenção');
          INSERT INTO transacoes VALUES (2, 'ACC-404', 'ACC-888', 8500.50, 'Projeto Chimera');
          INSERT INTO transacoes VALUES (3, 'ACC-102', 'ACC-303', 450.00, 'Consultoria');
          INSERT INTO transacoes VALUES (4, 'ACC-555', 'ACC-888', 15000.00, 'Consultoria Oculta');
        `,
        validate: (result) => {
          return result.success && result.values.length === 2;
        }
      }
    ]
  }
];