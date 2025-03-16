// Vamos criar tabelas pivo 
// primeira tabela pivo
// npx sequelize-cli model:create --name usuarios_roles --attributes usuario_id:uuid,role_id:uuid
// npx sequelize-cli model:create --name usuarios_permissoes --attributes usuario_id:uuid,permissao_id:uuid
// npx sequelize-cli model:create --name roles_permissoes --attributes roles_id:uuid,permissao_id:uuid

// Vamos fazer a referência entre as 3 tabelas
// Em usuarios_roles 
// Vamos fazer referencia a tabela de usuaário
// Vamos fazer o relacionamento das nossas tabelas
// Vamos nas nossas models, relacionamento vai ficar dentro das models