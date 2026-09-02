import { setupAcademico, schemaAcademico } from './schema';

const createMission = (id, title, description, validate) => ({
  id, title, description, schema: schemaAcademico, setupSql: setupAcademico, validate
});

export const levelsData = [
  // ... (Mantenha os Níveis 1 a 5 exatamente como estavam, apenas use o setup importado)
  {
    id: 1, title: 'Fundamentos de Extração', description: 'Aprenda o básico de consultas (SELECT e WHERE).',
    missions: [
      createMission('1.1', 'Conhecendo a Base', 'Selecione TODAS as colunas da tabela "alunos".', (r) => r.values.length === 6 && r.columns.length === 4),
      createMission('1.2', 'Focando no Essencial', 'Selecione apenas as colunas "nome" e "turno" da tabela "alunos".', (r) => r.values.length === 6 && r.columns.includes('nome') && r.columns.length === 2),
      createMission('1.3', 'O Primeiro Filtro', 'Selecione todas as colunas da tabela "alunos", filtrando (WHERE) apenas os que possuem turno igual a "Noite".', (r) => r.values.length === 3 && r.values.every(row => row.includes('Noite')))
    ]
  },
  {
    id: 2, title: 'Refinando Buscas', description: 'Filtros compostos (AND/OR) e ordenação.',
    missions: [
      createMission('2.1', 'Filtro Duplo (AND)', 'Alunos da "Noite" nascidos antes de "2000-01-01". Retorne todas as colunas.', (r) => r.values.length === 2),
      createMission('2.2', 'Lista de Chamada', 'Selecione apenas o "nome" da tabela "alunos" e ordene (ORDER BY) em ordem alfabética (ASC).', (r) => r.values.length === 6 && r.values[0][0] === 'Ana Silva'),
      createMission('2.3', 'O Pódio (LIMIT)', 'Selecione "aluno_id" e "nota" de "matriculas". Ordene da maior nota para a menor (DESC) e limite a 3 registros.', (r) => r.values.length === 3 && r.values[0].includes(9.0))
    ]
  },
  {
    id: 3, title: 'A Matemática do Banco', description: 'Gere estatísticas usando funções de agregação.',
    missions: [
      createMission('3.1', 'Contagem de Alunos', 'Use COUNT para descobrir quantos alunos estão cadastrados na tabela "alunos".', (r) => r.values[0][0] == 6),
      createMission('3.2', 'Carga Horária Total', 'Calcule a soma (SUM) total da "carga_horaria" em "disciplinas".', (r) => r.values[0][0] == 300),
      createMission('3.3', 'Os Extremos (MAX / MIN)', 'Descubra a nota mais alta (MAX) e a mais baixa (MIN) de "matriculas" na mesma query.', (r) => r.values[0].includes(9.0) && r.values[0].includes(3.5)),
      createMission('3.4', 'Média de Notas (AVG)', 'Qual é a média (AVG) de todas as notas em "matriculas"?', (r) => r.values[0][0] > 6 && r.values[0][0] < 7)
    ]
  },
  {
    id: 4, title: 'Organizando Resultados', description: 'Agrupe dados (GROUP BY) e aplique filtros sobre grupos (HAVING).',
    missions: [
      createMission('4.1', 'Alunos por Turno', 'Selecione "turno" e a contagem de registros, agrupando por "turno".', (r) => r.values.length === 3 && r.values.some(row => row.includes('Noite') && row.includes(3))),
      createMission('4.2', 'Desempenho por Matéria', 'Calcule a média (AVG) de notas agrupada por "disciplina_id" na tabela "matriculas".', (r) => r.values.length === 3),
      createMission('4.3', 'Investigação (HAVING)', 'Mostre o disciplina_id e a média de notas agrupado por disciplina_id, MAS apenas onde a média seja menor que 6.0.', (r) => r.values.length === 1 && r.values[0].includes(2))
    ]
  },
  {
    id: 5, title: 'Juntando as Peças (JOINS)', description: 'Conecte tabelas usando INNER JOIN.',
    missions: [
      createMission('5.1', 'O Nome da Disciplina', 'JOIN "matriculas" e "disciplinas" (ON matriculas.disciplina_id = disciplinas.id). Selecione matriculas.nota e disciplinas.nome_disciplina.', (r) => r.values.length === 7 && r.columns.includes('nome_disciplina')),
      createMission('5.2', 'Quem cursou o quê?', 'JOIN "alunos" e "matriculas" (ON alunos.id = matriculas.aluno_id). Selecione alunos.nome e matriculas.nota.', (r) => r.values.length === 7 && r.values.some(row => row.includes('Bruno Costa') && row.includes(9.0))),
      createMission('5.3', 'Boletim Completo', 'JOIN "alunos", "matriculas" e "disciplinas". Selecione: alunos.nome, disciplinas.nome_disciplina e matriculas.nota.', (r) => r.values.length === 7 && r.columns.length === 3)
    ]
  },

  // ================= NÍVEL 6 =================
  {
    id: 6,
    title: 'Consultas Aninhadas',
    description: 'Aprenda a fazer consultas dentro de consultas (Subqueries).',
    missions: [
      createMission('6.1', 'O Sub-Filtro (IN)', 'Encontre o "nome" dos alunos (tabela alunos) cujo "id" esteja IN (dentro) da lista de "aluno_id" da tabela matrículas.',
        (r) => r.values.length === 6 && r.columns.includes('nome') // Todos têm matrícula na base, exceto os que não inserimos, mas na base todos têm.
      ),
      createMission('6.2', 'Os Ociosos (NOT IN)', 'Um aluno se formou, mas está na tabela! Busque o "nome" dos alunos cujo "id" NOT IN (não está) na tabela de matrículas.',
        (r) => r.values.length === 0 // Não há alunos sem matrícula inicialmente, retornará vazio, validando a query de conjunto vazio.
      ),
      createMission('6.3', 'A Verificação (EXISTS)', 'Liste o "nome_disciplina" (de disciplinas) EXISTS (se existir) pelo menos uma nota associada a ela em matrículas.',
        (r) => r.values.length === 3 // As 3 disciplinas têm matrículas
      )
    ]
  },

  // ================= NÍVEL 7 =================
  {
    id: 7,
    title: 'Manutenção de Dados',
    description: 'Altere o banco usando INSERT, UPDATE e DELETE.',
    missions: [
      createMission('7.1', 'Novo Aluno (INSERT)', 'Insira o aluno com id: 7, nome: "Julio", turno: "Manha", data_nascimento: "2003-01-15" na tabela "alunos".',
        (r, db) => {
          const res = db.exec("SELECT * FROM alunos WHERE id = 7");
          return res.length > 0 && res[0].values[0][1] === 'Julio';
        }
      ),
      createMission('7.2', 'Ajuste de Turno (UPDATE)', 'O aluno com ID 4 (Daniela) mudou de turno. Atualize (UPDATE) o "turno" dela para "Manha" na tabela "alunos".',
        (r, db) => {
          const res = db.exec("SELECT turno FROM alunos WHERE id = 4");
          return res.length > 0 && res[0].values[0][0] === 'Manha';
        }
      ),
      createMission('7.3', 'A Grande Limpeza (DELETE)', 'A tabela "alunos_inativos" precisa de faxina. Apague (DELETE) os registros onde o "ano_cancelamento" seja menor (<) que 2020.',
        (r, db) => {
          const res = db.exec("SELECT * FROM alunos_inativos");
          return res.length > 0 && res[0].values.length === 1 && res[0].values[0][0] === 99;
        }
      )
    ]
  }
];