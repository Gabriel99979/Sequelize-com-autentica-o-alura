// 1. Como a Senha é Criptografada
// No arquivo UsuarioService.js, a senha do usuário passa por um hash antes de ser salva no banco de dados:

// Usuário se cadastra enviando um nome, email e senha no corpo da requisição.
// Antes de salvar no banco, a senha é criptografada com bcrypt.hash():
// js
// Copiar
// Editar
// const senhaHash = await hash(dto.senha, 8);
// O número 8 representa o custo de hashing (quantidade de rodadas de processamento para tornar o hash mais seguro).
// Isso gera uma string irreversível (hash), tornando impossível recuperar a senha original.
// O usuário é salvo no banco com o hash da senha.
// 2. Como a Senha é Comparada no Login
// No AuthService.js, quando um usuário tenta fazer login:

// O código busca o usuário no banco de dados pelo e-mail:
// js
// Copiar
// Editar
// const usuario = await dataSource[Usuario].findOne({
//     attributes: ['id', 'email', 'senha'], 
//     where: { email: dto.email }
// });
// Se o usuário não existir, retorna erro: "Usuario não cadastrado".
// Se existir, o código compara a senha fornecida com o hash armazenado:
// js
// Copiar
// Editar
// const senhasIguais = await compare(dto.senha, usuario.senha);
// compare() aplica o mesmo algoritmo bcrypt na senha fornecida e verifica se o resultado bate com o hash salvo.
// Se não forem iguais, retorna erro: "Usuario ou senha inválido".
// 3. Por que o Access Token é Necessário se já Validamos a Senha?
// Após a senha ser validada, o código gera um access token (JWT) para autenticação futura:

// js
// Copiar
// Editar
// const acessToken = sign({
//     id: usuario.id,
//     email: usuario.email
// }, jsonSecret.secret, {
//     expiresIn: 86400 // Expira em 24 horas
// });
// Motivos para usar o Token
// Evita que a senha seja enviada repetidamente

// Sem um token, toda ação exigiria a senha novamente, o que aumenta o risco de exposição.
// Facilita a autenticação em múltiplos serviços

// Se há uma API REST com várias rotas protegidas, basta validar o token no cabeçalho (Authorization: Bearer <token>), sem precisar verificar a senha no banco.
// Expiração automática para mais segurança

// O token expira após 24 horas (expiresIn: 86400), exigindo um novo login.
// Resumo do Fluxo Completo
// Cadastro do usuário (criaRegistro)

// A senha digitada é criptografada com bcrypt.hash().
// O hash da senha é salvo no banco junto com o usuário.
// Login (AuthService.login())

// O usuário insere email e senha.
// O sistema recupera o hash da senha no banco e compara com bcrypt.compare().
// Se for igual, gera um JWT token válido por 24 horas.
// Acesso autenticado

// O usuário usa o token para acessar rotas protegidas sem precisar enviar a senha novamente.
// Você disse:
// Ok, mas se o banco for comprometido e hacker usar o a senha em formato hash isso dará erro ou será aprovado
// O ChatGPT disse:
// Se um hacker conseguir acesso ao banco de dados e tentar usar a senha armazenada (que está em formato hash) diretamente para fazer login, o acesso será negado. Isso acontece porque o código de autenticação não compara os hashes diretamente, mas sim a senha digitada com o hash armazenado.

// Por que o hacker não consegue usar o hash diretamente?
// No login, a verificação acontece assim:

// js
// Copiar
// Editar
// const senhasIguais = await compare(dto.senha, usuario.senha);
// O método compare() não faz uma comparação direta (dto.senha === usuario.senha).
// Em vez disso, ele reaplica o algoritmo bcrypt na senha fornecida pelo usuário e compara o resultado com o hash salvo no banco.
// Como o hash armazenado já está criptografado, um hacker não pode simplesmente usá-lo como senha, pois o código espera um texto puro para processar.
// O que acontece se o hacker tentar usar o hash no campo de senha?
// Se um hacker colocar diretamente o hash roubado no campo de senha durante o login, o código fará o seguinte:

// Pegará a entrada do hacker (dto.senha) e tentará aplicar bcrypt.compare().
// Como dto.senha já é um hash e bcrypt.compare() espera um texto puro, os resultados não vão bater.
// O login será negado com "Usuario ou senha inválido".
// O que o hacker pode fazer com os hashes?
// Embora o hash sozinho não possa ser usado para login, o hacker ainda pode tentar quebrá-lo usando ataques como:

// Ataque de força bruta: Testando todas as combinações possíveis.
// Ataque de dicionário: Testando senhas comuns pré-hashadas.
// Ataque com tabelas Rainbow: Usando uma tabela pré-computada de hashes para encontrar correspondências.
// Como aumentar a segurança?
// Usar um fator de custo alto no bcrypt
// Atualmente, 8 (usado no código) é razoável, mas um valor mais alto como 10 ou 12 dificulta ataques.
// js
// Copiar
// Editar
// const senhaHash = await hash(dto.senha, 12);
// Implementar autenticação de dois fatores (2FA)
// Mesmo que um hacker descubra a senha, ele ainda precisará de um código extra enviado ao usuário.
// Monitorar tentativas de login suspeitas
// Bloquear a conta após múltiplas tentativas falhas pode dificultar ataques de força bruta.
// Resumo
// Se um hacker tentar usar o hash diretamente como senha, o login falhará.
// Isso ocorre porque bcrypt.compare() espera um texto puro para gerar um novo hash e comparar com o armazenado.
// No entanto, um hacker pode tentar quebrar os hashes fora do sistema, então medidas extras de segurança são recomendadas.

// Você consegue criar o usuário sem passar o ID porque o ID está sendo gerado manualmente no código antes de ser enviado ao banco.

// No seu UsuarioService, você tem essa linha dentro do método criaRegistro:

// js
// Copiar
// Editar
// const novoUsuario = await super.criaRegistro({
//   id: uuidv4(),  // Gerando o ID manualmente
//   nome: dto.nome,
//   email: dto.email,
//   senha: senhaHash
// });
// Aqui, o UUID está sendo gerado antes do Sequelize salvar os dados, então mesmo que o banco não esteja gerando IDs automaticamente, isso não afeta a criação do usuário.

// Mas por que isso funciona se a migração tem Sequelize.UUID como defaultValue?
// O problema está exatamente nesse defaultValue: Sequelize.UUID que você colocou na migração da tabela usuarios.

// js
// Copiar
// Editar
// id: {
//   allowNull: false,
//   primaryKey: true,
//   type: Sequelize.UUID,
//   defaultValue: Sequelize.UUID  // ⚠ Isso NÃO gera um UUID automaticamente!
// }
// ⚠ Isso não cria um UUID automaticamente. O Sequelize.UUID apenas define que a coluna é do tipo UUID, mas não gera valores automaticamente.

// Se você removesse o uuidv4() no UsuarioService, o banco esperaria que você passasse um ID manualmente, pois ele não está gerando um por padrão.

// Por que a tabela produtos funciona diferente?
// Na migração de produtos, você usou:

// js
// Copiar
// Editar
// id: {
//   primaryKey: true,
//   allowNull: false,
//   type: Sequelize.UUID,
//   defaultValue: Sequelize.UUIDV4  // ✅ Agora o banco gera automaticamente o UUID
// }
// ✅ Aqui, o banco gera automaticamente um UUID v4 se nenhum ID for informado.

// Conclusão
// O usuário está sendo criado sem passar um ID porque o código já está gerando o UUID com uuidv4() antes de salvar no banco.
// A migração da tabela usuarios não gera UUIDs automaticamente, porque defaultValue: Sequelize.UUID não faz isso.
// Se você quiser que o banco gere os IDs automaticamente, precisa alterar a migração de usuarios para Sequelize.UUIDV4, como fez na tabela produtos.
// O que fazer para corrigir isso?
// Se você quer que o banco gere automaticamente os UUIDs, siga um desses caminhos:

// 1️⃣ Alterar a migração para usar Sequelize.UUIDV4, removendo o uuidv4() do código:

// js
// Copiar
// Editar
// id: {
//   allowNull: false,
//   primaryKey: true,
//   type: Sequelize.UUID,
//   defaultValue: Sequelize.UUIDV4 // ✅ Agora o banco gera automaticamente
// }
// Depois disso, no UsuarioService, você pode simplesmente fazer:

// js
// Copiar
// Editar
// const novoUsuario = await super.criaRegistro({
//   nome: dto.nome,
//   email: dto.email,
//   senha: senhaHash
// });
// E o banco gerará o UUID automaticamente.

// 2️⃣ Manter o uuidv4() no código e corrigir a migração para remover defaultValue:

// js
// Copiar
// Editar
// id: {
//   allowNull: false,
//   primaryKey: true,
//   type: Sequelize.UUID
// }
// Assim, o banco não tenta gerar um ID e aceita o que seu código já está gerando.

// Qual é a melhor opção?
// Se quiser que o banco cuide dos UUIDs automaticamente, use a opção 1 (alterando para Sequelize.UUIDV4).

// Se quiser que o código cuide dos UUIDs e tenha controle sobre eles antes de salvar no banco, use a opção 2 (mantendo uuidv4() no código).

// Você disse:
// Ambos estão certos
// O ChatGPT disse:
// Sim, ambos estão corretos! A escolha entre eles depende da estratégia que você deseja adotar para a geração dos UUIDs.

// ✅ Quando usar uuidv4() no código?
// Se você quiser garantir que o UUID seja gerado antes mesmo de salvar no banco.
// Se precisar do UUID para alguma lógica antes de persistir os dados (ex: criar um relacionamento antes da inserção).
// Se quiser manter consistência no código sem depender de configurações do banco de dados.
// ✅ Quando usar Sequelize.UUIDV4 no banco?
// Se preferir delegar a responsabilidade da geração do UUID ao banco.
// Se quiser reduzir a lógica na aplicação e evitar gerar IDs manualmente.
// Se estiver lidando com um ambiente onde o banco gerencia os identificadores de forma padronizada.
// 🚀 Resumo:
// Sequelize.UUIDV4 → O banco gera o UUID automaticamente.
// uuidv4() no código → O UUID é gerado antes da inserção no banco.
// Ambas as abordagens são corretas, e a melhor escolha depende da sua necessidade! 🚀
