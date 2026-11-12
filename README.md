```markdown
# EasyFood API

API de restaurantes construída com Node.js, Express, Prisma e PostgreSQL.
Autenticação via JWT.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do `.env.example` e preencha os valores.

3. Rode as migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor:
   ```bash
   node server.js
   ```

## Endpoints

- `GET  /restaurants` — lista restaurantes (público)
- `POST /restaurants` — cadastra restaurante (exige token)
- `POST /auth/register` — cadastra usuário
- `POST /auth/login` — faz login e devolve um token JWT
- `GET  /auth/me` — dados do usuário logado (exige token)

## Correção de erros

O Bug da Categoria (Validação): O backend (dish.service.js) exigia o envio do campo category, mas o formulário não contemplava essa obrigatoriedade. A correção consistiu em tornar a categoria opcional, salvando uma string vazia "" caso não fosse enviada, evitando a quebra (Erro 400).

O Bug do ID (Tipagem): Ao atualizar a imagem do prato, o ID vinha da URL como texto (String). Como o Prisma exige um Número Inteiro (Int), a consulta falhava silenciosamente. A correção foi aplicar a função parseId(dishId) nas funções getDishById e updateDishImage do Service.

## Parte 6 — Pense como Arquiteto

Por que faz sentido reutilizar o mesmo serviço de imagens?
Para respeitar o princípio DRY (Don't Repeat Yourself). Centralizar o Multer e o Sharp no image.service.js permite que tanto a foto de perfil quanto a foto do prato usem a mesma lógica de otimização. Se amanhã a EasyFood decidir salvar as imagens na nuvem (como a AWS S3) em vez de numa pasta local, a alteração é feita num único ficheiro, atualizando o sistema inteiro de uma vez.

Qual é a responsabilidade do Controller e qual é a responsabilidade do Service?
O Controller atua apenas como um maestro do tráfego HTTP: ele recebe a requisição (req), extrai os dados (body, params, ficheiros, utilizador logado) e devolve a resposta (res com os status codes como 200, 201 ou 400). O Service é o cérebro: ele contém a lógica de negócio, valida as regras, processa as imagens e fala com a base de dados (Prisma).

Por que não devemos implementar o processamento diretamente nas rotas?
Porque cria um alto acoplamento (código "esparguete"). Se o Sharp ou as validações estivessem na rota, seria impossível reutilizar essa lógica noutra parte do sistema ou criar testes unitários para a otimização de imagem sem ter de simular uma requisição HTTP inteira.

Como o middleware de autenticação protege a alteração da imagem de perfil?
Ele impede que o ID do utilizador venha do corpo da requisição (onde poderia ser manipulado por um atacante). O middleware abre o Token JWT, verifica a sua assinatura secreta e injeta o ID seguro em req.user.id. Assim, o controlador usa essa informação confiável, garantindo que o utilizador X só consegue alterar a foto do próprio utilizador X.

O que deve acontecer se o processamento de uma imagem falhar?
O bloco try/catch do Controller captura a exceção lançada pelo Sharp ou pelo Multer e devolve um Erro HTTP 500 (Erro Interno). A base de dados não é atualizada, evitando que o utilizador fique com uma URL corrompida associada ao seu perfil ou prato.

Nossa arquitetura atual permite adicionar novas funcionalidades sem modificar toda a aplicação?
Sim, devido à arquitetura modular. Se precisarmos de criar um módulo de "Avaliações" (reviews), basta criar uma nova pasta dentro de modules/ com as suas próprias rotas, controllers e services, sem risco de estragar os módulos de auth ou dishes já existentes.