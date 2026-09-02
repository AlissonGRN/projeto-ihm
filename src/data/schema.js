export const setupAcademico = `
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

  CREATE TABLE alunos_inativos (id INT, nome VARCHAR(100), ano_cancelamento INT);
  INSERT INTO alunos_inativos VALUES 
    (98, 'Joao Inativo', 2019),
    (99, 'Maria Inativa', 2021);
`;

export const schemaAcademico = `
Tabelas disponíveis:
- alunos (id, nome, turno, data_nascimento)
- disciplinas (id, nome_disciplina, carga_horaria)
- matriculas (id, aluno_id, disciplina_id, nota, semestre)
- alunos_inativos (id, nome, ano_cancelamento)
`;