// Script de criação do banco de dados base para os níveis acadêmicos
const setupAcademico = `
  CREATE TABLE alunos (id INT, nome VARCHAR(100), turno VARCHAR(20), data_nascimento DATE);
  INSERT INTO alunos VALUES 
    (1, 'Ana Silva', 'Noite', '1999-05-14'),
    (2, 'Bruno Costa', 'Manha', '2001-08-20'),
    (3, 'Carlos Dias', 'Noite', '1998-11-03'),
    (4, 'Daniela Rocha', 'Tarde', '2002-02-10'),
    (5, 'Eduardo Lima', 'Noite', '2000-12-25'),
    (6, 'Fernanda Souza', 'Manha', '1997-04-12');

  CREATE TABLE disciplinas (id INT, nome_disciplina VARCHAR(100), carga_horaria INT);
  INSERT INTO disciplinas VALUES 
    (1, 'Banco de Dados', 80),
    (2, 'Calculo I', 120),
    (3, 'Algoritmos', 100);

  CREATE TABLE matriculas (id INT, aluno_id INT, disciplina_id INT, nota DECIMAL(4,2), semestre VARCHAR(10));
  INSERT INTO matriculas VALUES 
    (1, 1, 1, 8.5, '2024.1'),
    (2, 2, 1, 9.0, '2024.1'),
    (3, 3, 2, 4.5, '2024.1'),
    (4, 4, 3, 7.0, '2024.1'),
    (5, 5, 1, 6.5, '2024.1'),
    (6, 1, 2, 5.0, '2024.1'),
    (7, 6, 2, 3.5, '2024.1');
`;

// Estrutura visual que aparecerá na caixinha cinza para o usuário
const schemaAcademico = `
Tabelas disponíveis:
- alunos (id, nome, turno, data_nascimento)
- disciplinas (id, nome_disciplina, carga_horaria)
- matriculas (id, aluno_id, disciplina_id, nota, semestre)
`;

export const levelsData = [
  // ================= NÍVEL 1 =================
  {
    id: 1,
    title: 'Fundamentos de Extração',
    description: 'Aprenda o básico de consultas (SELECT e WHERE) no sistema acadêmico.',
    missions: [
      {
        id: '1.1',
        title: 'Conhecendo a Base',
        description: 'Bem-vindo(a) ao sistema acadêmico! A diretoria pediu uma lista completa de todos os alunos. Escreva uma query para selecionar TODAS as colunas da tabela "alunos".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 6 && result.columns.length === 4
      },
      {
        id: '1.2',
        title: 'Focando no Essencial',
        description: 'Não precisamos de todas as informações agora. Selecione apenas as colunas "nome" e "turno" da tabela "alunos".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 6 && result.columns.includes('nome') && result.columns.length === 2
      },
      {
        id: '1.3',
        title: 'O Primeiro Filtro',
        description: 'A secretaria precisa saber quem estuda à noite. Selecione todas as colunas da tabela "alunos", mas utilize o WHERE para filtrar apenas os que possuem turno igual a "Noite".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 3 && result.values.every(row => row.includes('Noite'))
      }
    ]
  },

  // ================= NÍVEL 2 =================
  {
    id: 2,
    title: 'Refinando Buscas',
    description: 'Filtros compostos (AND/OR) e ordenação de resultados (ORDER BY/LIMIT).',
    missions: [
      {
        id: '2.1',
        title: 'Filtro Duplo (AND)',
        description: 'O coordenador precisa da lista de alunos que estudam no turno da "Noite" E que nasceram antes do ano 2000. Retorne todas as colunas da tabela "alunos". (Dica: data_nascimento < "2000-01-01").',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 2 // Ana Silva e Carlos Dias
      },
      {
        id: '2.2',
        title: 'Lista de Chamada',
        description: 'Gere a lista de chamada. Selecione apenas a coluna "nome" da tabela "alunos" e ordene (ORDER BY) em ordem alfabética (ASC).',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => {
          if (result.values.length !== 6) return false;
          return result.values[0][0] === 'Ana Silva' && result.values[5][0] === 'Fernanda Souza';
        }
      },
      {
        id: '2.3',
        title: 'O Pódio (LIMIT)',
        description: 'Quem são os melhores alunos? Selecione "aluno_id" e "nota" da tabela "matriculas". Ordene da maior para a menor nota (DESC) e limite o resultado a apenas 3 registros.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => {
          return result.values.length === 3 && result.values[0].includes(9.0) && result.values[1].includes(8.5);
        }
      }
    ]
  },

  // ================= NÍVEL 3 =================
  {
    id: 3,
    title: 'A Matemática do Banco',
    description: 'Gere estatísticas usando funções de agregação (COUNT, SUM, AVG, MAX, MIN).',
    missions: [
      {
        id: '3.1',
        title: 'Contagem de Alunos',
        description: 'O sistema precisa saber o volume de dados. Use COUNT para descobrir quantos alunos estão cadastrados na tabela "alunos".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values[0][0] == 6
      },
      {
        id: '3.2',
        title: 'Carga Horária Total',
        description: 'Calcule a soma (SUM) total da "carga_horaria" de todas as matérias na tabela "disciplinas".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values[0][0] == 300 // 80 + 120 + 100
      },
      {
        id: '3.3',
        title: 'Os Extremos (MAX / MIN)',
        description: 'Descubra qual foi a nota mais alta (MAX) e a nota mais baixa (MIN) da tabela "matriculas". Selecione ambas na mesma query.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values[0].includes(9.0) && result.values[0].includes(3.5)
      },
      {
        id: '3.4',
        title: 'Média de Notas (AVG)',
        description: 'Qual é a média geral das notas de todas as matrículas? Use AVG(nota) na tabela "matriculas".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values[0][0] > 6 && result.values[0][0] < 7 // A média é ~6.28
      }
    ]
  },

  // ================= NÍVEL 4 =================
  {
    id: 4,
    title: 'Organizando Resultados',
    description: 'Agrupe dados (GROUP BY) e aplique filtros sobre grupos (HAVING).',
    missions: [
      {
        id: '4.1',
        title: 'Alunos por Turno',
        description: 'Quantos alunos existem por turno? Selecione "turno" e a contagem de registros, agrupando pelo "turno".',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 3 && result.values.some(row => row.includes('Noite') && row.includes(3))
      },
      {
        id: '4.2',
        title: 'Desempenho por Matéria',
        description: 'Calcule a média (AVG) de notas agrupada pelo "disciplina_id" na tabela "matriculas". Selecione o disciplina_id e a media.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 3 // 3 disciplinas avaliadas
      },
      {
        id: '4.3',
        title: 'Investigação (HAVING)',
        description: 'A coordenação quer investigar disciplinas problemáticas. Modifique a query anterior para mostrar apenas os grupos onde a média das notas seja menor que 6.0 (Use HAVING).',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 1 && result.values[0].includes(2) // Apenas calculo I tem média < 6
      }
    ]
  },

  // ================= NÍVEL 5 =================
  {
    id: 5,
    title: 'Juntando as Peças (JOINS)',
    description: 'Conecte tabelas diferentes usando chaves estrangeiras e INNER JOIN.',
    missions: [
      {
        id: '5.1',
        title: 'O Nome da Disciplina',
        description: 'O ID da disciplina na matrícula não é amigável. Faça um INNER JOIN entre "matriculas" e "disciplinas" e selecione: matriculas.nota e disciplinas.nome_disciplina.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 7 && result.columns.includes('nome_disciplina') && result.columns.includes('nota')
      },
      {
        id: '5.2',
        title: 'Quem cursou o quê?',
        description: 'Faça um INNER JOIN entre "alunos" e "matriculas". Selecione apenas o "nome" do aluno e a "nota" que ele tirou.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 7 && result.values.some(row => row.includes('Bruno Costa') && row.includes(9.0))
      },
      {
        id: '5.3',
        title: 'O Boletim Completo',
        description: 'Vamos juntar 3 tabelas! Faça um JOIN de "alunos" com "matriculas", e outro JOIN com "disciplinas". Selecione: alunos.nome, disciplinas.nome_disciplina e matriculas.nota.',
        schema: schemaAcademico,
        setupSql: setupAcademico,
        validate: (result) => result.values.length === 7 && result.columns.length === 3
      }
    ]
  }
];