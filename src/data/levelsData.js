export const levelsData = [
  {
    levelNumber: 1,
    title: "Mundo 1: Fundamentos do SELECT",
    missions: [
      {
        id: "1.1",
        title: "Missão 1: Listagem Geral",
        description: "O setor de marketing precisa visualizar todos os dados da nossa base de clientes. Selecione todas as colunas da tabela clientes.",
        tableSchema: "clientes (id, nome, email, cidade, ultima_compra)",
        setupSql: `
          CREATE TABLE clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            cidade TEXT,
            ultima_compra TEXT
          );
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Ana Silva', 'ana@email.com', 'São Paulo', '2025-10-01');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Carlos Souza', 'carlos@email.com', 'Recife', '2026-01-15');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Beatriz Lima', 'beatriz@email.com', 'São Paulo', '2025-11-20');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Lucas Mendes', 'lucas@email.com', 'Serra Talhada', '2026-05-10');
        `,
        validate: (result) => result.values && result.values.length === 4
      },
      {
        id: "1.2",
        title: "Missão 2: Filtrando por Localidade",
        description: "Precisamos focar em uma campanha regional. Selecione apenas os clientes que moram na cidade de 'São Paulo'.",
        tableSchema: "clientes (id, nome, email, cidade, ultima_compra)",
        setupSql: `
          CREATE TABLE clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            cidade TEXT,
            ultima_compra TEXT
          );
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Ana Silva', 'ana@email.com', 'São Paulo', '2025-10-01');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Carlos Souza', 'carlos@email.com', 'Recife', '2026-01-15');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Beatriz Lima', 'beatriz@email.com', 'São Paulo', '2025-11-20');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Lucas Mendes', 'lucas@email.com', 'Serra Talhada', '2026-05-10');
        `,
        validate: (result) => {
          const hasWhere = result.values && result.values.length === 2;
          const allSaoPaulo = result.values.every(row => row.includes('São Paulo'));
          return hasWhere && allSaoPaulo;
        }
      },
      {
        id: "1.3",
        title: "Missão 3: Clientes Recentes",
        description: "Encontre os clientes cuja última compra foi feita após o dia '2025-12-31' usando a cláusula WHERE.",
        tableSchema: "clientes (id, nome, email, cidade, ultima_compra)",
        setupSql: `
          CREATE TABLE clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            cidade TEXT,
            ultima_compra TEXT
          );
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Ana Silva', 'ana@email.com', 'São Paulo', '2025-10-01');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Carlos Souza', 'carlos@email.com', 'Recife', '2026-01-15');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Beatriz Lima', 'beatriz@email.com', 'São Paulo', '2025-11-20');
          INSERT INTO clientes (nome, email, cidade, ultima_compra) VALUES ('Lucas Mendes', 'lucas@email.com', 'Serra Talhada', '2026-05-10');
        `,
        validate: (result) => result.values && result.values.length === 2
      }
    ]
  }
];